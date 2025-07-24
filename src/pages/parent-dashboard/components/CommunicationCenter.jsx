import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CommunicationCenter = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');

  const messages = [
    {
      id: 1,
      sender: "Ms. Priya Sharma",
      role: "Math Teacher",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      message: "Aarav has shown excellent improvement in algebra. Keep up the good work!",
      timestamp: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      sender: "AI Tutor",
      role: "EduMitra AI",
      avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop&crop=face",
      message: "Weekly progress report is ready. Aarav completed 85% of assigned tasks.",
      timestamp: "1 day ago",
      unread: false
    },
    {
      id: 3,
      sender: "Dr. Rajesh Kumar",
      role: "Science Teacher",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      message: "Please ensure Aarav completes the chemistry lab report by Friday.",
      timestamp: "2 days ago",
      unread: false
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "achievement",
      title: "New Achievement Unlocked!",
      description: "Aarav earned the \'Math Wizard\' badge",
      icon: "Award",
      color: "text-warning",
      timestamp: "30 minutes ago"
    },
    {
      id: 2,
      type: "alert",
      title: "Study Session Missed",
      description: "Evening math practice was skipped",
      icon: "AlertTriangle",
      color: "text-error",
      timestamp: "2 hours ago"
    },
    {
      id: 3,
      type: "reminder",
      title: "Assignment Due Tomorrow",
      description: "Science project submission deadline",
      icon: "Calendar",
      color: "text-primary",
      timestamp: "4 hours ago"
    },
    {
      id: 4,
      type: "progress",
      title: "Weekly Goal Achieved",
      description: "Study time target of 20 hours completed",
      icon: "Target",
      color: "text-success",
      timestamp: "1 day ago"
    }
  ];

  const teacherContacts = [
    {
      name: "Ms. Priya Sharma",
      subject: "Mathematics",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "online"
    },
    {
      name: "Dr. Rajesh Kumar",
      subject: "Science",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "offline"
    },
    {
      name: "Mrs. Anita Gupta",
      subject: "English",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "online"
    }
  ];

  const tabs = [
    { id: 'messages', label: 'Messages', icon: 'MessageCircle' },
    { id: 'notifications', label: 'Alerts', icon: 'Bell' },
    { id: 'teachers', label: 'Teachers', icon: 'Users' }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle message sending logic
      setNewMessage('');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement':
        return 'Award';
      case 'alert':
        return 'AlertTriangle';
      case 'reminder':
        return 'Calendar';
      case 'progress':
        return 'Target';
      default:
        return 'Bell';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Communication Center</h3>
        <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150">
          <Icon name="Plus" size={16} />
          <span className="hidden sm:inline">New Message</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors duration-150 flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-card text-card-foreground shadow-sm'
                : 'text-muted-foreground hover:text-card-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`p-4 rounded-lg border transition-colors duration-150 hover:bg-muted/50 ${
                message.unread ? 'bg-primary/5 border-primary/20' : 'bg-muted border-border'
              }`}>
                <div className="flex items-start space-x-3">
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <p className="font-medium text-card-foreground">{message.sender}</p>
                        <p className="text-sm text-muted-foreground">{message.role}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {message.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-card-foreground">{message.message}</p>
                    <div className="flex items-center space-x-2 mt-3">
                      <button className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors duration-150">
                        <Icon name="Reply" size={14} />
                        <span className="text-xs">Reply</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1 bg-muted text-muted-foreground rounded-md hover:bg-border transition-colors duration-150">
                        <Icon name="Archive" size={14} />
                        <span className="text-xs">Archive</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                <div className={`p-2 rounded-lg ${
                  notification.type === 'achievement' ? 'bg-warning/10' :
                  notification.type === 'alert' ? 'bg-error/10' :
                  notification.type === 'reminder' ? 'bg-primary/10' : 'bg-success/10'
                }`}>
                  <Icon 
                    name={getNotificationIcon(notification.type)} 
                    size={16} 
                    className={notification.color} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-card-foreground">{notification.title}</p>
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
                <button className="p-1 hover:bg-border rounded transition-colors duration-150">
                  <Icon name="X" size={14} className="text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'teachers' && (
          <div className="space-y-4">
            {teacherContacts.map((teacher, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                      teacher.status === 'online' ? 'bg-success' : 'bg-muted-foreground'
                    }`}></div>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{teacher.name}</p>
                    <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                    <p className="text-xs text-muted-foreground capitalize">{teacher.status}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-150">
                    <Icon name="MessageCircle" size={16} />
                  </button>
                  <button className="p-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors duration-150">
                    <Icon name="Phone" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Message Input */}
      {activeTab === 'messages' && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type a quick message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <Icon name="Send" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationCenter;