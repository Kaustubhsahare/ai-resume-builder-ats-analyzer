import React, { useState } from 'react';
import useResumeStore from '../store/useResumeStore';
import { matchJobDescription } from '../services/aiService';
import { Check, X, Search, Zap, Target, FileText, Upload } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure pdfjs worker natively for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const JobMatch = () => {
    const { resumeData } = useResumeStore();
    const [jobText, setJobText] = useState('');
    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    // New States for Upload feature
    const [activeTab, setActiveTab] = useState('builder'); // 'builder' or 'upload'
    const [uploadedText, setUploadedText] = useState('');

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n';
                }
                setUploadedText(fullText);
            } catch (err) {
                console.error("Error extracting PDF text:", err);
                setError('Failed to extract text from PDF file.');
            }
        } else {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedText(event.target.result);
            };
            reader.readAsText(file);
        }
    };

    const handleMatch = async () => {
        if (!jobText.trim()) {
            setError('Please provide a job description for analysis.');
            return;
        }

        const payload = activeTab === 'builder' ? resumeData : uploadedText;
        if (activeTab === 'upload' && !uploadedText.trim()) {
            setError('Please paste or upload resume text first.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const data = await matchJobDescription(payload, jobText, role, company);
            setResult(data);
        } catch (err) {
            setError('Failed to analyze the job match. Ensure your API key is valid.');
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 75) return 'var(--color-success)';
        if (score >= 50) return 'var(--color-warning)';
        return 'var(--color-error)';
    };

    return (
        <div className="container py-10 animate-fade-in">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Job Match Analyzer</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
                        Paste a job description to see how well your resume matches. We'll identify missing keywords and suggest optimizations.
                    </p>
                </div>
            </div>

            {/* Input Selection Tabs */}
            <div className="flex gap-4 mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <button
                    className={`btn ${activeTab === 'builder' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => { setActiveTab('builder'); setResult(null); }}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                    <FileText size={16} /> Use Builder Resume
                </button>
                <button
                    className={`btn ${activeTab === 'upload' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => { setActiveTab('upload'); setResult(null); }}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                    <Upload size={16} /> Upload / Paste Text
                </button>
            </div>

            <div className="grid gap-8" style={{ gridTemplateColumns: result ? 'minmax(0, 1fr) minmax(0, 1fr)' : '1fr' }} className={`grid gap-8 ${result ? 'md-grid-cols-2' : ''}`}>

                {/* Input Form Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Upload Area (Visible only on 'upload' tab) */}
                    {activeTab === 'upload' && (
                        <div className="card animate-fade-in" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div className="flex justify-between items-center mb-4 md-flex-row md-justify-between">
                                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Paste your Resume text</h3>
                                <div>
                                    <input
                                        type="file"
                                        id="resume-upload"
                                        accept=".txt,.pdf"
                                        style={{ display: 'none' }}
                                        onChange={handleFileUpload}
                                    />
                                    <label htmlFor="resume-upload" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                                        <Upload size={16} /> Upload .pdf or .txt
                                    </label>
                                </div>
                            </div>
                            <textarea
                                className="input-field w-full"
                                rows={8}
                                placeholder="Paste the raw text of your resume here to analyze it against the job description..."
                                value={uploadedText}
                                onChange={(e) => setUploadedText(e.target.value)}
                                style={{ fontFamily: 'monospace', fontSize: '0.875rem', resize: 'vertical' }}
                            ></textarea>
                        </div>
                    )}

                    <div className="card">
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Target size={20} color="var(--color-primary-light)" /> Target Role Details
                        </h3>
                        <div className="grid md-grid-cols-2 gap-4">
                            <div className="input-group">
                                <label className="input-label">Company Name (Optional)</label>
                                <input type="text" className="input-field" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Google" />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Job Role (Optional)</label>
                                <input type="text" className="input-field" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Frontend Engineer" />
                            </div>
                        </div>

                        <div className="input-group mt-4">
                            <label className="input-label">Paste Job Description *</label>
                            <textarea
                                className="input-field"
                                rows={activeTab === 'upload' ? 6 : 12}
                                value={jobText}
                                onChange={(e) => setJobText(e.target.value)}
                                placeholder="Paste the full job requirements and description here..."
                                style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                            />
                        </div>

                        {error && <div style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '1rem' }}>{error}</div>}

                        <button className="btn btn-primary mt-6 w-full" style={{ width: '100%', justifyContent: 'center' }} onClick={handleMatch} disabled={loading}>
                            <Search size={18} /> {loading ? 'Analyzing Match...' : 'Calculate Job Match'}
                        </button>
                    </div>
                </div>

                {/* Results Column */}
                {result && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>

                        {/* Match Score Card */}
                        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-surface-light)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                                <svg width="120" height="120" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                                    <circle cx="60" cy="60" r="54" fill="none" stroke={getScoreColor(result.matchScore)} strokeWidth="8" strokeDasharray="339.29" strokeDashoffset={339.29 - (339.29 * result.matchScore) / 100} style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
                                </svg>
                                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: getScoreColor(result.matchScore) }}>{result.matchScore}%</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{role ? `${role} at ${company}` : 'Job Description Match'}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                                    {result.matchScore >= 75 ? 'Strong match! You have a great chance with this resume.' : result.matchScore >= 50 ? 'Moderate match. Consider adding the missing skills to improve your chances.' : 'Weak match. You are missing core requirements for this role.'}
                                </p>
                            </div>
                        </div>

                        {/* Skills Match */}
                        <div className="card grid grid-cols-1 md-grid-cols-3 gap-6">
                            <div className="skills-wrapper">
                                <div className="skills-card">
                                    <h4 style={{ color: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <FileText size={18} /> Job Requires
                                    </h4>
                                    <div className="skills-container">
                                        {result.jobRequires
                                            .flatMap(s => (s.includes(',') ? s.split(',').map(str => str.trim()) : [s]))
                                            .map((s, i) => (
                                                <span key={i} className="skill-tag" style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--color-text-secondary)' }}>{s}</span>
                                            ))}
                                        {result.jobRequires.length === 0 && <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>None found.</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="skills-wrapper">
                                <div className="skills-card">
                                    <h4 style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <Check size={18} /> Resume Contains
                                    </h4>
                                    <div className="skills-container">
                                        {result.matchingSkills
                                            // Ensure we always have an array. If it's a single string with commas, split it.
                                            .flatMap(s => (s.includes(',') ? s.split(',').map(str => str.trim()) : [s]))
                                            // If it's still squished, fall back to a gentler regex that preserves dots/symbols if needed, but commas are usually the issue with bad AI JSON
                                            .map((s, i) => (
                                                <span key={i} className="skill-tag skill-match">{s}</span>
                                            ))}
                                        {result.matchingSkills.length === 0 && <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>None found.</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="skills-wrapper">
                                <div className="skills-card">
                                    <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <X size={18} /> Missing Skills
                                    </h4>
                                    <div className="skills-container">
                                        {result.missingSkills
                                            // Ensure we always have an array. If it's a single string with commas, split it.
                                            .flatMap(s => (s.includes(',') ? s.split(',').map(str => str.trim()) : [s]))
                                            .map((s, i) => (
                                                <span key={i} className="skill-tag skill-missing">{s}</span>
                                            ))}
                                        {result.missingSkills.length === 0 && <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>None missing!</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Suggestions */}
                        {result.suggestions?.length > 0 && (
                            <div className="card">
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--color-primary-light)' }}>
                                    <Zap size={20} /> AI Tailoring Suggestions
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {result.suggestions.map((sug, i) => (
                                        <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--color-warning)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                            <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>{sug.before}</div>
                                            <div style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{sug.after}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
};

export default JobMatch;
