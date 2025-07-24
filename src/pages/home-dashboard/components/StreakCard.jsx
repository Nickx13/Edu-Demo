import React from 'react';
import Icon from '../../../components/AppIcon';

const StreakCard = ({ currentStreak, longestStreak, achievements }) => {
  const streakMilestones = [
    { days: 7, emoji: '🔥', title: 'Week Warrior' },
    { days: 30, emoji: '💪', title: 'Month Master' },
    { days: 100, emoji: '🏆', title: 'Century Champion' },
    { days: 365, emoji: '👑', title: 'Year Legend' }
  ];

  const nextMilestone = streakMilestones.find(milestone => milestone.days > currentStreak);
  const daysToNext = nextMilestone ? nextMilestone.days - currentStreak : 0;

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Study Streak</h3>
        <div className="flex items-center space-x-1">
          <Icon name="Flame" size={20} className="text-accent" />
          <span className="text-2xl font-bold text-accent">{currentStreak}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Current streak</span>
          <span className="font-medium text-card-foreground">{currentStreak} days</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Longest streak</span>
          <span className="font-medium text-card-foreground">{longestStreak} days</span>
        </div>

        {nextMilestone && (
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-card-foreground">Next Achievement</span>
              <span className="text-lg">{nextMilestone.emoji}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{nextMilestone.title}</p>
            <p className="text-xs text-primary font-medium">
              {daysToNext} days to go!
            </p>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Recent badges:</span>
          <div className="flex space-x-1">
            {achievements.slice(0, 3).map((achievement, index) => (
              <span key={index} className="text-lg" title={achievement.title}>
                {achievement.emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;