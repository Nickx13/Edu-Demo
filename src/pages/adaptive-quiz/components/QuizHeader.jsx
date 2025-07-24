import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizHeader = ({ 
  currentQuestion, 
  totalQuestions, 
  timeRemaining, 
  onPause, 
  onExit,
  isPaused 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 60) return 'text-error';
    if (timeRemaining <= 300) return 'text-warning';
    return 'text-foreground';
  };

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Progress Info */}
        <div className="flex items-center space-x-3">
          <div className="text-sm font-medium text-foreground">
            Question {currentQuestion} of {totalQuestions}
          </div>
          <div className="w-px h-4 bg-border" />
          <div className={`text-sm font-medium ${getTimeColor()}`}>
            {formatTime(timeRemaining)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onPause}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-150"
            aria-label={isPaused ? "Resume quiz" : "Pause quiz"}
          >
            <Icon 
              name={isPaused ? "Play" : "Pause"} 
              size={16} 
              className="text-muted-foreground" 
            />
          </button>
          <button
            onClick={onExit}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-150"
            aria-label="Exit quiz"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;