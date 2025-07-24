import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingDeadlines = ({ deadlines }) => {
  const formatDate = (date) => {
    const now = new Date();
    const deadline = new Date(date);
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    return deadline.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getPriorityColor = (priority, daysLeft) => {
    if (daysLeft <= 1) return 'bg-error/10 text-error border-error/20';
    if (priority === 'high' || daysLeft <= 3) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-success/10 text-success border-success/20';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'exam': 'FileText',
      'assignment': 'PenTool',
      'project': 'FolderOpen',
      'test': 'CheckSquare'
    };
    return icons[type] || 'Calendar';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Upcoming Deadlines</h3>
        <Button 
          variant="ghost" 
          size="sm"
          iconName="Plus" 
          iconPosition="left"
        >
          Add
        </Button>
      </div>

      {deadlines.length === 0 ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            No upcoming deadlines. You're all caught up! 🎉
          </p>
          <Button 
            variant="outline" 
            size="sm"
            iconName="Plus" 
            iconPosition="left"
          >
            Add Deadline
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {deadlines.slice(0, 4).map((deadline) => {
            const daysLeft = Math.ceil((new Date(deadline.date) - new Date()) / (1000 * 60 * 60 * 24));
            return (
              <div 
                key={deadline.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors duration-200 ${getPriorityColor(deadline.priority, daysLeft)}`}
              >
                <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={getTypeIcon(deadline.type)} 
                    size={16} 
                    className="text-card-foreground" 
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-card-foreground mb-1">
                    {deadline.title}
                  </h4>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>{deadline.subject}</span>
                    <span>•</span>
                    <span className="capitalize">{deadline.type}</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-medium text-card-foreground">
                    {formatDate(deadline.date)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {deadline.time}
                  </div>
                </div>
              </div>
            );
          })}

          {deadlines.length > 4 && (
            <div className="text-center pt-2">
              <Button 
                variant="ghost" 
                size="sm"
              >
                View {deadlines.length - 4} more deadlines
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingDeadlines;