import React, { useState, useEffect } from 'react';
import './EnhancedNotifications.css';

// Icons
import { 
  Bell, MessageSquare, Calendar, FileCheck, AlertTriangle, 
  Check, Trash2, Filter, X, Pin, Star, Archive, 
  Clock, ChevronDown, Settings, Search
} from 'lucide-react';

const EnhancedNotifications = () => {
  // Sample notification data with enhanced attributes
  const initialNotifications = [
    {
      id: 1,
      type: 'message',
      title: 'New announcement from HR',
      description: 'Company picnic scheduled for next month',
      timestamp: '5 minutes ago',
      read: false,
      priority: 'high',
      pinned: true,
      actions: ['dismiss', 'view details'],
    },
    {
      id: 2,
      type: 'event',
      title: 'Team Meeting',
      description: 'Today at 2:00 PM in Conference Room A',
      timestamp: '1 hour ago',
      read: false,
      priority: 'medium',
      pinned: false,
      actions: ['dismiss', 'remind me', 'join meeting'],
    },
    {
      id: 3,
      type: 'leave',
      title: 'Leave Request Approved',
      description: 'Your time off request (May 15-18) has been approved',
      timestamp: '3 hours ago',
      read: true,
      priority: 'medium',
      pinned: false,
      actions: ['dismiss', 'view details'],
    },
    {
      id: 4,
      type: 'document',
      title: 'New Document Uploaded',
      description: 'Q2 Project Report has been added to Documents',
      timestamp: 'Yesterday',
      read: true,
      priority: 'low',
      pinned: false,
      actions: ['dismiss', 'view document'],
    },
    {
      id: 5,
      type: 'system',
      title: 'System Maintenance',
      description: 'The system will be down for maintenance on Saturday from 2-4 AM',
      timestamp: '2 days ago',
      read: true,
      priority: 'high',
      pinned: false,
      actions: ['dismiss', 'remind me'],
    },
    {
      id: 6,
      type: 'message',
      title: 'Message from Sarah Williams',
      description: 'Can we discuss the project timeline this afternoon?',
      timestamp: 'Today',
      read: false,
      priority: 'medium',
      pinned: false,
      actions: ['dismiss', 'reply', 'mark as done'],
    },
    {
      id: 7,
      type: 'event',
      title: 'Project Deadline Reminder',
      description: 'UI Design submission due this Friday at 5:00 PM',
      timestamp: 'Yesterday',
      read: false,
      priority: 'high',
      pinned: false,
      actions: ['dismiss', 'view project'],
    }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('default'); // default, archived, starred
  const [notificationSettings, setNotificationSettings] = useState({
    showDesktopNotifications: true,
    soundEnabled: false,
    autoArchiveRead: false,
    groupBySimilarType: true
  });
  const [showSettings, setShowSettings] = useState(false);
  const [newNotificationCount, setNewNotificationCount] = useState(0);

  // Count unread notifications on load
  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.read).length;
    setNewNotificationCount(unreadCount);
  }, [notifications]);

  // Filter and search notifications
  const filteredNotifications = notifications.filter(notification => {
    // Filter by view type
    if (view === 'archived' && !notification.archived) return false;
    if (view === 'starred' && !notification.pinned) return false;
    if (view === 'default' && notification.archived) return false;
    
    // Filter by filter type
    if (filter !== 'all' && filter !== notification.type && 
        !(filter === 'unread' && !notification.read) &&
        !(filter === 'priority' && notification.priority === 'high')) {
      return false;
    }

    // Filter by search term
    if (searchTerm && 
        !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !notification.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Group notifications by date if needed
  const groupedNotifications = {};
  filteredNotifications.forEach(notification => {
    let dateGroup;
    if (notification.timestamp.includes('minute') || 
        notification.timestamp.includes('hour') || 
        notification.timestamp === 'Today') {
      dateGroup = 'Today';
    } else if (notification.timestamp === 'Yesterday') {
      dateGroup = 'Yesterday';
    } else {
      dateGroup = 'Earlier';
    }
    
    if (!groupedNotifications[dateGroup]) {
      groupedNotifications[dateGroup] = [];
    }
    groupedNotifications[dateGroup].push(notification);
  });

  // Handle marking notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    setNewNotificationCount(prevCount => Math.max(0, prevCount - 1));
  };

  // Handle marking all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setNewNotificationCount(0);
  };

  // Handle clearing all notifications
  const clearAll = () => {
    // Only clear non-pinned notifications
    setNotifications(notifications.filter(notification => notification.pinned));
    setNewNotificationCount(0);
  };

  // Toggle pin status
  const togglePin = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, pinned: !notification.pinned } : notification
    ));
  };

  // Archive a notification
  const archiveNotification = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, archived: true, read: true } : notification
    ));
    if (!notifications.find(n => n.id === id).read) {
      setNewNotificationCount(prevCount => Math.max(0, prevCount - 1));
    }
  };

  // Remove a notification
  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    if (!notifications.find(n => n.id === id).read) {
      setNewNotificationCount(prevCount => Math.max(0, prevCount - 1));
    }
  };

  // Toggle settings panel
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Update settings
  const updateSetting = (settingKey, value) => {
    setNotificationSettings({
      ...notificationSettings,
      [settingKey]: value
    });
  };

  // Get icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={18} className="notification-icon message-icon" />;
      case 'event':
        return <Calendar size={18} className="notification-icon event-icon" />;
      case 'leave':
        return <FileCheck size={18} className="notification-icon leave-icon" />;
      case 'document':
        return <FileCheck size={18} className="notification-icon document-icon" />;
      case 'system':
        return <AlertTriangle size={18} className="notification-icon system-icon" />;
      default:
        return <Bell size={18} className="notification-icon" />;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    if (priority === 'high') {
      return <span className="priority-badge high">High Priority</span>;
    } else if (priority === 'medium') {
      return <span className="priority-badge medium">Medium</span>;
    }
    return null;
  };

  // Simulate a new notification (for demo purposes)
  const addNewNotification = () => {
    const newNotification = {
      id: Date.now(),
      type: 'message',
      title: 'New Test Notification',
      description: 'This is a test notification added by clicking the button',
      timestamp: 'Just now',
      read: false,
      priority: 'medium',
      pinned: false,
      actions: ['dismiss', 'mark as read']
    };
    
    setNotifications([newNotification, ...notifications]);
    setNewNotificationCount(prevCount => prevCount + 1);
  };

  return (
    <div className="enhanced-notifications-container">
      <div className="notifications-header">
        <div className="notifications-title">
          <h2>
            <Bell size={20} />
            Notifications
            {newNotificationCount > 0 && (
              <span className="notification-count">{newNotificationCount}</span>
            )}
          </h2>
        </div>
        
        <div className="notifications-tabs">
          <button 
            className={`tab-btn ${view === 'default' ? 'active' : ''}`}
            onClick={() => setView('default')}
          >
            All
          </button>
          <button 
            className={`tab-btn ${view === 'starred' ? 'active' : ''}`}
            onClick={() => setView('starred')}
          >
            Pinned
          </button>
          <button 
            className={`tab-btn ${view === 'archived' ? 'active' : ''}`}
            onClick={() => setView('archived')}
          >
            Archived
          </button>
        </div>
        
        <div className="notifications-actions">
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search notifications..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                <X size={14} />
              </button>
            )}
          </div>
          
          <div className="filter-dropdown">
            <button className="filter-btn">
              <Filter size={16} /> {filter.charAt(0).toUpperCase() + filter.slice(1)}
              <ChevronDown size={14} />
            </button>
            <div className="filter-dropdown-content">
              <button onClick={() => setFilter('all')}>All</button>
              <button onClick={() => setFilter('unread')}>Unread</button>
              <button onClick={() => setFilter('priority')}>High Priority</button>
              <button onClick={() => setFilter('message')}>Messages</button>
              <button onClick={() => setFilter('event')}>Events</button>
              <button onClick={() => setFilter('system')}>System</button>
            </div>
          </div>
          
          <button className="action-btn mark-read" onClick={markAllAsRead}>
            <Check size={16} />
          </button>
          
          <button className="action-btn clear-all" onClick={clearAll}>
            <Trash2 size={16} />
          </button>
          
          <button className="action-btn settings" onClick={toggleSettings}>
            <Settings size={16} />
          </button>
          
          {/* For demo purposes only */}
          <button className="action-btn add-demo" onClick={addNewNotification} title="Add test notification">
            +
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="settings-panel">
          <div className="settings-header">
            <h3>Notification Settings</h3>
            <button className="close-settings" onClick={toggleSettings}>
              <X size={16} />
            </button>
          </div>
          <div className="settings-options">
            <div className="setting-option">
              <label htmlFor="desktopNotifications">
                Enable desktop notifications
              </label>
              <input
                type="checkbox"
                id="desktopNotifications"
                checked={notificationSettings.showDesktopNotifications}
                onChange={(e) => updateSetting('showDesktopNotifications', e.target.checked)}
              />
            </div>
            <div className="setting-option">
              <label htmlFor="soundEnabled">
                Enable notification sounds
              </label>
              <input
                type="checkbox"
                id="soundEnabled"
                checked={notificationSettings.soundEnabled}
                onChange={(e) => updateSetting('soundEnabled', e.target.checked)}
              />
            </div>
            <div className="setting-option">
              <label htmlFor="autoArchiveRead">
                Auto-archive after reading
              </label>
              <input
                type="checkbox"
                id="autoArchiveRead"
                checked={notificationSettings.autoArchiveRead}
                onChange={(e) => updateSetting('autoArchiveRead', e.target.checked)}
              />
            </div>
            <div className="setting-option">
              <label htmlFor="groupBySimilarType">
                Group similar notifications
              </label>
              <input
                type="checkbox"
                id="groupBySimilarType"
                checked={notificationSettings.groupBySimilarType}
                onChange={(e) => updateSetting('groupBySimilarType', e.target.checked)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Notification Groups */}
      <div className="notifications-list">
        {Object.keys(groupedNotifications).length > 0 ? (
          Object.keys(groupedNotifications).map(dateGroup => (
            <div key={dateGroup} className="notification-group">
              <div className="date-separator">
                <span>{dateGroup}</span>
              </div>
              
              {groupedNotifications[dateGroup].map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-card ${!notification.read ? 'unread' : ''} ${notification.priority}-priority ${notification.pinned ? 'pinned' : ''}`}
                >
                  <div className="notification-content">
                    <div className="notification-icon-container">
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="notification-details" onClick={() => markAsRead(notification.id)}>
                      <div className="notification-header">
                        <h3>{notification.title}</h3>
                        <div className="notification-metadata">
                          {getPriorityBadge(notification.priority)}
                          <span className="notification-time">
                            <Clock size={12} />
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="notification-description">{notification.description}</p>
                      
                      {notification.actions && notification.actions.length > 0 && (
                        <div className="notification-actions">
                          {notification.actions.map((action, index) => (
                            <button key={index} className="notification-action-btn">
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="notification-controls">
                    <button 
                      className={`control-btn pin-btn ${notification.pinned ? 'active' : ''}`}
                      onClick={() => togglePin(notification.id)}
                      title={notification.pinned ? "Unpin" : "Pin"}
                    >
                      <Pin size={16} />
                    </button>
                    
                    <button 
                      className="control-btn archive-btn"
                      onClick={() => archiveNotification(notification.id)}
                      title="Archive"
                    >
                      <Archive size={16} />
                    </button>
                    
                    <button 
                      className="control-btn delete-btn"
                      onClick={() => removeNotification(notification.id)}
                      title="Delete"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  {!notification.read && <span className="unread-indicator"></span>}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="no-notifications">
            <Bell size={32} />
            <p>No notifications to display</p>
            {filter !== 'all' && (
              <button className="reset-filter-btn" onClick={() => setFilter('all')}>
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {filteredNotifications.length > 5 && (
        <button className="view-more-btn">
          Load More
        </button>
      )}
    </div>
  );
};

export default EnhancedNotifications;