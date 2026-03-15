import React from 'react';

const ModernTwoColumnTemplate = ({ data }) => {
    if (!data) return null;
    const { personalInfo, education, experience, skills, projects, certifications } = data;

    // Calculate dynamic font size based on the longest single word
    // Ensures very long single names don't fracture across lines
    const longestWord = personalInfo.fullName
        ? Math.max(...personalInfo.fullName.split(' ').map(w => w.length))
        : 10;

    let nameFontSize = '36pt';
    if (longestWord >= 8) nameFontSize = '30pt';
    if (longestWord >= 10) nameFontSize = '26pt';
    if (longestWord >= 13) nameFontSize = '20pt';

    return (
        <div className="resume-template" style={{ display: 'grid', gridTemplateColumns: '32% 68%', minHeight: '100%', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#111827', background: '#ffffff' }}>

            {/* Left Column (Skills, Certs, Achievements, Portfolio) */}
            <div style={{ background: '#f3f4f6', padding: '40px 25px', borderRight: '1px solid #e5e7eb' }}>

                {/* Visual Initials or Name block if empty */}
                <div style={{ width: '80px', height: '80px', background: '#374151', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24pt', fontWeight: 'bold', marginBottom: '25px', margin: '0 auto' }}>
                    {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'R'}
                </div>

                {/* Contact & Links */}
                <div style={{ marginBottom: '35px', textAlign: 'center', fontSize: '9pt', color: '#4b5563', lineHeight: '1.8', overflowWrap: 'anywhere' }}>
                    {personalInfo.email && <div style={{ overflowWrap: 'anywhere' }}>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}

                    <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #d1d5db' }}>
                        {personalInfo.linkedinUrl && <div style={{ overflowWrap: 'anywhere' }}><strong>LinkedIn:</strong><br /> {personalInfo.linkedinUrl}</div>}
                        {personalInfo.portfolioUrl && <div style={{ overflowWrap: 'anywhere', marginTop: '10px' }}><strong>Portfolio:</strong><br /> {personalInfo.portfolioUrl}</div>}
                    </div>
                </div>

                {/* Skills */}
                {(skills.technical?.length > 0 || skills.tools?.length > 0 || skills.soft?.length > 0) && (
                    <div style={{ marginBottom: '35px' }}>
                        <h3 style={{ textTransform: 'uppercase', fontSize: '11pt', fontWeight: 700, color: '#1f2937', borderBottom: '2px solid #9ca3af', paddingBottom: '5px', marginBottom: '15px' }}>Skills</h3>

                        {skills.technical?.length > 0 && (
                            <div style={{ marginBottom: '15px' }}>
                                <strong style={{ display: 'block', fontSize: '9pt', color: '#4b5563', marginBottom: '5px' }}>Technical</strong>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                    {skills.technical.map((s, i) => <span key={i} style={{ background: '#e5e7eb', padding: '4px 8px', borderRadius: '4px', fontSize: '8pt', color: '#1f2937' }}>{s}</span>)}
                                </div>
                            </div>
                        )}

                        {skills.tools?.length > 0 && (
                            <div style={{ marginBottom: '15px' }}>
                                <strong style={{ display: 'block', fontSize: '9pt', color: '#4b5563', marginBottom: '5px' }}>Tools</strong>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                    {skills.tools.map((s, i) => <span key={i} style={{ background: '#e5e7eb', padding: '4px 8px', borderRadius: '4px', fontSize: '8pt', color: '#1f2937' }}>{s}</span>)}
                                </div>
                            </div>
                        )}

                        {skills.soft?.length > 0 && (
                            <div>
                                <strong style={{ display: 'block', fontSize: '9pt', color: '#4b5563', marginBottom: '5px' }}>Interpersonal</strong>
                                <ul style={{ paddingLeft: '15px', margin: 0, fontSize: '9pt', color: '#374151' }}>
                                    {skills.soft.map((s, i) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <div style={{ marginBottom: '35px' }}>
                        <h3 style={{ textTransform: 'uppercase', fontSize: '11pt', fontWeight: 700, color: '#1f2937', borderBottom: '2px solid #9ca3af', paddingBottom: '5px', marginBottom: '15px' }}>Certifications</h3>
                        {certifications.map((cert, index) => (
                            <div key={index} style={{ marginBottom: '10px', fontSize: '9pt' }}>
                                <strong style={{ display: 'block', color: '#111827' }}>{cert.name}</strong>
                                <div style={{ color: '#4b5563' }}>{cert.issuer}</div>
                                <div style={{ color: '#6b7280', fontSize: '8pt' }}>{cert.year}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Achievements */}
                {data.achievements && data.achievements.length > 0 && (
                    <div>
                        <h3 style={{ textTransform: 'uppercase', fontSize: '11pt', fontWeight: 700, color: '#1f2937', borderBottom: '2px solid #9ca3af', paddingBottom: '5px', marginBottom: '15px' }}>Achievements</h3>
                        <ul style={{ margin: 0, paddingLeft: '15px', fontSize: '9pt', color: '#374151', lineHeight: '1.5' }}>
                            {data.achievements.map((ach, index) => (
                                <li key={index} style={{ marginBottom: '6px' }}>{ach.title || ach}</li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>

            {/* Right Column (Summary, Exp, Projects, Edu) */}
            <div style={{ padding: '40px 35px' }}>

                {/* Header Name */}
                <div style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: nameFontSize, fontWeight: 800, color: '#111827', margin: '0 0 5px 0', letterSpacing: '-0.5px', textTransform: 'uppercase', wordBreak: 'keep-all', overflowWrap: 'normal' }}>
                        {personalInfo.fullName || 'YOUR NAME'}
                    </h1>
                </div>

                {/* Summary */}
                {personalInfo.summary && (
                    <div style={{ marginBottom: '35px' }}>
                        <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Profile</h2>
                        <p style={{ margin: 0, fontSize: '10.5pt', lineHeight: '1.7', color: '#4b5563' }}>{personalInfo.summary}</p>
                    </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <div style={{ marginBottom: '35px' }}>
                        <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Experience</h2>
                        {experience.map((exp, index) => (
                            <div key={index} style={{ marginBottom: '25px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                                    <div>
                                        <strong style={{ fontSize: '12pt', color: '#111827', display: 'block' }}>{exp.role}</strong>
                                        <span style={{ fontSize: '10.5pt', color: '#374151', fontWeight: 600 }}>{exp.company}</span>
                                    </div>
                                    <div style={{ fontSize: '10pt', color: '#6b7280', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                        {exp.startDate} – {exp.endDate || 'Present'}
                                    </div>
                                </div>
                                {exp.description && <div style={{ fontSize: '10.5pt', color: '#4b5563', lineHeight: '1.6', marginTop: '10px', whiteSpace: 'pre-wrap' }}>{exp.description}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <div style={{ marginBottom: '35px' }}>
                        <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Projects</h2>
                        {projects.map((proj, index) => (
                            <div key={index} style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                    <strong style={{ fontSize: '11.5pt', color: '#111827' }}>{proj.title}</strong>
                                    {proj.link && <span style={{ fontSize: '9pt', color: '#2563eb' }}>{proj.link}</span>}
                                </div>
                                {proj.technologies && <div style={{ fontSize: '9.5pt', color: '#6b7280', fontStyle: 'italic', marginBottom: '8px' }}>{proj.technologies}</div>}
                                {proj.description && <div style={{ fontSize: '10.5pt', color: '#4b5563', lineHeight: '1.6' }}>{proj.description}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div>
                        <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Education</h2>
                        {education.map((edu, index) => (
                            <div key={index} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <strong style={{ fontSize: '11.5pt', color: '#111827', display: 'block' }}>{edu.institution}</strong>
                                        <span style={{ fontSize: '10.5pt', color: '#374151' }}>{edu.degree} {edu.score && `| GPA: ${edu.score}`}</span>
                                    </div>
                                    <div style={{ fontSize: '10pt', color: '#6b7280', whiteSpace: 'nowrap' }}>
                                        {edu.startDate} – {edu.endDate}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>

        </div>
    );
};

export default ModernTwoColumnTemplate;
