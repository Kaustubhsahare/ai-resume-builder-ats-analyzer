import React from 'react';

const ModernTechTemplate = ({ data }) => {
    if (!data) return null;
    const { personalInfo, education, experience, skills, projects, certifications } = data;

    // Calculate dynamic font size based on the longest word in the name
    // This prevents names like "KAUSTUBH" from breaking in half
    const longestWord = personalInfo.fullName
        ? Math.max(...personalInfo.fullName.split(' ').map(w => w.length))
        : 10;

    let nameFontSize = '20pt';
    if (longestWord >= 8) nameFontSize = '16pt';
    if (longestWord >= 10) nameFontSize = '14pt';
    if (longestWord >= 13) nameFontSize = '11pt';

    return (
        <div className="resume-template" style={{ display: 'flex', minHeight: '100%', fontFamily: '"Inter", sans-serif', color: '#333', background: 'white' }}>

            {/* Sidebar Focus */}
            <div style={{ width: '30%', background: '#1e293b', color: '#f8fafc', padding: '30px 20px' }}>
                <h1 style={{ fontSize: nameFontSize, fontWeight: 800, color: '#3b82f6', marginBottom: '20px', lineHeight: 1.1, wordBreak: 'keep-all', overflowWrap: 'normal' }}>
                    {personalInfo.fullName || 'YOUR NAME'}
                </h1>

                <div style={{ marginBottom: '30px', fontSize: '9pt', color: '#94a3b8', overflowWrap: 'anywhere' }}>
                    <div style={{ marginBottom: '8px' }}>{personalInfo.email}</div>
                    <div style={{ marginBottom: '8px' }}>{personalInfo.phone}</div>
                    <div style={{ marginBottom: '8px' }}>{personalInfo.location}</div>
                    {personalInfo.linkedinUrl && <div style={{ marginBottom: '8px' }}>{personalInfo.linkedinUrl}</div>}
                    {personalInfo.portfolioUrl && <div style={{ marginBottom: '8px' }}>{personalInfo.portfolioUrl}</div>}
                </div>

                {(skills.technical?.length > 0 || skills.tools?.length > 0) && (
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '10pt', color: '#f1f5f9', borderBottom: '1px solid #334155', paddingBottom: '8px', marginBottom: '12px' }}>Tech Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {[...skills.technical, ...skills.tools].map((skill, index) => (
                                <span key={index} style={{ background: '#3b82f6', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '8pt' }}>{skill}</span>
                            ))}
                        </div>
                    </div>
                )}

                {education.length > 0 && (
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '10pt', color: '#f1f5f9', borderBottom: '1px solid #334155', paddingBottom: '8px', marginBottom: '12px' }}>Education</h3>
                        {education.map((edu, index) => (
                            <div key={index} style={{ marginBottom: '16px', fontSize: '9pt' }}>
                                <div style={{ fontWeight: 600, color: '#93c5fd' }}>{edu.degree}</div>
                                <div>{edu.institution}</div>
                                <div style={{ color: '#64748b' }}>{edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                )}

                {certifications && certifications.length > 0 && (
                    <div>
                        <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '10pt', color: '#f1f5f9', borderBottom: '1px solid #334155', paddingBottom: '8px', marginBottom: '12px' }}>Certifications</h3>
                        {certifications.map((cert, index) => (
                            <div key={index} style={{ marginBottom: '12px', fontSize: '9pt' }}>
                                <div style={{ fontWeight: 600, color: '#93c5fd' }}>{cert.name}</div>
                                <div>{cert.issuer} ({cert.year})</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div style={{ width: '70%', padding: '40px 30px' }}>

                {personalInfo.summary && (
                    <div style={{ marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '16pt', color: '#1e293b', marginBottom: '12px', fontWeight: 700 }}>Profile</h2>
                        <p style={{ margin: 0, fontSize: '10pt', lineHeight: 1.6, color: '#475569' }}>{personalInfo.summary}</p>
                    </div>
                )}

                {experience.length > 0 && (
                    <div style={{ marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '16pt', color: '#1e293b', marginBottom: '16px', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                            Experience
                            <div style={{ flex: 1, height: '2px', background: '#e2e8f0', marginLeft: '16px' }}></div>
                        </h2>
                        {experience.map((exp, index) => (
                            <div key={index} style={{ marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                    <strong style={{ fontSize: '12pt', color: '#0f172a' }}>{exp.role}</strong>
                                    <span style={{ fontSize: '9pt', color: '#3b82f6', fontWeight: 600 }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                                </div>
                                <div style={{ fontSize: '10pt', color: '#64748b', marginBottom: '8px', fontWeight: 500 }}>{exp.company}</div>
                                {exp.description && <div style={{ fontSize: '10pt', color: '#475569', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{exp.description}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {projects.length > 0 && (
                    <div style={{ marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '16pt', color: '#1e293b', marginBottom: '16px', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                            Projects
                            <div style={{ flex: 1, height: '2px', background: '#e2e8f0', marginLeft: '16px' }}></div>
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {projects.map((proj, index) => (
                                <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                                    <strong style={{ display: 'block', fontSize: '11pt', color: '#0f172a', marginBottom: '4px' }}>{proj.title}</strong>
                                    {proj.technologies && <div style={{ fontSize: '8pt', color: '#3b82f6', marginBottom: '8px', fontWeight: 500 }}>{proj.technologies}</div>}
                                    {proj.description && <div style={{ fontSize: '9pt', color: '#475569', lineHeight: 1.4 }}>{proj.description}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {data.achievements && data.achievements.length > 0 && (
                    <div>
                        <h2 style={{ fontSize: '16pt', color: '#1e293b', marginBottom: '16px', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                            Achievements
                            <div style={{ flex: 1, height: '2px', background: '#e2e8f0', marginLeft: '16px' }}></div>
                        </h2>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '10pt', color: '#475569', lineHeight: 1.6 }}>
                            {data.achievements.map((ach, index) => (
                                <li key={index} style={{ marginBottom: '8px' }}>{ach.title || ach}</li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ModernTechTemplate;
