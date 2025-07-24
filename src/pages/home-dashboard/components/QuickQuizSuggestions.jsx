import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickQuizSuggestions = ({ quizSuggestions, weakAreas }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'hard': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getSubjectIcon = (subject) => {
    const icons = {
      'Mathematics': 'Calculator',
      'Physics': 'Zap',
      'Chemistry': 'Flask',
      'Biology': 'Leaf',
      'English': 'BookOpen',
      'Hindi': 'Languages',
      'Social Science': 'Globe'
    };
    return icons[subject] || 'BookOpen';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Quick Quiz</h3>
        <Button 
          variant="ghost" 
          size="sm"
          iconName="ArrowRight" 
          iconPosition="right"
          onClick={() => window.location.href = '/adaptive-quiz'}
        >
          View All
        </Button>
      </div>

      {weakAreas.length > 0 && (
        <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Focus Areas</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Based on your recent performance, practice these topics:
          </p>
          <div className="flex flex-wrap gap-1">
            {weakAreas.slice(0, 3).map((area, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-warning/20 text-warning text-xs rounded"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {quizSuggestions.map((quiz) => (
          <div 
            key={quiz.id}
            className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
            onClick={() => window.location.href = `/adaptive-quiz?id=${quiz.id}`}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon 
                name={getSubjectIcon(quiz.subject)} 
                size={16} 
                className="text-primary" 
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-medium text-card-foreground">
                  {quiz.title}
                </h4>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="HelpCircle" size={12} />
                  <span>{quiz.questionCount} questions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{quiz.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} />
                  <span>+{quiz.xpReward} XP</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              {quiz.isRecommended && (
                <div className="w-2 h-2 bg-accent rounded-full" title="Recommended for you" />
              )}
              <Icon name="Play" size={16} className="text-primary" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          fullWidth 
          iconName="Brain" 
          iconPosition="left"
          onClick={() => window.location.href = '/adaptive-quiz'}
        >
          Start Custom Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuickQuizSuggestions;