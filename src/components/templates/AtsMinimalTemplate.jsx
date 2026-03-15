import React from 'react';

const AtsMinimalTemplate = ({ data }) => {
    if (!data) return null;
    const { personalInfo, education, experience, skills, projects, certifications } = data;

    return (
        <div className="resume-template" style={{ padding: '40px', fontFamily: 'Arial, sans-serif', color: '#000', background: 'white', lineHeight: '1.4', fontSize: '11pt' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <h1 style={{ fontSize: '24pt', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                    {personalInfo.fullName || 'YOUR NAME'}
                </h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '10pt', color: '#333' }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                    {personalInfo.location && <span>| {personalInfo.location}</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '10pt', color: '#333', marginTop: '4px' }}>
                    {personalInfo.linkedinUrl && <a href={personalInfo.linkedinUrl} style={{ color: '#000', textDecoration: 'none' }}>LinkedIn</a>}
                    {personalInfo.portfolioUrl && <a href={personalInfo.portfolioUrl} style={{ color: '#000', textDecoration: 'none' }}>Portfolio/GitHub</a>}
                </div>
            </div>

            {/* Summary */}
            {personalInfo.summary && (
                <div style={{ marginBottom: '1rem' }}>
                    <p style={{ margin: 0 }}>{personalInfo.summary}</p>
                </div>
            )}

            {/* Skills */}
            {(skills.technical?.length > 0 || skills.tools?.length > 0 || skills.soft?.length > 0) && (
                <div style={{ marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '12pt', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px' }}>Skills</h2>
                    {skills.technical?.length > 0 && <div style={{ marginBottom: '4px' }}><strong>Technical:</strong> {skills.technical.join(', ')}</div>}
                    {skills.tools?.length > 0 && <div style={{ marginBottom: '4px' }}><strong>Tools:</strong> {skills.tools.join(', ')}</div>}
                    {skills.soft?.length > 0 && <div style={{ marginBottom: '4px' }}><strong>Soft Skills:</strong> {skills.soft.join(', ')}</div>}
                </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '12pt', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px' }}>Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <span>{exp.role} | {exp.company}</span>
                                <span>{exp.startDate} – {exp.endDate || 'Present'}</span>
                            </div>
                            {exp.description && (
                                <div style={{ marginTop: '4px', whiteSpace: 'pre-wrap' }}>{exp.description}</div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '12pt', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px' }}>Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <span>{edu.degree} | {edu.institution}</span>
                                <span>{edu.startDate} – {edu.endDate}</span>
                            </div>
                            {edu.score && <div>GPA/Score: {edu.score}</div>}
                            {edu.description && <div style={{ marginTop: '4px' }}>{edu.description}</div>}
                        </div>
                    ))}
                </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '12pt', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px' }}>Projects</h2>
                    {projects.map((proj, index) => (
                        <div key={index} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <span>{proj.title} {proj.link && <span style={{ fontWeight: 'normal', fontSize: '10pt' }}>({proj.link})</span>}</span>
                            </div>
                            {proj.technologies && <div style={{ fontStyle: 'italic', marginBottom: '4px', fontSize: '10pt' }}>Technologies: {proj.technologies}</div>}
                            {proj.description && <div style={{ whiteSpace: 'pre-wrap' }}>{proj.description}</div>}
                        </div>
                    ))}
                </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
                <div>
                    <h2 style={{ fontSize: '12pt', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px' }}>Certifications</h2>
                    {certifications.map((cert, index) => (
                        <div key={index} style={{ marginBottom: '4px' }}>
                            • <strong>{cert.name}</strong> - {cert.issuer} ({cert.year})
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default AtsMinimalTemplate;
