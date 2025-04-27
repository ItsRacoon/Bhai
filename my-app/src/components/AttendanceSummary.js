import React, { useState, useEffect } from 'react';

const AttendanceSummary = ({ userId }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        // In a real application, make an API call here
        // This is mock data
        const mockData = [
          { date: '2025-04-21', checkin: '09:05', checkout: '17:30', hours: 8.42 },
          { date: '2025-04-22', checkin: '08:58', checkout: '17:45', hours: 8.78 },
          { date: '2025-04-23', checkin: '09:10', checkout: '18:00', hours: 8.83 },
          { date: '2025-04-24', checkin: '08:50', checkout: '17:20', hours: 8.50 },
          { date: '2025-04-25', checkin: '09:00', checkout: '17:30', hours: 8.50 },
          { date: '2025-04-26', checkin: '09:15', checkout: '', hours: 0 },
        ];
        setAttendanceData(mockData);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [userId, timeframe]);

  if (loading) {
    return <div className="loading-spinner-small"></div>;
  }

  const totalHours = attendanceData.reduce((sum, day) => sum + day.hours, 0);
  const avgHours = attendanceData.length ? (totalHours / attendanceData.length).toFixed(2) : 0;

  return (
    <section className="attendance-summary">
      <div className="section-header">
        <h2>Attendance Summary</h2>
        <div className="timeframe-selector">
          <button 
            className={timeframe === 'week' ? 'active' : ''} 
            onClick={() => setTimeframe('week')}
          >
            Week
          </button>
          <button 
            className={timeframe === 'month' ? 'active' : ''} 
            onClick={() => setTimeframe('month')}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className="attendance-overview">
        <div className="attendance-stats">
          <div className="attendance-stat-item">
            <span className="stat-label">Total Hours</span>
            <span className="stat-value">{totalHours.toFixed(2)}</span>
          </div>
          <div className="attendance-stat-item">
            <span className="stat-label">Avg. Hours/Day</span>
            <span className="stat-value">{avgHours}</span>
          </div>
          <div className="attendance-stat-item">
            <span className="stat-label">On Time Rate</span>
            <span className="stat-value">92%</span>
          </div>
        </div>
      </div>
      
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((day, index) => (
              <tr key={index}>
                <td>{new Date(day.date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                <td>{day.checkin}</td>
                <td>{day.checkout || '-'}</td>
                <td>{day.hours.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(day)}`}>
                    {getStatus(day)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="view-all-link">
        <a href="/attendance">View Complete Attendance History</a>
      </div>
    </section>
  );
};

// Helper functions
function getStatus(day) {
  const today = new Date().toISOString().split('T')[0];
  
  if (day.date === today && !day.checkout) return 'Active';
  if (!day.checkout) return 'Incomplete';
  if (day.hours >= 8) return 'Complete';
  if (day.hours < 8) return 'Partial';
  return 'Unknown';
}

function getStatusClass(day) {
  const status = getStatus(day);
  switch (status) {
    case 'Active': return 'status-active';
    case 'Complete': return 'status-complete';
    case 'Partial': return 'status-partial';
    case 'Incomplete': return 'status-incomplete';
    default: return '';
  }
}

export default AttendanceSummary;