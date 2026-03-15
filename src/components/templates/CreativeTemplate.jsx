import React from 'react';

const CreativeTemplate = ({ data }) => {
    if (!data) return null;
    const { personalInfo, education, experience, skills, projects, certifications } = data;

    return (
        <div className="resume-template" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', fontFamily: '"Outfit", sans-serif', color: '#1f2937', background: '#fef3c7' }}>

            {/* Header Banner */}
            <div style={{ background: '#f59e0b', color: 'white', padding: '40px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)', marginBottom: '10px' }}>
                <div>
                    <h1 style={{ fontSize: '32pt', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>
                        {personalInfo.fullName || 'YOUR NAME'}
                    </h1>
                    <p style={{ margin: '10px 0 0', fontSize: '12pt', fontWeight: 500, opacity: 0.9 }}>
                        {personalInfo.summary ? personalInfo.summary.substring(0, 100) + '...' : 'Creative Professional'}
                    </p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '9pt', fontWeight: 600, background: 'rgba(0,0,0,0.1)', padding: '15px', borderRadius: '8px' }}>
                    <div>{personalInfo.email}</div>
                    <div>{personalInfo.phone}</div>
                    <div>{personalInfo.location}</div>
                    {personalInfo.linkedinUrl && <div>{personalInfo.linkedinUrl}</div>}
                    {personalInfo.portfolioUrl && <div>{personalInfo.portfolioUrl}</div>}
                </div>
            </div>

            {/* Main Grid Content */}
            <div style={{ padding: '20px 40px 40px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>

                {/* Left Column */}
                <div>
                    {(skills.technical?.length > 0 || skills.tools?.length > 0 || skills.soft?.length > 0) && (
                        <div style={{ marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '14pt', color: '#d97706', marginBottom: '15px', borderBottom: '2px solid #fcd34d', display: 'inline-block' }}>My Skills</h2>

                            {skills.technical?.length > 0 && (
                                <div style={{ marginBottom: '15px' }}>
                                    <strong style={{ display: 'block', fontSize: '10pt', marginBottom: '5px' }}>Technical</strong>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                        {skills.technical.map((s, i) => <span key={i} style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '12px', fontSize: '8pt' }}>{s}</span>)}
                                    </div>
                                </div>
                            )}

                            {skills.soft?.length > 0 && (
                                <div>
                                    <strong style={{ display: 'block', fontSize: '10pt', marginBottom: '5px' }}>Soft Skills</strong>
                                    <ul style={{ paddingLeft: '15px', margin: 0, fontSize: '9pt' }}>
                                        {skills.soft.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {education.length > 0 && (
                        <div style={{ marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '14pt', color: '#d97706', marginBottom: '15px', borderBottom: '2px solid #fcd34d', display: 'inline-block' }}>Education</h2>
                            {education.map((edu, index) => (
                                <div key={index} style={{ marginBottom: '15px', background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                    <strong style={{ display: 'block', fontSize: '10pt' }}>{edu.degree}</strong>
                                    <div style={{ fontSize: '9pt', color: '#4b5563' }}>{edu.institution}</div>
                                    <div style={{ fontSize: '8pt', color: '#9ca3af', marginTop: '5px', fontWeight: 600 }}>{edu.startDate} – {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {certifications && certifications.length > 0 && (
                        <div>
                            <h2 style={{ fontSize: '14pt', color: '#d97706', marginBottom: '15px', borderBottom: '2px solid #fcd34d', display: 'inline-block' }}>Certifications</h2>
                            {certifications.map((cert, index) => (
                                <div key={index} style={{ marginBottom: '15px', background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                    <strong style={{ display: 'block', fontSize: '10pt' }}>{cert.name}</strong>
                                    <div style={{ fontSize: '9pt', color: '#4b5563' }}>{cert.issuer}</div>
                                    <div style={{ fontSize: '8pt', color: '#9ca3af', marginTop: '5px', fontWeight: 600 }}>{cert.year}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div>
                    {personalInfo.summary && (
                        <div style={{ marginBottom: '30px', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '14pt', color: '#d97706', marginBottom: '10px', marginTop: 0 }}>About Me</h2>
                            <p style={{ margin: 0, fontSize: '10pt', lineHeight: 1.6 }}>{personalInfo.summary}</p>
                        </div>
                    )}

                    {experience.length > 0 && (
                        <div style={{ marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '14pt', color: '#d97706', marginBottom: '20px', borderBottom: '2px solid #fcd34d', display: 'inline-block' }}>Experience</h2>
                            <div style={{ borderLeft: '2px solid #fcd34d', paddingLeft: '20px', marginLeft: '10px' }}>
                                {experience.map((exp, index) => (
                                    <div key={index} style={{ marginBottom: '25px', position: 'relative' }}>
                                        <div style={{ position: 'absolute', width: '12px', height: '12px', background: '#f59e0b', borderRadius: '50%', left: '-27px', top: '4px' }}></div>
                                        <strong style={{ fontSize: '12pt', display: 'block' }}>{exp.role} <span style={{ color: '#d97706', fontWeight: 500 }}>@ {exp.company}</span></strong>
                                        <div style={{ fontSize: '9pt', color: '#6b7280', marginBottom: '8px', fontWeight: 600 }}>{exp.startDate} – {exp.endDate || 'Present'}</div>
                                        {exp.description && <div style={{ fontSize: '10pt', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{exp.description}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {projects.length > 0 && (
                        <div style={{ marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '14pt', color: '#d97706', marginBottom: '15px', borderBottom: '2px solid #fcd34d', display: 'inline-block' }}>Projects</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {projects.map((proj, index) => (
                                    <div key={index} style={{ background: 'white', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '4px solid #f59e0b' }}>
                                        <strong style={{ fontSize: '11pt', display: 'block' }}>{proj.title}</strong>
                                        {proj.technologies && <div style={{ fontSize: '8pt', color: '#d97706', marginBottom: '5px', fontWeight: 600 }}>{proj.technologies}</div>}
                                        {proj.description && <div style={{ fontSize: '9pt', lineHeight: 1.4 }}>{proj.description}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.achievements && data.achievements.length > 0 && (
                        <div>
                            <h2 style={{ fontSize: '14pt', color: '#d97706', marginBottom: '15px', borderBottom: '2px solid #fcd34d', display: 'inline-block' }}>Achievements</h2>
                            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '10pt', color: '#4b5563', lineHeight: 1.6 }}>
                                {data.achievements.map((ach, index) => (
                                    <li key={index} style={{ marginBottom: '8px' }}>{ach.title || ach}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
