import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const ScreenTimeMonitor = () => {
  const [viewType, setViewType] = useState('today');

  const todayData = [
    { name: 'Study Apps', value: 120, color: '#4F46E5' },
    { name: 'Educational Videos', value: 45, color: '#059669' },
    { name: 'Quiz Games', value: 30, color: '#F59E0B' },
    { name: 'Other', value: 15, color: '#6B7280' }
  ];

  const weeklyData = [
    { day: 'Mon', study: 2.5, entertainment: 1.2, total: 3.7 },
    { day: 'Tue', study: 3.2, entertainment: 0.8, total: 4.0 },
    { day: 'Wed', study: 2.8, entertainment: 1.5, total: 4.3 },
    { day: 'Thu', study: 3.5, entertainment: 1.0, total: 4.5 },
    { day: 'Fri', study: 2.2, entertainment: 2.1, total: 4.3 },
    { day: 'Sat', study: 4.1, entertainment: 2.8, total: 6.9 },
    { day: 'Sun', study: 3.8, entertainment: 2.2, total: 6.0 }
  ];

  const appUsage = [
    {
      name: "EduMitra AI",
      icon: "GraduationCap",
      time: "2h 15m",
      category: "Educational",
      trend: "up"
    },
    {
      name: "Khan Academy",
      icon: "BookOpen",
      time: "45m",
      category: "Educational",
      trend: "stable"
    },
    {
      name: "YouTube",
      icon: "Play",
      time: "30m",
      category: "Entertainment",
      trend: "down"
    },
    {
      name: "Duolingo",
      icon: "Languages",
      time: "20m",
      category: "Educational",
      trend: "up"
    }
  ];

  const limits = {
    daily: 4,
    educational: 3,
    entertainment: 1
  };

  const totalToday = todayData.reduce((sum, item) => sum + item.value, 0);
  const totalHours = Math.floor(totalToday / 60);
  const totalMinutes = totalToday % 60;

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <Icon name="TrendingUp" size={12} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={12} className="text-error" />;
      default:
        return <Icon name="Minus" size={12} className="text-muted-foreground" />;
    }
  };

  const getUsageStatus = (current, limit) => {
    const percentage = (current / limit) * 100;
    if (percentage >= 90) return { color: 'text-error', bg: 'bg-error/10' };
    if (percentage >= 70) return { color: 'text-warning', bg: 'bg-warning/10' };
    return { color: 'text-success', bg: 'bg-success/10' };
  };

  const currentUsage = totalToday / 60;
  const usageStatus = getUsageStatus(currentUsage, limits.daily);

  return (
    <div className="space-y-6">
      {/* Screen Time Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Screen Time Monitor</h3>
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewType('today')}
              className={`px-3 py-1 rounded-md text-sm transition-colors duration-150 ${
                viewType === 'today' ?'bg-card text-card-foreground shadow-sm' :'text-muted-foreground hover:text-card-foreground'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setViewType('week')}
              className={`px-3 py-1 rounded-md text-sm transition-colors duration-150 ${
                viewType === 'week' ?'bg-card text-card-foreground shadow-sm' :'text-muted-foreground hover:text-card-foreground'
              }`}
            >
              Week
            </button>
          </div>
        </div>

        {viewType === 'today' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={todayData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {todayData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} min`, 'Time']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${usageStatus.bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-card-foreground">Total Screen Time</span>
                  <Icon name="Clock" size={16} className={usageStatus.color} />
                </div>
                <p className="text-2xl font-bold text-card-foreground">
                  {totalHours}h {totalMinutes}m
                </p>
                <p className="text-sm text-muted-foreground">
                  Limit: {limits.daily}h daily
                </p>
              </div>
              
              <div className="space-y-2">
                {todayData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-card-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-card-foreground">
                      {Math.floor(item.value / 60)}h {item.value % 60}m
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="study" stackId="a" fill="#4F46E5" />
                <Bar dataKey="entertainment" stackId="a" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* App Usage Details */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">App Usage</h3>
          <Icon name="Smartphone" size={20} className="text-primary" />
        </div>
        
        <div className="space-y-3">
          {appUsage.map((app, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={app.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{app.name}</p>
                  <p className="text-sm text-muted-foreground">{app.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(app.trend)}
                <span className="text-sm font-medium text-card-foreground">{app.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Healthy Usage Tips */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Heart" size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-card-foreground">Healthy Usage Tips</h3>
        </div>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <p>Take a 5-minute break every 30 minutes of screen time</p>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <p>Maintain 60cm distance from the screen</p>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <p>Use good lighting to reduce eye strain</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenTimeMonitor;