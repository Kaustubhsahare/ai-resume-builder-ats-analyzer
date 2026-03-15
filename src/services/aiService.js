import { GoogleGenAI } from '@google/genai';

// Initialize the API using the provided key
const apiKey = 'AIzaSyAkLafo1WmcDbhK9PbGbmHEvH6foP2YxZ0';
const ai = new GoogleGenAI({ apiKey: apiKey });

/**
 * Calculates a General ATS Score based on the resume content using deterministic rules
 */
export const calculateATSScore = async (resumeData) => {
  // 1. Extract and normalize content
  const isRawText = typeof resumeData === 'string';
  const textContent = isRawText ? resumeData.toLowerCase() : JSON.stringify(resumeData).toLowerCase();

  // --- 1. FORMATTING SCORE (15% Weight) ---
  // Penalize heavily for missing core sections or bad formatting indicators
  let formattingScore = 15; // Max 15 points
  const formattingWarnings = [];

  if (!isRawText && resumeData) {
    if (!resumeData.summary) { formattingScore -= 5; formattingWarnings.push("Missing professional summary section."); }
    if (!resumeData.experience || resumeData.experience.length === 0) { formattingScore -= 10; formattingWarnings.push("Missing work experience section."); }
    if (!resumeData.skills || resumeData.skills.length === 0) { formattingScore -= 5; formattingWarnings.push("Missing skills section."); }
  } else {
    if (!textContent.includes('experience')) { formattingScore -= 10; formattingWarnings.push("Work experience section not clearly identified."); }
    if (!textContent.includes('education')) { formattingScore -= 3; formattingWarnings.push("Education section not clearly identified."); }
    if (!textContent.includes('skills')) { formattingScore -= 5; formattingWarnings.push("Skills section not clearly identified."); }
  }
  if (isRawText && textContent.match(/\|.*\|/)) {
    formattingScore -= 5;
    formattingWarnings.push("Avoid using tables or complex graphics that ATS systems may not parse correctly.");
  }
  formattingScore = Math.max(0, formattingScore);

  // --- 2. SKILL QUALITY SCORE (30% Weight) ---
  let skillCount = 0;
  const foundSkills = new Set();

  if (!isRawText && resumeData.skills && Array.isArray(resumeData.skills)) {
    skillCount = resumeData.skills.reduce((total, category) => total + (category.skills?.length || 0), 0);
    resumeData.skills.forEach(cat => cat.skills?.forEach(s => foundSkills.add(s.toLowerCase())));
  } else {
    // Unique skill counting strategy
    const commonSkills = ['javascript', 'python', 'java', 'react', 'node', 'sql', 'aws', 'docker', 'git', 'html', 'css', 'typescript', 'c++', 'c#', 'php', 'ruby', 'go', 'kubernetes', 'azure', 'gcp', 'mysql', 'postgresql', 'mongodb', 'agile', 'scrum'];
    commonSkills.forEach(skill => {
      // Use regex bounds so we don't accidentally match subsets strings globally
      const skillRegex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      if (skillRegex.test(textContent)) foundSkills.add(skill);
    });
    skillCount = foundSkills.size;
  }
  // Max out at 15 unique targeted skills = full 30 points
  const skillsScore = Math.min(30, (skillCount / 15) * 30);

  // --- 3. EXPERIENCE QUALITY (20% Weight) ---
  let experienceIndicators = 0;
  const actionVerbs = ['developed', 'managed', 'led', 'created', 'designed', 'implemented', 'improved', 'increased', 'reduced', 'saved', 'achieved', 'driven', 'launched', 'spearheaded', 'orchestrated'];

  if (!isRawText && resumeData.experience) {
    resumeData.experience.forEach(exp => {
      if (!exp.description) return;
      const desc = exp.description.toLowerCase();
      actionVerbs.forEach(verb => { if (desc.includes(verb)) experienceIndicators++; });
      if (/\d+/.test(desc)) experienceIndicators += 2; // Strong bonus for numeric metrics
    });
  } else {
    const foundVerbs = new Set(); // Prevent spamming "developed developed developed" counting forever
    actionVerbs.forEach(verb => {
      const regex = new RegExp(`\\b${verb}\\b`, 'gi');
      if (regex.test(textContent)) foundVerbs.add(verb);
    });
    experienceIndicators += foundVerbs.size;
    const numberMatches = textContent.match(/\d+%|\$\d+/g);
    if (numberMatches) experienceIndicators += (numberMatches.length * 2);
  }
  // Formula: 8+ unique strong indicators/metrics is full 20 points
  const experienceScore = Math.min(20, (experienceIndicators / 8) * 20);

  // --- 4. KEYWORD MATCH DENSITY (35% Weight) ---
  // Count UNIQUE impactful industry nouns to prevent keyword stuffing inflating the score
  const industryKeywords = ['software', 'engineer', 'developer', 'frontend', 'backend', 'fullstack', 'data', 'analytics', 'design', 'architecture', 'system', 'api', 'database', 'cloud', 'security', 'testing', 'automation', 'agile', 'project', 'team', 'lifecycle', 'deployment', 'integration', 'performance', 'optimization'];
  const uniqueKeywordsFound = new Set();
  industryKeywords.forEach(kw => {
    if (textContent.includes(kw)) uniqueKeywordsFound.add(kw);
  });
  // Max out at 12 unique keywords = full 35 points
  const keywordsScore = Math.min(35, (uniqueKeywordsFound.size / 12) * 35);

  // --- COMPUTE AND NORMALIZE FINAL SCORE ---
  // Raw score out of 100 based on the sum of the weighted categories
  const rawScore = formattingScore + skillsScore + experienceScore + keywordsScore;

  // Consolidate Matched Keywords for UI
  const matchedKeywords = Array.from(new Set([...Array.from(foundSkills), ...Array.from(uniqueKeywordsFound)]));

  // Normalization logic: Calibrate score slightly upwards to match industry tools, apply 85 hard cap.
  let overallScore = rawScore;
  if (rawScore >= 60 && rawScore <= 80) {
    overallScore = rawScore + 2;
  } else if (rawScore > 80) {
    overallScore = rawScore + 1;
  }
  overallScore = Math.round(overallScore);
  if (overallScore > 85) overallScore = 85;

  // --- AI FEEDBACK GENERATION ONLY ---
  // Use Gemini strictly to formulate natural language advice based on the calculated scores
  const feedbackPrompt = `
    You are an expert ATS resume reviewer. 
    I have mathematically calculated the ATS scores for a resume.
    Overall Score: ${overallScore}/100
    Formatting: ${formattingScore}/100
    Skills: ${skillsScore}/100
    Experience: ${experienceScore}/100
    Keywords: ${keywordsScore}/100

    Resume Content:
    ${isRawText ? resumeData : JSON.stringify(resumeData)}

    Given these scores and the resume content, provide EXACTLY 3-4 highly actionable, specific bullet points of advice on how the user can improve their resume to score higher.
    If a category score is low, focus your advice there.
    
    CRITICAL INSTRUCTION: Return the result strictly as a JSON object with structured suggestions containing a "before" and "after" example:
    {
      "feedback": [
        {
          "advice": "string explaining the tip",
          "before": "string showing current weak resume snippet",
          "after": "string showing the improved version with metrics/keywords"
        }
      ]
    }
  `;

  let feedback = [
    {
      advice: "Ensure your experience section uses strong action verbs.",
      before: "Worked on frontend design.",
      after: "Spearheaded frontend redesign using React, increasing user retention by 15%."
    },
    {
      advice: "Add more quantifiable metrics to your achievements.",
      before: "Helped team improve performance.",
      after: "Optimized database queries, reducing query load times by 40%."
    }
  ];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: feedbackPrompt,
      config: {
        temperature: 0.1,
        topP: 0.1,
        responseMimeType: "application/json"
      }
    });
    const aiResult = JSON.parse(response.text);
    if (aiResult.feedback && Array.isArray(aiResult.feedback)) {
      feedback = aiResult.feedback;
    }
  } catch (err) {
    console.error("AI Feedback generation failed, using default feedback.", err);
  }

  // Return the deterministic score + AI feedback
  // Convert structural weights to actual percentages (0-100 scale) for the UI progress bars
  return {
    overallScore,
    breakdown: {
      formatting: Math.round((formattingScore / 15) * 100),
      skills: Math.round((skillsScore / 30) * 100),
      experience: Math.round((experienceScore / 20) * 100),
      keywords: Math.round((keywordsScore / 35) * 100)
    },
    matchedKeywords,
    formattingWarnings,
    feedback
  };
};

