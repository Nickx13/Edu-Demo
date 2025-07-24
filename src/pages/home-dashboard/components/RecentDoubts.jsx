import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentDoubts = ({ doubts }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-700',
      'Physics': 'bg-purple-100 text-purple-700',
      'Chemistry': 'bg-green-100 text-green-700',
      'Biology': 'bg-red-100 text-red-700',
      'English': 'bg-yellow-100 text-yellow-700',
      'Hindi': 'bg-orange-100 text-orange-700',
      'Social Science': 'bg-indigo-100 text-indigo-700'
    };
    return colors[subject] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Doubts</h3>
        <Button 
          variant="ghost" 
          size="sm"
          iconName="ArrowRight" 
          iconPosition="right"
          onClick={() => window.location.href = '/doubt-solver'}
        >
          View All
        </Button>
      </div>

      {doubts.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Camera" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            No doubts solved yet. Start by capturing a question!
          </p>
          <Button 
            variant="outline" 
            iconName="Camera" 
            iconPosition="left"
            onClick={() => window.location.href = '/doubt-solver'}
          >
            Solve First Doubt
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {doubts.slice(0, 3).map((doubt) => (
            <div 
              key={doubt.id}
              className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
              onClick={() => window.location.href = `/doubt-solver?id=${doubt.id}`}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                {doubt.thumbnail ? (
                  <Image 
                    src={doubt.thumbnail} 
                    alt="Question thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="FileText" size={16} className="text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSubjectColor(doubt.subject)}`}>
                    {doubt.subject}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(doubt.timestamp)}
                  </span>
                </div>
                
                <h4 className="text-sm font-medium text-card-foreground mb-1 line-clamp-2">
                  {doubt.question}
                </h4>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{doubt.solveTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="CheckCircle" size={12} className="text-success" />
                    <span>Solved</span>
                  </div>
                </div>
              </div>

              <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0" />
            </div>
          ))}

          {doubts.length > 3 && (
            <div className="text-center pt-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.href = '/doubt-solver'}
              >
                View {doubts.length - 3} more doubts
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentDoubts;