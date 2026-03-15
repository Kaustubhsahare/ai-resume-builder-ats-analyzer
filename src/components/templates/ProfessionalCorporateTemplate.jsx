import React from 'react';

const ProfessionalCorporateTemplate = ({ data }) => {
    if (!data) return null;
    const { personalInfo, education, experience, skills, projects, certifications } = data;

    return (
        <div className="resume-template" style={{ padding: '40px', fontFamily: '"Times New Roman", Times, serif', color: '#000', background: 'white', lineHeight: '1.5', fontSize: '11pt' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '26pt', color: '#1a365d', marginBottom: '0.25rem' }}>
                    {personalInfo.fullName || 'YOUR NAME'}
                </h1>
                <p style={{ color: '#4a5568', margin: 0, fontSize: '10pt' }}>
                    {personalInfo.location && <span>{personalInfo.location} | </span>}
                    {personalInfo.phone && <span>{personalInfo.phone} | </span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                </p>
                <p style={{ color: '#4a5568', margin: 0, fontSize: '10pt' }}>
                    {personalInfo.linkedinUrl && <span>{personalInfo.linkedinUrl} | </span>}
                    {personalInfo.portfolioUrl && <span>{personalInfo.portfolioUrl}</span>}
                </p>
            </div>

            {personalInfo.summary && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#1a365d', fontSize: '14pt', borderBottom: '2px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px', textTransform: 'uppercase' }}>Professional Summary</h2>
                    <p style={{ margin: 0 }}>{personalInfo.summary}</p>
                </div>
            )}

            {experience.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#1a365d', fontSize: '14pt', borderBottom: '2px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>Professional Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                <strong style={{ fontSize: '12pt' }}>{exp.role}</strong>
                                <strong>{exp.startDate} – {exp.endDate || 'Present'}</strong>
                            </div>
                            <div style={{ fontStyle: 'italic', color: '#4a5568', marginBottom: '8px' }}>{exp.company}</div>
                            {exp.description && <div style={{ paddingLeft: '1rem', whiteSpace: 'pre-wrap' }}>{exp.description}</div>}
                        </div>
                    ))}
                </div>
            )}

            {(skills.technical?.length > 0 || skills.tools?.length > 0 || skills.soft?.length > 0) && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#1a365d', fontSize: '14pt', borderBottom: '2px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>Core Competencies</h2>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                        {[...skills.technical, ...skills.tools, ...skills.soft].map((skill, index) => (
                            <li key={index} style={{ marginBottom: '4px' }}>{skill}</li>
                        ))}
                    </ul>
                </div>
            )}

            {education.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#1a365d', fontSize: '14pt', borderBottom: '2px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong style={{ fontSize: '12pt' }}>{edu.institution}</strong>
                                <strong>{edu.startDate} – {edu.endDate}</strong>
                            </div>
                            <div>{edu.degree} {edu.score && <span>| GPA: {edu.score}</span>}</div>
                        </div>
                    ))}
                </div>
            )}

            {projects && projects.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#1a365d', fontSize: '14pt', borderBottom: '2px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>Key Projects</h2>
                    {projects.map((proj, index) => (
                        <div key={index} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                <strong style={{ fontSize: '12pt' }}>{proj.title}</strong>
                                {proj.link && <span style={{ fontSize: '10pt', color: '#3182ce' }}>{proj.link}</span>}
                            </div>
                            {proj.technologies && <div style={{ fontStyle: 'italic', color: '#4a5568', marginBottom: '4px' }}>Technologies: {proj.technologies}</div>}
                            {proj.description && <div style={{ paddingLeft: '1rem', whiteSpace: 'pre-wrap' }}>{proj.description}</div>}
                        </div>
                    ))}
                </div>
            )}

            {certifications && certifications.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#1a365d', fontSize: '14pt', borderBottom: '2px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>Certifications</h2>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                        {certifications.map((cert, index) => (
                            <li key={index} style={{ marginBottom: '4px' }}>
                                <strong>{cert.name}</strong> – {cert.issuer} ({cert.year})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {data.achievements && data.achievements.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#1a365d', fontSize: '14pt', borderBottom: '2px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>Achievements</h2>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                        {data.achievements.map((ach, index) => (
                            <li key={index} style={{ marginBottom: '4px' }}>{ach.title || ach}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfessionalCorporateTemplate;
