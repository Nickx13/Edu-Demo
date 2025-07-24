import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceChart = () => {
  const [chartType, setChartType] = useState('progress');
  const [timeRange, setTimeRange] = useState('week');

  const progressData = [
    { name: 'Mon', Math: 85, Science: 78, English: 92, Hindi: 88 },
    { name: 'Tue', Math: 88, Science: 82, English: 89, Hindi: 85 },
    { name: 'Wed', Math: 92, Science: 85, English: 94, Hindi: 90 },
    { name: 'Thu', Math: 89, Science: 88, English: 91, Hindi: 87 },
    { name: 'Fri', Math: 94, Science: 91, English: 96, Hindi: 92 },
    { name: 'Sat', Math: 91, Science: 89, English: 93, Hindi: 89 },
    { name: 'Sun', Math: 96, Science: 94, English: 98, Hindi: 95 }
  ];

  const quizScoreData = [
    { subject: 'Math', score: 94, total: 100 },
    { subject: 'Science', score: 89, total: 100 },
    { subject: 'English', score: 96, total: 100 },
    { subject: 'Hindi', score: 92, total: 100 },
    { subject: 'Social Studies', score: 87, total: 100 }
  ];

  const studyTimeData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 2.8 },
    { day: 'Thu', hours: 3.5 },
    { day: 'Fri', hours: 2.2 },
    { day: 'Sat', hours: 4.1 },
    { day: 'Sun', hours: 3.8 }
  ];

  const chartOptions = [
    { id: 'progress', label: 'Subject Progress', icon: 'TrendingUp' },
    { id: 'quiz', label: 'Quiz Scores', icon: 'BarChart3' },
    { id: 'time', label: 'Study Time', icon: 'Clock' }
  ];

  const timeRanges = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' }
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'progress':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="Math" stroke="#4F46E5" strokeWidth={2} />
              <Line type="monotone" dataKey="Science" stroke="#059669" strokeWidth={2} />
              <Line type="monotone" dataKey="English" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="Hindi" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'quiz':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quizScoreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="subject" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="score" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'time':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studyTimeData}>
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
              <Bar dataKey="hours" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <h3 className="text-lg font-semibold text-card-foreground">Performance Analytics</h3>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex bg-muted rounded-lg p-1">
            {chartOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setChartType(option.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                  chartType === option.id
                    ? 'bg-card text-card-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-card-foreground'
                }`}
              >
                <Icon name={option.icon} size={14} />
                <span className="hidden sm:inline">{option.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex bg-muted rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                  timeRange === range.id
                    ? 'bg-card text-card-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-card-foreground'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        {renderChart()}
      </div>

      {chartType === 'progress' && (
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Mathematics</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-muted-foreground">Science</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">English</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Hindi</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceChart;