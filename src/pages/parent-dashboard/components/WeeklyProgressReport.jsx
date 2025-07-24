import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const WeeklyProgressReport = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const weeklyData = {
    current: {
      week: "July 14 - July 20, 2025",
      achievements: [
        {
          title: "Math Mastery Streak",
          description: "Completed 7 consecutive days of algebra practice",
          icon: "Award",
          type: "achievement"
        },
        {
          title: "Quiz Champion",
          description: "Scored 95% average in Science quizzes",
          icon: "Trophy",
          type: "achievement"
        },
        {
          title: "Reading Goal Met",
          description: "Read 3 English stories this week",
          icon: "BookOpen",
          type: "goal"
        }
      ],
      concerns: [
        {
          title: "Hindi Grammar",
          description: "Struggling with verb conjugations",
          severity: "medium",
          suggestion: "Schedule extra practice sessions"
        },
        {
          title: "Study Schedule",
          description: "Missed 2 planned study sessions",
          severity: "low",
          suggestion: "Set reminder notifications"
        }
      ],
      metrics: {
        studyHours: 18.5,
        targetHours: 20,
        quizAverage: 87,
        assignmentsCompleted: 8,
        totalAssignments: 10
      }
    }
  };

  const currentData = weeklyData[selectedWeek];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return 'bg-success';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-error';
  };

  const interventions = [
    {
      title: "Extra Hindi Practice",
      description: "Schedule 30 minutes daily for grammar exercises",
      priority: "high",
      estimatedTime: "2 weeks"
    },
    {
      title: "Study Routine Adjustment",
      description: "Move evening study session to after dinner",
      priority: "medium",
      estimatedTime: "1 week"
    },
    {
      title: "Reward System",
      description: "Implement weekly achievement rewards",
      priority: "low",
      estimatedTime: "Ongoing"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Week Selector */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Weekly Progress Report</h3>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{currentData.week}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-card-foreground">
              {currentData.metrics.studyHours}h
            </p>
            <p className="text-sm text-muted-foreground">Study Hours</p>
            <div className="w-full bg-border rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(currentData.metrics.studyHours, currentData.metrics.targetHours)}`}
                style={{ width: `${Math.min((currentData.metrics.studyHours / currentData.metrics.targetHours) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-card-foreground">
              {currentData.metrics.quizAverage}%
            </p>
            <p className="text-sm text-muted-foreground">Quiz Average</p>
            <div className="flex items-center justify-center mt-2">
              <Icon name="TrendingUp" size={14} className="text-success" />
              <span className="text-xs text-success ml-1">+5%</span>
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-card-foreground">
              {currentData.metrics.assignmentsCompleted}/{currentData.metrics.totalAssignments}
            </p>
            <p className="text-sm text-muted-foreground">Assignments</p>
            <div className="w-full bg-border rounded-full h-2 mt-2">
              <div 
                className="h-2 rounded-full bg-primary"
                style={{ width: `${(currentData.metrics.assignmentsCompleted / currentData.metrics.totalAssignments) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-card-foreground">
              {currentData.achievements.length}
            </p>
            <p className="text-sm text-muted-foreground">Achievements</p>
            <div className="flex items-center justify-center mt-2">
              <Icon name="Award" size={14} className="text-warning" />
              <span className="text-xs text-warning ml-1">This week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Star" size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-card-foreground">Achievements & Milestones</h3>
        </div>
        
        <div className="space-y-3">
          {currentData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name={achievement.icon} size={20} className="text-success" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-card-foreground">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                  {achievement.type === 'achievement' ? 'Achievement' : 'Goal Completed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Areas of Concern */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-card-foreground">Areas Needing Attention</h3>
        </div>
        
        <div className="space-y-3">
          {currentData.concerns.map((concern, index) => (
            <div key={index} className={`p-4 border rounded-lg ${getSeverityColor(concern.severity)}`}>
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium">{concern.title}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-current/10 capitalize">
                  {concern.severity}
                </span>
              </div>
              <p className="text-sm mb-2">{concern.description}</p>
              <p className="text-xs font-medium">💡 {concern.suggestion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Interventions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-card-foreground">Suggested Interventions</h3>
        </div>
        
        <div className="space-y-4">
          {interventions.map((intervention, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
              <div className={`w-3 h-3 rounded-full mt-2 ${
                intervention.priority === 'high' ? 'bg-error' :
                intervention.priority === 'medium' ? 'bg-warning' : 'bg-success'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-card-foreground">{intervention.title}</p>
                  <span className="text-xs text-muted-foreground">{intervention.estimatedTime}</span>
                </div>
                <p className="text-sm text-muted-foreground">{intervention.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Export Report</h3>
            <p className="text-sm text-muted-foreground">Share progress with teachers or save for records</p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors duration-150">
              <Icon name="Download" size={16} />
              <span>PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150">
              <Icon name="Share" size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgressReport;