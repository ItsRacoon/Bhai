import React from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';

const AttendanceSummary = ({ userLeaves = [] }) => {
  // Format date to display in a readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate the number of days between two dates
  const calculateDays = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end days
    return diffDays;
  };

  // Get status color based on leave status
  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'var(--success)';
      case 'REJECTED':
        return 'var(--danger)';
      default:
        return 'var(--warning)';
    }
  };

  return (
    <div>
      <section className="welcome-section" style={{ marginBottom: '1rem', padding: '1rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'none', background: 'transparent' }}>
        <div className="welcome-text">
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: 700, color: 'black' }}>Attendance Overview</h1>
          <p style={{ fontSize: '0.9rem' }}>Monitor your attendance and leave history</p>
        </div>
      </section>

      {/* Leave Statistics */}
      <div style={{ 
        marginBottom: '1.5rem', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '1rem' 
      }}>
        <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            <FiCalendar size={18} />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Casual Leave</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '0.25rem' }}>12 days</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Balance: 8 days</div>
        </div>
        
        <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            <FiCalendar size={18} />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Sick Leave</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '0.25rem' }}>7 days</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Balance: 5 days</div>
        </div>
        
        <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            <FiClock size={18} />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Earned Leave</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '0.25rem' }}>15 days</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Balance: 15 days</div>
        </div>
      </div>

      {/* Leave Applications History */}
      <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Leave Applications</h2>
        
        {userLeaves.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {userLeaves.map((leave) => (
              <div key={leave.id} style={{ 
                border: '1px solid var(--bg-lighter)',
                borderRadius: 'var(--border-radius-sm)',
                padding: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 500 }}>{leave.leaveType} Leave</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {formatDate(leave.fromDate)} - {formatDate(leave.toDate)}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                    {calculateDays(leave.fromDate, leave.toDate)} day(s)
                  </div>
                  {leave.reason && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      <strong>Reason:</strong> {leave.reason}
                    </div>
                  )}
                </div>
                <div style={{ 
                  padding: '0.3rem 0.75rem',
                  background: 'var(--bg-light)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: getStatusColor(leave.status)
                }}>
                  {leave.status}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
            No leave applications found
          </div>
        )}
      </div>

      {/* Attendance Statistics */}
      <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>This Month's Attendance</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--primary)' }}>21</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Present Days</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--warning)' }}>2</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Absent Days</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--success)' }}>91%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Attendance Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;