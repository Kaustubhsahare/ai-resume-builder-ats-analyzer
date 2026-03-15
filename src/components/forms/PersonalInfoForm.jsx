import React from 'react';
import useResumeStore from '../../store/useResumeStore';

const PersonalInfoForm = () => {
    const { resumeData, updatePersonalInfo } = useResumeStore();
    const { personalInfo } = resumeData;

    const handleChange = (e) => {
        updatePersonalInfo({ [e.target.name]: e.target.value });
    };

    return (
        <div className="animate-fade-in grid grid-cols-2 gap-4">
            <div className="input-group">
                <label className="input-label">Full Name</label>
                <input type="text" className="input-field" name="fullName" value={personalInfo.fullName} onChange={handleChange} placeholder="John Doe" />
            </div>

            <div className="input-group">
                <label className="input-label">Email</label>
                <input type="email" className="input-field" name="email" value={personalInfo.email} onChange={handleChange} placeholder="john@example.com" />
            </div>

            <div className="input-group">
                <label className="input-label">Phone</label>
                <input type="tel" className="input-field" name="phone" value={personalInfo.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
            </div>

            <div className="input-group">
                <label className="input-label">Location</label>
                <input type="text" className="input-field" name="location" value={personalInfo.location} onChange={handleChange} placeholder="New York, NY" />
            </div>

            <div className="input-group">
                <label className="input-label">LinkedIn URL</label>
                <input type="url" className="input-field" name="linkedinUrl" value={personalInfo.linkedinUrl} onChange={handleChange} placeholder="https://linkedin.com/in/johndoe" />
            </div>

            <div className="input-group">
                <label className="input-label">Portfolio / GitHub</label>
                <input type="url" className="input-field" name="portfolioUrl" value={personalInfo.portfolioUrl} onChange={handleChange} placeholder="https://github.com/johndoe" />
            </div>

            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label className="input-label">Professional Summary</label>
                <textarea
                    className="input-field"
                    name="summary"
                    value={personalInfo.summary}
                    onChange={handleChange}
                    placeholder="Brief overview of your professional background and goals..."
                    rows={4}
                />
            </div>
        </div>
    );
};

export default PersonalInfoForm;
