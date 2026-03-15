import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useResumeStore from '../store/useResumeStore';
import { ChevronRight, ChevronLeft, Save, Download } from 'lucide-react';

/* Form Components */
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import EducationForm from '../components/forms/EducationForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import CertificationsForm from '../components/forms/CertificationsForm';

/* Template Preview */
import AtsMinimalTemplate from '../components/templates/AtsMinimalTemplate';
import ProfessionalCorporateTemplate from '../components/templates/ProfessionalCorporateTemplate';
import ModernTechTemplate from '../components/templates/ModernTechTemplate';
import SimpleOnePageTemplate from '../components/templates/SimpleOnePageTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import TechProjectsTemplate from '../components/templates/TechProjectsTemplate';
import ModernTwoColumnTemplate from '../components/templates/ModernTwoColumnTemplate';

import { downloadPDF } from '../utils/pdfExport';

const steps = [
    'Personal Info',
    'Education',
    'Work Experience',
    'Skills',
    'Projects',
    'Certifications'
];

const dummyData = {
    personalInfo: {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        location: 'San Francisco, CA',
        linkedinUrl: 'linkedin.com/in/johndoe',
        portfolioUrl: 'github.com/johndoe',
        summary: 'Passionate software engineer with experience in building scalable applications and leading cross-functional teams to deliver high-quality software solutions.'
    },
    education: [
        {
            institution: 'University of California, Berkeley',
            degree: 'B.S. Computer Science',
            startDate: '2016',
            endDate: '2020',
            score: '3.8 GPA',
            description: 'Relevant Coursework: Data Structures, Algorithms, Artificial Intelligence.'
        }
    ],
    experience: [
        {
            company: 'ABC Corp',
            role: 'Software Developer',
            startDate: '2020',
            endDate: 'Present',
            description: '• Developed backend services using Node.js and improved database query performance by 40%.\n• Designed and implemented RESTful APIs for the customer portal.\n• Mentored junior developers and led the migration to microservices.'
        }
    ],
    skills: {
        technical: ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Docker', 'AWS'],
        tools: ['Git', 'VS Code', 'Postman', 'Jira'],
        soft: ['Leadership', 'Problem-solving', 'Agile/Scrum', 'Communication']
    },
    projects: [
        {
            title: 'AI Resume Analyzer',
            technologies: 'Python, NLP, React',
            link: 'github.com/johndoe/resume-analyzer',
            description: '• Built a full-stack application that analyzes resumes against job descriptions.\n• Implemented TF-IDF vectorization to calculate keyword match scores.'
        }
    ],
    certifications: [
        {
            name: 'AWS Certified Solutions Architect',
            issuer: 'Amazon Web Services',
            year: '2022'
        }
    ]
};

