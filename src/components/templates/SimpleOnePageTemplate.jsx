import React from 'react';

const SimpleOnePageTemplate = ({ data }) => {
    if (!data) return null;
    const { personalInfo, education, experience, skills, projects } = data;

    return (
        <div className="resume-template" style={{ padding: '30px', fontFamily: '"Georgia", serif', color: '#111', background: 'white', lineHeight: '1.4', fontSize: '10pt' }}>

            {/* Header */}
            <div style={{ paddingBottom: '10px', marginBottom: '15px' }}>
                <h1 style={{ fontSize: '22pt', fontWeight: 'normal', margin: 0, color: '#000' }}>
                    {personalInfo.fullName || 'YOUR NAME'}
                </h1>
                <div style={{ marginTop: '5px', fontSize: '9pt', color: '#555' }}>
                    {personalInfo.email && <span>{personalInfo.email} • </span>}
                    {personalInfo.phone && <span>{personalInfo.phone} • </span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
                <div style={{ fontSize: '9pt', color: '#555' }}>
                    {personalInfo.linkedinUrl && <span>{personalInfo.linkedinUrl} • </span>}
                    {personalInfo.portfolioUrl && <span>{personalInfo.portfolioUrl}</span>}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>

                {/* Left Column: Summary, Skills, Education */}
                <div>
                    {personalInfo.summary && (
                        <div style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '10px' }}>Profile</h2>
                            <p style={{ margin: 0, textAlign: 'justify' }}>{personalInfo.summary}</p>
                        </div>
                    )}

                    {(skills.technical?.length > 0 || skills.tools?.length > 0) && (
                        <div style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '10px' }}>Skills</h2>
                            {skills.technical?.length > 0 && <div style={{ marginBottom: '6px' }}><strong>Tech:</strong> {skills.technical.join(', ')}</div>}
                            {skills.tools?.length > 0 && <div style={{ marginBottom: '6px' }}><strong>Tools:</strong> {skills.tools.join(', ')}</div>}
                            {skills.soft?.length > 0 && <div><strong>Soft:</strong> {skills.soft.join(', ')}</div>}
                        </div>
                    )}

                    {education.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '10px' }}>Education</h2>
                            {education.map((edu, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{edu.degree}</div>
                                    <div>{edu.institution}</div>
                                    <div style={{ color: '#555', fontSize: '9pt' }}>{edu.startDate} – {edu.endDate}</div>
                                    {edu.score && <div style={{ fontSize: '9pt' }}>GPA: {edu.score}</div>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Experience, Projects */}
                <div>
                    {experience.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '10px' }}>Experience</h2>
                            {experience.map((exp, index) => (
                                <div key={index} style={{ marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                        <span>{exp.role}</span>
                                        <span style={{ fontSize: '9pt', fontWeight: 'normal', color: '#555' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                                    </div>
                                    <div style={{ fontStyle: 'italic', marginBottom: '6px' }}>{exp.company}</div>
                                    {exp.description && <div style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{exp.description}</div>}
                                </div>
                            ))}
                        </div>
                    )}

                    {projects.length > 0 && (
                        <div>
                            <h2 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '10px' }}>Projects</h2>
                            {projects.map((proj, index) => (
                                <div key={index} style={{ marginBottom: '12px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{proj.title}</div>
                                    {proj.technologies && <div style={{ fontSize: '9pt', fontStyle: 'italic', marginBottom: '4px' }}>{proj.technologies}</div>}
                                    {proj.description && <div style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{proj.description}</div>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimpleOnePageTemplate;