/**
 * Matches Resume with a specific Job Description using deterministic text similarity
 */
export const matchJobDescription = async (resumeData, jobDescription, role, company) => {
  const isRawText = typeof resumeData === 'string';
  const textContent = isRawText ? resumeData.toLowerCase() : JSON.stringify(resumeData).toLowerCase();
  const jdText = jobDescription.toLowerCase();

  // Basic NLP Abstraction: Bag of Words intersection for known technical skills/keywords
  const techKeywords = new Set(['javascript', 'python', 'java', 'react', 'react.js', 'node.js', 'node', 'sql', 'mysql', 'postgresql', 'mongodb', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'git', 'ci/cd', 'html', 'css', 'typescript', 'c++', 'c#', 'php', 'ruby', 'go', 'spring', 'django', 'express', 'rest', 'graphql', 'machine learning', 'tensorflow', 'pandas', 'linux', 'agile', 'scrum']);

  const jdSkillsFound = new Set();
  const resumeSkillsFound = new Set();

  techKeywords.forEach(kw => {
    if (jdText.includes(kw)) jdSkillsFound.add(kw);
    if (textContent.includes(kw)) resumeSkillsFound.add(kw);
  });

  // 1. SKILLS MATCH (Intersection over JD Requirements)
  const jdKeywordsArray = Array.from(jdSkillsFound);
  let matchingSkills = [];
  let skillsMatchScore = 100;

  if (jdKeywordsArray.length > 0) {
    matchingSkills = jdKeywordsArray.filter(kw => resumeSkillsFound.has(kw));
    skillsMatchScore = Math.round((matchingSkills.length / jdKeywordsArray.length) * 100);
  }

  // 2. KEYWORD MATCH (General unigram overlap excluding stop words)
  const getWords = (text) => text.match(/\b[a-z]{4,}\b/g) || [];
  const jdWords = new Set(getWords(jdText));
  const resumeWords = new Set(getWords(textContent));
  const intersectionArgs = Array.from(jdWords).filter(w => resumeWords.has(w));
  let keywordMatchScore = jdWords.size > 0 ? Math.round((intersectionArgs.length / jdWords.size) * 100) : 100;
  // Boost keyword match slightly to be more forgiving than exact unigram set matches
  keywordMatchScore = Math.min(100, keywordMatchScore + 20);

  // 3. EXPERIENCE MATCH (Years of experience naive check)
  let experienceMatchScore = 50; // Strict baseline (assume bad fit if no markers hit)
  const jdYearsMatch = jdText.match(/(\d+)\+?\s*years?/);
  if (jdYearsMatch) {
    const requiredYears = parseInt(jdYearsMatch[1]);
    const resumeYearsMatch = textContent.match(/(\d+)\+?\s*years?/);
    if (resumeYearsMatch && parseInt(resumeYearsMatch[1]) >= requiredYears) {
      experienceMatchScore = 100;
    } else {
      experienceMatchScore = Math.max(0, 100 - (requiredYears * 15)); // Heavier penalty (15 pts per mapped missing year)
    }
  } else {
    experienceMatchScore = 80; // Reasonable match if generally keywords fit but years aren't listed
  }

  // 4. TOOLS MATCH (Specific subset of techKeywords)
  // More strict: average it with KeywordMatch instead of just being skills + 10
  const toolsMatchScore = Math.round((skillsMatchScore + keywordMatchScore) / 2);

  // Overall raw Match Score out of 100
  const rawMatchScore = Math.round((skillsMatchScore + keywordMatchScore + experienceMatchScore + toolsMatchScore) / 4);

  // Normalization logic: Calibrate score slightly upwards to match industry tools, apply 85 hard cap.
  let matchScore = rawMatchScore;
  if (rawMatchScore >= 60 && rawMatchScore <= 80) {
    matchScore = rawMatchScore + 2;
  } else if (rawMatchScore > 80) {
    matchScore = rawMatchScore + 1;
  }
  matchScore = Math.round(matchScore);
  if (matchScore > 85) matchScore = 85;

  // --- AI SUGGESTIONS ONLY ---
  // Use Gemini to generate missing skill strings and bullet point rewrites, passing the pre-calculated match arrays.
  const prompt = `
    You are an expert recruiter and ATS analyzer.
    I have already calculated that the resume matches the job description for ${role} at ${company} with a score of ${matchScore}%.
    
    Job Description:
    ${jobDescription}

    Resume Data:
    ${isRawText ? resumeData : JSON.stringify(resumeData)}

    Given this data, please generate:
    1. A list of specific "Missing Skills" or keywords that the job description asks for, but the resume lacks.
    2. 1-2 "suggestions" where you take a generic bullet point from the user's resume and rewrite it to better target the job description above.
    
    CRITICAL INSTRUCTION: Return the result STRICTLY as a JSON object:
    {
      "missingSkills": ["string array of individual missing skills"],
      "suggestions": [
        {
          "before": "string showing current resume snippet",
          "after": "string showing the improved version"
        }
      ]
    }
  `;

  let missingSkills = [];
  let suggestions = [];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
        topP: 0.2,
        responseMimeType: "application/json"
      }
    });

    const aiResult = JSON.parse(response.text);
    if (aiResult.missingSkills && Array.isArray(aiResult.missingSkills)) missingSkills = aiResult.missingSkills;
    if (aiResult.suggestions && Array.isArray(aiResult.suggestions)) suggestions = aiResult.suggestions;
  } catch (error) {
    console.error('Error generating AI job match feedback:', error);
    missingSkills = Array.from(jdSkillsFound).filter(kw => !resumeSkillsFound.has(kw)); // Fallback JS missing skills
    suggestions = [{ before: "General experience", after: "Tailor this point specifically with metrics listed in the job description." }];
  }

  return {
    matchScore,
    breakdown: {
      skillsMatch: skillsMatchScore,
      keywordMatch: keywordMatchScore,
      experienceMatch: experienceMatchScore,
      toolsMatch: toolsMatchScore
    },
    matchingSkills: matchingSkills.length > 0 ? matchingSkills : [],
    missingSkills,
    jobRequires: jdKeywordsArray.length > 0 ? jdKeywordsArray : ["General Keywords"],
    suggestions
  };
};
