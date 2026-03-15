import React from 'react';
import useResumeStore from '../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = () => {
    const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();
    const { experience } = resumeData;

    const handleAdd = () => {
        addExperience({ company: '', role: '', startDate: '', endDate: '', description: '' });
    };

    const handleChange = (index, field, value) => {
        const updatedExp = { ...experience[index], [field]: value };
        updateExperience(index, updatedExp);
    };

    return (
        <div className="animate-fade-in">
            {experience.map((exp, index) => (
                <div key={index} className="card mb-4" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h4 style={{ margin: 0 }}>Experience #{index + 1}</h4>
                        <button className="btn" style={{ padding: '0.5rem', color: 'var(--color-error)' }} onClick={() => removeExperience(index)}>
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="input-group">
                            <label className="input-label">Company Name</label>
                            <input type="text" className="input-field" value={exp.company} onChange={(e) => handleChange(index, 'company', e.target.value)} placeholder="Google" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Role / Position</label>
                            <input type="text" className="input-field" value={exp.role} onChange={(e) => handleChange(index, 'role', e.target.value)} placeholder="Software Engineer" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Start Date</label>
                            <input type="month" className="input-field" value={exp.startDate} onChange={(e) => handleChange(index, 'startDate', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">End Date (Leave blank if current)</label>
                            <input type="month" className="input-field" value={exp.endDate} onChange={(e) => handleChange(index, 'endDate', e.target.value)} />
                        </div>
                        <div className="input-group" style={{ gridColumn: 'span 2' }}>
                            <label className="input-label">Responsibilities & Achievements</label>
                            <textarea
                                className="input-field"
                                rows={4}
                                value={exp.description}
                                onChange={(e) => handleChange(index, 'description', e.target.value)}
                                placeholder="• Developed new features using React...&#10;• Improved performance by 20%..."
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button className="btn btn-secondary w-full justify-center mt-4" onClick={handleAdd} style={{ width: '100%' }}>
                <Plus size={18} /> Add Experience
            </button>
        </div>
    );
};

export default ExperienceForm;
