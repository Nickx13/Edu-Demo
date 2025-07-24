import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceSummary = ({ performanceData, weeklyProgress }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Quarter' }
  ];

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': '#3B82F6',
      'Physics': '#8B5CF6',
      'Chemistry': '#10B981',
      'Biology': '#EF4444',
      'English': '#F59E0B',
      'Hindi': '#F97316',
      'Social Science': '#6366F1'
    };
    return colors[subject] || '#6B7280';
  };

  const getPerformanceIcon = (score) => {
    if (score >= 90) return { icon: 'TrendingUp', color: 'text-success' };
    if (score >= 70) return { icon: 'Minus', color: 'text-warning' };
    return { icon: 'TrendingDown', color: 'text-error' };
  };

  const currentData = performanceData[selectedPeriod];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Performance Summary</h3>
        <div className="flex bg-muted rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${
                selectedPeriod === period.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-card-foreground'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">
            {currentData.averageScore}%
          </div>
          <p className="text-xs text-muted-foreground">Average Score</p>
        </div>
        
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-secondary mb-1">
            {currentData.studyHours}h
          </div>
          <p className="text-xs text-muted-foreground">Study Time</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <h4 className="text-sm font-medium text-card-foreground">Subject Performance</h4>
        {currentData.subjects.map((subject) => {
          const performance = getPerformanceIcon(subject.score);
          return (
            <div key={subject.name} className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: getSubjectColor(subject.name) }}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-card-foreground truncate">
                    {subject.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon name={performance.icon} size={12} className={performance.color} />
                    <span className="text-sm font-medium text-card-foreground">
                      {subject.score}%
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${subject.score}%`,
                      backgroundColor: getSubjectColor(subject.name)
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3 mb-4">
        <h4 className="text-sm font-medium text-card-foreground">Weekly Progress</h4>
        <div className="flex items-end justify-between h-16 space-x-1">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-primary/20 rounded-t transition-all duration-300 hover:bg-primary/30"
                style={{ height: `${(day.hours / 8) * 100}%` }}
                title={`${day.day}: ${day.hours}h`}
              />
              <span className="text-xs text-muted-foreground mt-1">
                {day.day.charAt(0)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0h</span>
          <span>8h</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          iconName="BarChart3" 
          iconPosition="left"
          onClick={() => window.location.href = '/parent-dashboard'}
        >
          Detailed Analytics
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          iconName="Download" 
          iconPosition="left"
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default PerformanceSummary;