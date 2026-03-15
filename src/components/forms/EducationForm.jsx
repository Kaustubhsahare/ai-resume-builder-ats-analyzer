import React from 'react';
import useResumeStore from '../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = () => {
    const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
    const { education } = resumeData;

    const handleAdd = () => {
        addEducation({ degree: '', institution: '', score: '', startDate: '', endDate: '', description: '' });
    };

    const handleChange = (index, field, value) => {
        const updatedEdu = { ...education[index], [field]: value };
        updateEducation(index, updatedEdu);
    };

    return (
        <div className="animate-fade-in">
            {education.map((edu, index) => (
                <div key={index} className="card mb-4" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h4 style={{ margin: 0 }}>Education #{index + 1}</h4>
                        <button className="btn" style={{ padding: '0.5rem', color: 'var(--color-error)' }} onClick={() => removeEducation(index)}>
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="input-group">
                            <label className="input-label">Degree / Program</label>
                            <input type="text" className="input-field" value={edu.degree} onChange={(e) => handleChange(index, 'degree', e.target.value)} placeholder="B.S. Computer Science" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Institution</label>
                            <input type="text" className="input-field" value={edu.institution} onChange={(e) => handleChange(index, 'institution', e.target.value)} placeholder="University Name" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Start Date</label>
                            <input type="month" className="input-field" value={edu.startDate} onChange={(e) => handleChange(index, 'startDate', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">End Date</label>
                            <input type="month" className="input-field" value={edu.endDate} onChange={(e) => handleChange(index, 'endDate', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">CGPA / Percentage</label>
                            <input type="text" className="input-field" value={edu.score} onChange={(e) => handleChange(index, 'score', e.target.value)} placeholder="3.8 / 4.0" />
                        </div>
                        <div className="input-group" style={{ gridColumn: 'span 2' }}>
                            <label className="input-label">Description (Optional)</label>
                            <textarea className="input-field" rows={2} value={edu.description} onChange={(e) => handleChange(index, 'description', e.target.value)} placeholder="Relevant coursework, honors, etc." />
                        </div>
                    </div>
                </div>
            ))}

            <button className="btn btn-secondary w-full justify-center mt-4" onClick={handleAdd} style={{ width: '100%' }}>
                <Plus size={18} /> Add Education
            </button>
        </div>
    );
};

export default EducationForm;
