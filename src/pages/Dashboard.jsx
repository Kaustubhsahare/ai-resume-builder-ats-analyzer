import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="container py-10 animate-fade-in">
            <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>User Dashboard</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Welcome back! Manage your resumes and check your recent ATS scores here.</p>

            <div className="grid grid-cols-2 gap-8">
                <div className="card">
                    <h3>Your Resumes</h3>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>You haven't saved any resumes yet.</p>
                    <Link to="/builder" className="btn btn-primary">Create New Resume</Link>
                </div>

                <div className="card">
                    <h3>Recent Match Reports</h3>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Analyze your resume against a job description.</p>
                    <Link to="/job-match" className="btn btn-secondary">Start Analysis</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
