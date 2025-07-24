import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentDoubts = ({ onDoubtSelect }) => {
  const [selectedDoubt, setSelectedDoubt] = useState(null);

  const recentDoubts = [
    {
      id: 1,
      question: "Solve for x: 2x + 5 = 13",
      subject: "Algebra",
      timestamp: new Date(Date.now() - 3600000),
      difficulty: "Easy",
      solved: true,
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      question: "Find the area of a triangle with base 8 cm and height 6 cm",
      subject: "Geometry",
      timestamp: new Date(Date.now() - 7200000),
      difficulty: "Medium",
      solved: true,
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      question: "Differentiate f(x) = x² + 3x + 2",
      subject: "Calculus",
      timestamp: new Date(Date.now() - 10800000),
      difficulty: "Hard",
      solved: true,
      thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      question: "A train travels 120 km in 2 hours. What is its speed?",
      subject: "Physics",
      timestamp: new Date(Date.now() - 14400000),
      difficulty: "Easy",
      solved: false,
      thumbnail: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop"
    },
    {
      id: 5,
      question: "Balance the equation: H₂ + O₂ → H₂O",
      subject: "Chemistry",
      timestamp: new Date(Date.now() - 18000000),
      difficulty: "Medium",
      solved: true,
      thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&h=100&fit=crop"
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-success bg-success/10';
      case 'Medium':
        return 'text-warning bg-warning/10';
      case 'Hard':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const handleDoubtClick = (doubt) => {
    setSelectedDoubt(doubt.id);
    onDoubtSelect?.(doubt);
  };

  if (recentDoubts.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <Icon name="History" size={32} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="font-medium text-foreground mb-1">No Recent Doubts</h3>
        <p className="text-sm text-muted-foreground">
          Your solved problems will appear here for quick access
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recent Doubts</h2>
        <Button variant="ghost" size="sm">
          <Icon name="MoreHorizontal" size={16} />
        </Button>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-3 min-w-max">
          {recentDoubts.map((doubt) => (
            <div
              key={doubt.id}
              onClick={() => handleDoubtClick(doubt)}
              className={`flex-shrink-0 w-72 bg-card border rounded-lg p-4 cursor-pointer transition-all duration-150 hover:shadow-soft ${
                selectedDoubt === doubt.id
                  ? 'border-primary shadow-soft'
                  : 'border-border hover:border-border/80'
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Thumbnail */}
                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={doubt.thumbnail}
                    alt="Problem thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {doubt.subject}
                    </span>
                    <div className="flex items-center space-x-1">
                      {doubt.solved ? (
                        <Icon name="CheckCircle" size={14} className="text-success" />
                      ) : (
                        <Icon name="Clock" size={14} className="text-warning" />
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                    {doubt.question}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(doubt.difficulty)}`}>
                      {doubt.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(doubt.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Eye" size={14} className="mr-1" />
                    View
                  </Button>
                  
                  {doubt.solved && (
                    <Button variant="ghost" size="sm">
                      <Icon name="Share" size={14} className="mr-1" />
                      Share
                    </Button>
                  )}
                </div>
                
                <Button variant="ghost" size="sm">
                  <Icon name="MoreVertical" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button variant="outline" className="w-full sm:w-auto">
          <Icon name="History" size={16} className="mr-2" />
          View All Doubts
        </Button>
      </div>
    </div>
  );
};

export default RecentDoubts;