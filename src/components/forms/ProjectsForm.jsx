import React from 'react';
import useResumeStore from '../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = () => {
    const { resumeData, addProject, updateProject, removeProject } = useResumeStore();
    const { projects } = resumeData;

    const handleAdd = () => {
        addProject({ title: '', description: '', technologies: '', outcome: '', link: '' });
    };

    const handleChange = (index, field, value) => {
        const updatedProj = { ...projects[index], [field]: value };
        updateProject(index, updatedProj);
    };

    return (
        <div className="animate-fade-in">
            {projects.map((proj, index) => (
                <div key={index} className="card mb-4" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h4 style={{ margin: 0 }}>Project #{index + 1}</h4>
                        <button className="btn" style={{ padding: '0.5rem', color: 'var(--color-error)' }} onClick={() => removeProject(index)}>
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="input-group">
                            <label className="input-label">Project Title</label>
                            <input type="text" className="input-field" value={proj.title} onChange={(e) => handleChange(index, 'title', e.target.value)} placeholder="E-commerce Web App" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Project Link / Source Code</label>
                            <input type="url" className="input-field" value={proj.link} onChange={(e) => handleChange(index, 'link', e.target.value)} placeholder="https://github.com/..." />
                        </div>
                        <div className="input-group" style={{ gridColumn: 'span 2' }}>
                            <label className="input-label">Technologies Used</label>
                            <input type="text" className="input-field" value={proj.technologies} onChange={(e) => handleChange(index, 'technologies', e.target.value)} placeholder="React, Node.js, MongoDB" />
                        </div>
                        <div className="input-group" style={{ gridColumn: 'span 2' }}>
                            <label className="input-label">Description & Impact</label>
                            <textarea
                                className="input-field"
                                rows={3}
                                value={proj.description}
                                onChange={(e) => handleChange(index, 'description', e.target.value)}
                                placeholder="• Built a full-stack platform..."
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button className="btn btn-secondary w-full justify-center mt-4" onClick={handleAdd} style={{ width: '100%' }}>
                <Plus size={18} /> Add Project
            </button>
        </div>
    );
};

export default ProjectsForm;
