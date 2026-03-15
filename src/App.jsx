import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* Components and Pages */
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BuilderWizard from './pages/BuilderWizard';
import ATSAnalytics from './pages/ATSAnalytics';
import JobMatch from './pages/JobMatch';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/builder" element={<BuilderWizard />} />
                    <Route path="/bats-score" element={<ATSAnalytics />} />
                    <Route path="/ats-score" element={<ATSAnalytics />} />
                    <Route path="/job-match" element={<JobMatch />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
