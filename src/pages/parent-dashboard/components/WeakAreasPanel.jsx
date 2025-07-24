import React from 'react';
import Icon from '../../../components/AppIcon';

const WeakAreasPanel = () => {
  const weakAreas = [
    {
      subject: "Mathematics",
      topic: "Quadratic Equations",
      score: 65,
      trend: "down",
      recommendation: "Practice more word problems"
    },
    {
      subject: "Science",
      topic: "Chemical Reactions",
      score: 72,
      trend: "stable",
      recommendation: "Review balancing equations"
    },
    {
      subject: "English",
      topic: "Grammar Rules",
      score: 78,
      trend: "up",
      recommendation: "Focus on tenses"
    }
  ];

  const upcomingDeadlines = [
    {
      title: "Math Assignment",
      subject: "Mathematics",
      dueDate: "2025-07-22",
      priority: "high"
    },
    {
      title: "Science Project",
      subject: "Science",
      dueDate: "2025-07-25",
      priority: "medium"
    },
    {
      title: "English Essay",
      subject: "English",
      dueDate: "2025-07-28",
      priority: "low"
    }
  ];

  const studyRecommendations = [
    {
      title: "Daily Math Practice",
      description: "30 minutes of algebra problems",
      icon: "Calculator",
      priority: "high"
    },
    {
      title: "Science Experiments",
      description: "Watch interactive chemistry videos",
      icon: "Beaker",
      priority: "medium"
    },
    {
      title: "Reading Comprehension",
      description: "Read one short story daily",
      icon: "BookOpen",
      priority: "low"
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <Icon name="TrendingUp" size={14} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={14} className="text-error" />;
      default:
        return <Icon name="Minus" size={14} className="text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      default:
        return 'text-success';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">
      {/* Weak Areas */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Areas Needing Attention</h3>
          <Icon name="AlertTriangle" size={20} className="text-warning" />
        </div>
        
        <div className="space-y-4">
          {weakAreas.map((area, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-card-foreground">{area.subject}</p>
                  <p className="text-sm text-muted-foreground">{area.topic}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(area.trend)}
                  <span className="text-sm font-medium text-card-foreground">{area.score}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{area.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Upcoming Deadlines</h3>
          <Icon name="Calendar" size={20} className="text-primary" />
        </div>
        
        <div className="space-y-3">
          {upcomingDeadlines.map((deadline, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-card-foreground">{deadline.title}</p>
                <p className="text-sm text-muted-foreground">{deadline.subject}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${getPriorityColor(deadline.priority)}`}>
                  {formatDate(deadline.dueDate)}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{deadline.priority}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Study Recommendations</h3>
          <Icon name="Lightbulb" size={20} className="text-accent" />
        </div>
        
        <div className="space-y-4">
          {studyRecommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className={`p-2 rounded-lg ${
                rec.priority === 'high' ? 'bg-error/10' :
                rec.priority === 'medium' ? 'bg-warning/10' : 'bg-success/10'
              }`}>
                <Icon 
                  name={rec.icon} 
                  size={16} 
                  className={getPriorityColor(rec.priority)} 
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-card-foreground">{rec.title}</p>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeakAreasPanel;