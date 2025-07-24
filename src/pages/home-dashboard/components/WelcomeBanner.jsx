import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeBanner = ({ studentName, dailyGoalProgress, currentStreak }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const progressPercentage = (dailyGoalProgress.completed / dailyGoalProgress.total) * 100;

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            {getGreeting()}, {studentName}! 👋
          </h2>
          <p className="text-white/80 text-sm">
            Ready to continue your learning journey?
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 mb-1">
            <Icon name="Flame" size={16} className="text-accent" />
            <span className="text-sm font-medium">{currentStreak} days</span>
          </div>
          <p className="text-xs text-white/70">Current streak</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Today's Goal Progress</span>
          <span className="text-sm">{dailyGoalProgress.completed}/{dailyGoalProgress.total}</span>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-xs text-white/80">
          <span>{Math.round(progressPercentage)}% completed</span>
          <span>{dailyGoalProgress.total - dailyGoalProgress.completed} tasks remaining</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;