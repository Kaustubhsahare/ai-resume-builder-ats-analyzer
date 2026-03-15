import React, { useState } from 'react';
import useResumeStore from '../../store/useResumeStore';
import { Sparkles, Plus, X } from 'lucide-react';

const SkillsForm = () => {
    const { resumeData, updateSkills } = useResumeStore();
    const { skills } = resumeData;
    const [techInput, setTechInput] = useState('');
    const [softInput, setSoftInput] = useState('');
    const [toolInput, setToolInput] = useState('');

    const handleAddSkill = (category, value, setInput) => {
        if (!value.trim()) return;
        const currentList = skills[category] || [];
        if (!currentList.includes(value.trim())) {
            updateSkills({ [category]: [...currentList, value.trim()] });
        }
        setInput('');
    };

    const handleRemoveSkill = (category, index) => {
        const currentList = [...(skills[category] || [])];
        currentList.splice(index, 1);
        updateSkills({ [category]: currentList });
    };

    const renderSkillChips = (category) => {
        return (
            <div className="flex flex-wrap gap-2 mt-2">
                {(skills[category] || []).map((skill, index) => (
                    <span key={index} style={{ background: 'var(--color-primary-light)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {skill}
                        <X size={14} className="cursor-pointer" onClick={() => handleRemoveSkill(category, index)} />
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
            <div className="card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                <div className="flex justify-between items-center mb-4">
                    <h4 style={{ margin: 0, color: 'var(--color-primary-light)' }}>
                        <Sparkles size={18} className="inline mr-2" /> AI Auto-Detect (Coming Soon)
                    </h4>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    The system will automatically detect skills from your experience and project descriptions to suggest new additions!
                </p>
            </div>

            <div className="input-group">
                <label className="input-label">Technical Skills & Languages</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="input-field"
                        style={{ flex: 1 }}
                        placeholder="e.g. JavaScript, Python, React"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill('technical', techInput, setTechInput)}
                    />
                    <button className="btn btn-secondary" onClick={() => handleAddSkill('technical', techInput, setTechInput)}><Plus size={18} /></button>
                </div>
                {renderSkillChips('technical')}
            </div>

            <div className="input-group gap-4 mt-4">
                <label className="input-label">Tools & Frameworks</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="input-field"
                        style={{ flex: 1 }}
                        placeholder="e.g. Git, Docker, Kubernetes"
                        value={toolInput}
                        onChange={(e) => setToolInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill('tools', toolInput, setToolInput)}
                    />
                    <button className="btn btn-secondary" onClick={() => handleAddSkill('tools', toolInput, setToolInput)}><Plus size={18} /></button>
                </div>
                {renderSkillChips('tools')}
            </div>

            <div className="input-group gap-4 mt-4">
                <label className="input-label">Soft Skills</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="input-field"
                        style={{ flex: 1 }}
                        placeholder="e.g. Leadership, Communication, Agile"
                        value={softInput}
                        onChange={(e) => setSoftInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill('soft', softInput, setSoftInput)}
                    />
                    <button className="btn btn-secondary" onClick={() => handleAddSkill('soft', softInput, setSoftInput)}><Plus size={18} /></button>
                </div>
                {renderSkillChips('soft')}
            </div>
        </div>
    );
};

export default SkillsForm;
