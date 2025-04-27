import React, { useState } from 'react';
import './Dashboard.css';
import AttendanceSummary from './AttendanceSummary';

const Attendance = () => {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    status: '',
    remarks: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend
  };

  const [leaveForm, setLeaveForm] = useState({
    from: '',
    to: '',
    type: '',
    reason: ''
  });
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  const handleLeaveChange = (e) => {
    setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    setLeaveSubmitted(true);
    // Here you would send the leave form data to your backend
  };

  return (
    <div className="main-content" style={{ maxWidth: 1100, margin: '2rem auto' }}>
      <div style={{ display: 'flex', gap: '0', background: 'white', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', minHeight: 400 }}>
        {/* Left: Attendance Summary */}
        <div style={{ flex: 1, padding: '2rem 1.5rem' }}>
          <AttendanceSummary />
        </div>
        {/* Divider */}
        <div style={{ width: 1, background: 'var(--bg-lighter)', minHeight: '100%', alignSelf: 'stretch' }} />
        {/* Right: Leave Application */}
        <div style={{ flex: 1, padding: '2rem 1.5rem' }}>
          <section className="welcome-section" style={{ marginBottom: '2rem', padding: '2rem 1.5rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'none', background: 'transparent' }}>
            <div className="welcome-text">
              <h1>Leave Application</h1>
              <p>Apply for your leave here.</p>
            </div>
          </section>
          <form className="attendance-summary" onSubmit={handleLeaveSubmit} style={{ boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="from" style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontWeight: 500 }}>From</label>
              <input
                type="date"
                id="from"
                name="from"
                className="search-bar"
                value={leaveForm.from}
                onChange={handleLeaveChange}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="to" style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontWeight: 500 }}>To</label>
              <input
                type="date"
                id="to"
                name="to"
                className="search-bar"
                value={leaveForm.to}
                onChange={handleLeaveChange}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="type" style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontWeight: 500 }}>Leave Type</label>
              <select
                id="type"
                name="type"
                className="search-bar"
                value={leaveForm.type}
                onChange={handleLeaveChange}
                required
                style={{ width: '100%' }}
              >
                <option value="">Select type</option>
                <option value="Casual">Casual</option>
                <option value="Sick">Sick</option>
                <option value="Earned">Earned</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="reason" style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontWeight: 500 }}>Reason</label>
              <textarea
                id="reason"
                name="reason"
                className="notes-area"
                value={leaveForm.reason}
                onChange={handleLeaveChange}
                placeholder="Reason for leave..."
                style={{ width: '100%' }}
              />
            </div>
            <button type="submit" className="save-note-btn" style={{ width: '100%' }}>
              {leaveSubmitted ? 'Leave Applied!' : 'Apply for Leave'}
            </button>
            {leaveSubmitted && (
              <div style={{ color: 'var(--success)', marginTop: 16, textAlign: 'center', fontWeight: 500 }}>
                Leave application submitted!
              </div>
            )}
          </form>
        </div>
      </div>
      {/* Responsive: Stack columns on small screens */}
      <style>{`
        @media (max-width: 900px) {
          .main-content > div { flex-direction: column !important; }
          .main-content > div > div[style*='width: 1px'] { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Attendance; 