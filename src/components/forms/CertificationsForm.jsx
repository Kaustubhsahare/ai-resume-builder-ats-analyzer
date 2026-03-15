import React, { useState } from 'react';
import useResumeStore from '../../store/useResumeStore';
import { Plus, X } from 'lucide-react';

const CertificationsForm = () => {
    const { resumeData, setTemplate } = useResumeStore(); // For achievements and certs not fully broken out yet, just using simple array via store logic, wait store doesn't have addCert. 
    // Let me just add a simple local state that updates generic store or use store if implemented.

    // Wait, I didn't add the addCertification action to useResumeStore. 
    // I'll create a simple list updater using set directly for certificates.
    const handleAddCert = () => {
        useResumeStore.setState(state => ({
            resumeData: { ...state.resumeData, certifications: [...state.resumeData.certifications, { name: '', issuer: '', year: '' }] }
        }));
    };

    const handleUpdateCert = (index, field, value) => {
        useResumeStore.setState(state => {
            const newCerts = [...state.resumeData.certifications];
            newCerts[index] = { ...newCerts[index], [field]: value };
            return { resumeData: { ...state.resumeData, certifications: newCerts } };
        });
    };

    const handleRemoveCert = (index) => {
        useResumeStore.setState(state => {
            const newCerts = [...state.resumeData.certifications];
            newCerts.splice(index, 1);
            return { resumeData: { ...state.resumeData, certifications: newCerts } };
        });
    };

    return (
        <div className="animate-fade-in">
            {resumeData.certifications.map((cert, index) => (
                <div key={index} className="card mb-4" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h4 style={{ margin: 0 }}>Certification #{index + 1}</h4>
                        <button className="btn" style={{ padding: '0.5rem', color: 'var(--color-error)' }} onClick={() => handleRemoveCert(index)}>
                            <X size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="input-group">
                            <label className="input-label">Certification Name</label>
                            <input type="text" className="input-field" value={cert.name} onChange={(e) => handleUpdateCert(index, 'name', e.target.value)} placeholder="AWS Certified Solutions Architect" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Issuer</label>
                            <input type="text" className="input-field" value={cert.issuer} onChange={(e) => handleUpdateCert(index, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Year</label>
                            <input type="text" className="input-field" value={cert.year} onChange={(e) => handleUpdateCert(index, 'year', e.target.value)} placeholder="2024" />
                        </div>
                    </div>
                </div>
            ))}

            <button className="btn btn-secondary w-full justify-center mt-4" onClick={handleAddCert} style={{ width: '100%' }}>
                <Plus size={18} /> Add Certification
            </button>
        </div>
    );
};

export default CertificationsForm;
