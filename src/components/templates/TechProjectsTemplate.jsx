import React from 'react';

const TechProjectsTemplate = ({ data }) => {
    if (!data) return null;
    const { personalInfo, education, experience, skills, projects, certifications } = data;

    return (
        <div className="resume-template" style={{ padding: '40px', fontFamily: '"JetBrains Mono", monospace, sans-serif', color: '#1a202c', background: '#f7fafc', lineHeight: '1.6', fontSize: '10pt' }}>

            {/* Header */}
            <div style={{ borderBottom: '3px solid #2b6cb0', paddingBottom: '20px', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '28pt', fontWeight: 900, color: '#2b6cb0', margin: '0 0 10px 0', letterSpacing: '-1px' }}>
                    {personalInfo.fullName || 'YOUR NAME'}
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '9.5pt', color: '#4a5568', fontWeight: 500 }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                    {personalInfo.linkedinUrl && <span>• {personalInfo.linkedinUrl}</span>}
                    {personalInfo.portfolioUrl && <span style={{ color: '#2b6cb0' }}>• {personalInfo.portfolioUrl}</span>}
                </div>
            </div>

            {/* Summary */}
            {personalInfo.summary && (
                <div style={{ marginBottom: '25px', background: 'white', padding: '15px', borderRadius: '4px', borderLeft: '4px solid #4299e1' }}>
                    <p style={{ margin: 0 }}>{personalInfo.summary}</p>
                </div>
            )}

            {/* Technical Skills (Priority 1) */}
            {(skills.technical?.length > 0 || skills.tools?.length > 0) && (
                <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#2d3748', textTransform: 'uppercase', marginBottom: '10px' }}>&gt; Technical Skills</h2>

                    {skills.technical?.length > 0 && (
                        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'baseline' }}>
                            <strong style={{ width: '120px', color: '#4a5568' }}>Languages/Frameworks:</strong>
                            <span style={{ flex: 1 }}>{skills.technical.join(', ')}</span>
                        </div>
                    )}

                    {skills.tools?.length > 0 && (
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <strong style={{ width: '120px', color: '#4a5568' }}>Tools/Platforms:</strong>
                            <span style={{ flex: 1 }}>{skills.tools.join(', ')}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Projects (Priority 2) */}
            {projects && projects.length > 0 && (
                <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#2d3748', textTransform: 'uppercase', marginBottom: '15px' }}>&gt; Featured Projects</h2>
                    {projects.map((proj, index) => (
                        <div key={index} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                <strong style={{ fontSize: '12pt', color: '#2b6cb0' }}>{proj.title}</strong>
                                {proj.link && <span style={{ fontSize: '9pt', color: '#718096', fontFamily: 'monospace' }}>[{proj.link}]</span>}
                            </div>
                            {proj.technologies && <div style={{ fontSize: '9pt', fontWeight: 600, color: '#4a5568', marginBottom: '6px' }}>Stack: {proj.technologies}</div>}
                            {proj.description && <div style={{ paddingLeft: '15px', borderLeft: '2px solid #e2e8f0', whiteSpace: 'pre-wrap' }}>{proj.description}</div>}
                        </div>
                    ))}
                </div>
            )}

            {/* Experience (Priority 3) */}
            {experience.length > 0 && (
                <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#2d3748', textTransform: 'uppercase', marginBottom: '15px' }}>&gt; Work Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                <strong style={{ fontSize: '12pt', color: '#1a202c' }}>{exp.role}</strong>
                                <span style={{ fontSize: '10pt', color: '#4a5568', fontWeight: 600 }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                            </div>
                            <div style={{ fontSize: '10pt', color: '#2b6cb0', marginBottom: '6px', fontWeight: 600 }}>@ {exp.company}</div>
                            {exp.description && <div style={{ whiteSpace: 'pre-wrap' }}>{exp.description}</div>}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#2d3748', textTransform: 'uppercase', marginBottom: '15px' }}>&gt; Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong style={{ fontSize: '11pt' }}>{edu.degree}</strong>
                                <span style={{ fontSize: '10pt', color: '#4a5568', fontWeight: 600 }}>{edu.startDate} – {edu.endDate}</span>
                            </div>
                            <div style={{ color: '#4a5568' }}>{edu.institution} {edu.score && <span>| GPA: {edu.score}</span>}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Certifications & Achievements in 2 columns at bottom */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {certifications && certifications.length > 0 && (
                    <div>
                        <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#2d3748', textTransform: 'uppercase', marginBottom: '10px' }}>&gt; Certifications</h2>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                            {certifications.map((cert, index) => (
                                <li key={index} style={{ marginBottom: '4px' }}>
                                    <strong style={{ color: '#2b6cb0' }}>{cert.name}</strong> – {cert.issuer} ({cert.year})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {data.achievements && data.achievements.length > 0 && (
                    <div>
                        <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#2d3748', textTransform: 'uppercase', marginBottom: '10px' }}>&gt; Achievements</h2>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                            {data.achievements.map((ach, index) => (
                                <li key={index} style={{ marginBottom: '4px' }}>{ach.title || ach}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

        </div>
    );
};

export default TechProjectsTemplate;
