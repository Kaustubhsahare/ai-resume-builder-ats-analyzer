import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, BarChart2, Briefcase, Zap } from 'lucide-react';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="container py-10" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
                    <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
                        Build Your Perfect Resume with AI
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
                        Create ATS-friendly resumes in minutes. Check your score against real job descriptions and optimize your chances of landing your dream job.
                    </p>

                    <div className="flex justify-center gap-6 mb-10 cursor-pointer">
                        <Link to="/builder" className="btn btn-gradient" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                            <FileText size={24} /> Create Resume
                        </Link>
                        <Link to="/ats-score" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                            <BarChart2 size={24} /> Check ATS Score
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container py-10 my-10" style={{ paddingBottom: '6rem' }}>
                <h2 className="text-center text-gradient" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Everything you need to succeed</h2>

                <div className="grid grid-cols-3 gap-8">
                    <div className="card text-center flex flex-col items-center">
                        <div style={{ background: 'var(--color-primary-light)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'white' }}>
                            <FileText size={32} />
                        </div>
                        <h3>Smart Resume Builder</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Step-by-step wizard to craft professional, ATS-optimized resumes efficiently.</p>
                    </div>

                    <div className="card text-center flex flex-col items-center">
                        <div style={{ background: 'var(--color-secondary)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'white' }}>
                            <BarChart2 size={32} />
                        </div>
                        <h3>ATS Score Analyzer</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Get instant feedback on your resume's formatting, keywords, and overall ATS compatibility.</p>
                    </div>

                    <div className="card text-center flex flex-col items-center">
                        <div style={{ background: 'var(--color-success)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'white' }}>
                            <Briefcase size={32} />
                        </div>
                        <h3>Job Match Intelligence</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Compare your resume against specific job descriptions to find matching and missing skills.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container py-10 text-center glass mb-10" style={{ borderRadius: 'var(--radius-2xl)' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to get hired faster?</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Join thousands of job seekers who improved their chances with our AI tool.</p>
                <Link to="/builder" className="btn btn-primary">
                    <Zap size={20} /> Start Building Now
                </Link>
            </section>
        </div>
    );
};

export default Home;