const BuilderWizard = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const { resumeData, setTemplate } = useResumeStore();
    const previewRef = useRef(null);
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    };

    const handleDownload = () => {
        setIsDownloading(true);
        // Wait for React to re-render the DOM without dummy data, then capture PDF, then restore dummy data
        setTimeout(() => {
            downloadPDF('resume-preview-container', `${resumeData.personalInfo.fullName || 'My'}_Resume.pdf`);
            setTimeout(() => setIsDownloading(false), 2000);
        }, 300);
    };

    const getPreviewData = () => {
        if (isDownloading) return resumeData;

        // Replace empty user inputs intelligently with dummy data for preview
        return {
            ...resumeData,
            personalInfo: {
                fullName: resumeData.personalInfo.fullName || dummyData.personalInfo.fullName,
                email: resumeData.personalInfo.email || dummyData.personalInfo.email,
                phone: resumeData.personalInfo.phone || dummyData.personalInfo.phone,
                location: resumeData.personalInfo.location || dummyData.personalInfo.location,
                linkedinUrl: resumeData.personalInfo.linkedinUrl || dummyData.personalInfo.linkedinUrl,
                portfolioUrl: resumeData.personalInfo.portfolioUrl || dummyData.personalInfo.portfolioUrl,
                summary: resumeData.personalInfo.summary || dummyData.personalInfo.summary,
            },
            education: resumeData.education.length > 0 ? resumeData.education : dummyData.education,
            experience: resumeData.experience.length > 0 ? resumeData.experience : dummyData.experience,
            projects: resumeData.projects.length > 0 ? resumeData.projects : dummyData.projects,
            certifications: resumeData.certifications.length > 0 ? resumeData.certifications : dummyData.certifications,
            skills: {
                technical: resumeData.skills?.technical?.length > 0 ? resumeData.skills.technical : dummyData.skills.technical,
                tools: resumeData.skills?.tools?.length > 0 ? resumeData.skills.tools : dummyData.skills.tools,
                soft: resumeData.skills?.soft?.length > 0 ? resumeData.skills.soft : dummyData.skills.soft,
            }
        };
    };

    const renderTemplate = () => {
        const previewData = getPreviewData();
        switch (resumeData.selectedTemplate) {
            case 'professional': return <ProfessionalCorporateTemplate data={previewData} />;
            case 'modern': return <ModernTechTemplate data={previewData} />;
            case 'onepage': return <SimpleOnePageTemplate data={previewData} />;
            case 'creative': return <CreativeTemplate data={previewData} />;
            case 'tech-projects': return <TechProjectsTemplate data={previewData} />;
            case 'modern-two-column': return <ModernTwoColumnTemplate data={previewData} />;
            case 'ats-minimal':
            default:
                return <AtsMinimalTemplate data={previewData} />;
        }
    };

    return (
        <div className="container py-10" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: 'calc(100vh - 100px)' }}>
            {/* Scrollable Form Section */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                <div style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
                    <h2 className="text-gradient">Resume Builder</h2>
                    <div className="flex items-center gap-2" style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <span style={{ color: currentStep === index ? 'var(--color-primary-light)' : 'inherit', fontWeight: currentStep === index ? 600 : 400 }}>
                                    {index + 1}. {step}
                                </span>
                                {index < steps.length - 1 && <ChevronRight size={14} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
                    {/* We will render step forms here dynamically */}
                    <div className="animate-fade-in" style={{ padding: '0.5rem' }}>
                        {currentStep === 0 && <PersonalInfoForm />}
                        {currentStep === 1 && <EducationForm />}
                        {currentStep === 2 && <ExperienceForm />}
                        {currentStep === 3 && <SkillsForm />}
                        {currentStep === 4 && <ProjectsForm />}
                        {currentStep === 5 && <CertificationsForm />}
                    </div>
                </div>

                <div className="flex justify-between" style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '1rem' }}>
                    <button className="btn btn-secondary" onClick={handlePrev} disabled={currentStep === 0}>
                        <ChevronLeft size={18} /> Previous
                    </button>

                    <div className="flex gap-4">
                        <button className="btn btn-secondary"><Save size={18} /> Save</button>
                        {currentStep < steps.length - 1 ? (
                            <button className="btn btn-primary" onClick={handleNext}>
                                Next <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button className="btn btn-success" style={{ background: 'var(--color-success)', color: 'white' }} onClick={() => navigate('/ats-score')}>
                                Analyze ATS Score <ChevronRight size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Live Preview Pane */}
            <div className="card" style={{ background: '#525659', color: '#000', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1rem', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="flex gap-2 items-center">
                        <span style={{ fontWeight: 600, marginRight: '1rem' }}>Template:</span>
                        <select
                            value={resumeData.selectedTemplate}
                            onChange={(e) => setTemplate(e.target.value)}
                            style={{ background: '#444', color: 'white', border: '1px solid #555', padding: '0.25rem 0.5rem', borderRadius: '4px' }}
                        >
                            <option value="ats-minimal">ATS Minimal</option>
                            <option value="professional">Professional</option>
                            <option value="modern">Modern Tech</option>
                            <option value="onepage">Simple One Page</option>
                            <option value="creative">Creative Outline</option>
                            <option value="tech-projects">Tech Projects</option>
                            <option value="modern-two-column">Modern Two Column</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={handleDownload}>
                        <Download size={16} /> Download PDF
                    </button>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <div id="resume-preview-container" ref={previewRef} style={{ width: '100%', maxWidth: '850px', background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', minHeight: '1100px' }}>
                        {renderTemplate()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuilderWizard;
