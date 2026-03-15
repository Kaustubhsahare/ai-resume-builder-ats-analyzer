import React, { useState } from 'react';
import useResumeStore from '../store/useResumeStore';
import { calculateATSScore } from '../services/aiService';
import { Activity, AlertCircle, CheckCircle2, TrendingUp, RefreshCw, Upload, FileText, AlertTriangle, Search, Zap } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure pdfjs worker natively for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const ProgressBar = ({ label, value, colorClass }) => (
    <div style={{ marginBottom: '1.5rem' }}>
        <div className="flex justify-between items-center mb-2">
            <span style={{ fontWeight: 500 }}>{label}</span>
            <span style={{ fontWeight: 600, color: `var(--color-${colorClass})` }}>{value}<span style={{ color: 'var(--color-text-muted)', fontSize: '0.85em' }}>%</span></span>
        </div>
        <div className="progress-container">
            <div
                className={`progress-bar ${colorClass}`}
                style={{ width: `${value}%` }}
            ></div>
        </div>
    </div>
);

const ATSAnalytics = () => {
    const { resumeData } = useResumeStore();
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

    const handleAnalyze = async () => {
        setLoading(true);
        setError('');
        try {
            const payload = activeTab === 'builder' ? resumeData : uploadedText;
            if (activeTab === 'upload' && !uploadedText.trim()) {
                throw new Error("Please paste or upload resume text first.");
            }
            const data = await calculateATSScore(payload);
            setResult(data);
        } catch (err) {
            setError('Failed to calculate ATS score. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'success';
        if (score >= 60) return 'warning';
        return 'danger';
    };

    return (
        <div className="container py-10 animate-fade-in" style={{ maxWidth: '900px' }}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>ATS Resume Analysis</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Get AI-driven insights on how an Applicant Tracking System views your resume.</p>
                </div>
                <button className="btn btn-primary" onClick={handleAnalyze} disabled={loading}>
                    {loading ? <RefreshCw className="spin" size={20} style={{ animation: 'spin 1.5s linear infinite' }} /> : <Activity size={20} />}
                    {loading ? 'Analyzing...' : 'Analyze Resume'}
                </button>
            </div>

            {error && (
                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-md)', color: 'var(--color-error)', marginBottom: '2rem' }}>
                    {error}
                </div>
            )}

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

            {/* Upload Area */}
            {activeTab === 'upload' && !result && (
                <div className="card animate-fade-in mb-8" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="flex justify-between items-center mb-4">
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
                        rows={10}
                        placeholder="Paste the raw text of your resume here to analyze it..."
                        value={uploadedText}
                        onChange={(e) => setUploadedText(e.target.value)}
                        style={{ fontFamily: 'monospace', fontSize: '0.875rem', resize: 'vertical' }}
                    ></textarea>
                </div>
            )}

            {/* Placeholder / Empty State */}
            {!loading && !result && !error && activeTab === 'builder' && (
                <div className="card text-center py-10 animate-fade-in" style={{ borderStyle: 'dashed', background: 'transparent' }}>
                    <Activity size={48} color="var(--color-primary-light)" style={{ margin: '0 auto 1.5rem', opacity: 0.8 }} />
                    <h3>Ready for Analysis</h3>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                        Ensure you've filled out your resume in the Builder Wizard before scanning. Click "Analyze Resume" to calculate your ATS compatibility.
                    </p>
                    <button className="btn btn-primary" onClick={handleAnalyze}>Start Scan</button>
                </div>
            )}

            {/* Results View */}
            {result && (
                <div className="animate-fade-in grid grid-cols-3 gap-8">
                    {/* Main Score Card */}
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem 1.5rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))' }}>
                        <h2 style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>Overall ATS Score</h2>
                        <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '180px', height: '180px', borderRadius: '50%', border: `8px solid var(--color-${getScoreColor(result.overallScore)})`, marginBottom: '1.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                            <span style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>{result.overallScore}</span>
                            <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-muted)', marginLeft: '0.25rem', marginTop: '1rem' }}>/ 100</span>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', maxWidth: '100%', margin: '0' }}>
                            {result.overallScore >= 80 ? 'Excellent! Your resume is highly optimized for ATS.' : result.overallScore >= 60 ? 'Good start. There are a few areas you can improve.' : 'Your resume needs significant improvements to pass screening.'}
                        </p>
                    </div>

                    <div className="card" style={{ gridColumn: 'span 2' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={24} color="var(--color-primary-light)" /> Why This Score?
                        </h3>

                        <ProgressBar label="Formatting & Structure" value={result.breakdown.formatting} colorClass={getScoreColor(result.breakdown.formatting)} />
                        <ProgressBar label="Skills & Competencies" value={result.breakdown.skills} colorClass={getScoreColor(result.breakdown.skills)} />
                        <ProgressBar label="Experience & Action Verbs" value={result.breakdown.experience} colorClass={getScoreColor(result.breakdown.experience)} />
                        <ProgressBar label="Keyword Density" value={result.breakdown.keywords} colorClass={getScoreColor(result.breakdown.keywords)} />
                    </div>

                    {/* Matched Keywords Card */}
                    {result.matchedKeywords && result.matchedKeywords.length > 0 && (
                        <div className="card" style={{ gridColumn: 'span 3', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-light)' }}>
                                <Search size={22} /> Matched ATS Keywords
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {result.matchedKeywords.map((kw, i) => (
                                    <span key={i} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', padding: '0.35rem 0.75rem', borderRadius: '4px', fontSize: '0.875rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Formatting Warnings */}
                    {result.formattingWarnings && result.formattingWarnings.length > 0 && (
                        <div className="card" style={{ gridColumn: 'span 3', background: 'rgba(2ef, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-error)' }}>
                                <AlertTriangle size={22} /> Formatting Warnings
                            </h3>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#fca5a5', lineHeight: '1.6' }}>
                                {result.formattingWarnings.map((warning, i) => (
                                    <li key={i} style={{ marginBottom: '0.5rem' }}>{warning}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Enhanced Feedback Card */}
                    <div className="card text-center" style={{ gridColumn: 'span 3', padding: '2rem 3rem', background: 'linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))', border: '1px solid rgba(245, 158, 11, 0.2)', boxShadow: '0 10px 30px -10px rgba(245, 158, 11, 0.2)' }}>
                        <h3 className="text-gradient" style={{ fontSize: '1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                            <AlertCircle size={28} color="var(--color-warning)" /> Actions to Improve Your Score
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                            {result.feedback.map((item, index) => (
                                <div key={index} style={{
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    borderLeft: '4px solid var(--color-warning)',
                                    padding: '1.5rem',
                                    borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-warning)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        <CheckCircle2 size={18} /> Tip #{index + 1}: {item.advice || item}
                                    </div>

                                    {/* Handle structured suggestions with before/after */}
                                    {item.before && item.after && (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                                            <div style={{ background: 'rgba(2ef, 68, 68, 0.1)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                                <div style={{ fontSize: '0.75rem', color: '#fca5a5', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>Instead of writing:</div>
                                                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'line-through' }}>"{item.before}"</div>
                                            </div>
                                            <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                                                <div style={{ fontSize: '0.75rem', color: '#86efac', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>Write:</div>
                                                <div style={{ color: 'var(--color-text-primary)', fontSize: '0.9rem', fontWeight: 500 }}>"{item.after}"</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ATSAnalytics;
