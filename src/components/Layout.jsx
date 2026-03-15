import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target } from 'lucide-react';

const Layout = ({ children }) => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? { color: 'var(--color-primary)' } : { color: 'var(--color-text-secondary)' };
    };

    return (
        <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <nav className="glass" style={{ padding: '1rem 0', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="container flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                    <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
                        <Target size={28} color="var(--color-primary-light)" />
                        <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                            AI Resume Pro
                        </span>
                    </Link>

                    <div className="flex gap-6 items-center">
                        <Link to="/" style={{ ...isActive('/'), fontWeight: 500 }}>Home</Link>
                        <Link to="/builder" style={{ ...isActive('/builder'), fontWeight: 500 }}>Menu Builder</Link>
                        <Link to="/ats-score" style={{ ...isActive('/ats-score'), fontWeight: 500 }}>ATS Score</Link>
                        <Link to="/job-match" style={{ ...isActive('/job-match'), fontWeight: 500 }}>Job Match</Link>
                    </div>

                    <div className="flex gap-4">
                        <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
                        <Link to="/builder" className="btn btn-primary">Create Resume</Link>
                    </div>
                </div>
            </nav>

            <main style={{ flex: 1 }}>
                {children}
            </main>

            <footer className="container py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Target size={20} color="var(--color-primary-light)" />
                        <span style={{ fontWeight: 600 }}>AI Resume Pro</span>
                    </div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                        &copy; {new Date().getFullYear()} AI Resume Builder. Premium ATS Tools.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
