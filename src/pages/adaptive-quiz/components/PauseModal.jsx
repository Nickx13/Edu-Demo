import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PauseModal = ({ isOpen, onResume, onExit, timeRemaining, currentQuestion, totalQuestions }) => {
  if (!isOpen) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-md">
        {/* Header */}
        <div className="text-center p-6 border-b border-border">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Pause" size={32} className="text-warning" />
          </div>
          <h2 className="text-xl font-semibold text-card-foreground">Quiz Paused</h2>
          <p className="text-muted-foreground mt-2">Take a moment to rest</p>
        </div>

        {/* Quiz Status */}
        <div className="p-6 space-y-4">
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-card-foreground">
                {currentQuestion} of {totalQuestions} questions
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Time Remaining</span>
              <span className="font-medium text-card-foreground">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Tips */}
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-card-foreground mb-1">Quick Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Take deep breaths and read each question carefully. You're doing great!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 space-y-3">
          <Button
            onClick={onResume}
            className="w-full"
            iconName="Play"
            iconPosition="left"
          >
            Resume Quiz
          </Button>
          <Button
            variant="outline"
            onClick={onExit}
            className="w-full"
            iconName="X"
            iconPosition="left"
          >
            Exit Quiz
          </Button>
        </div>

        {/* Warning */}
        <div className="px-6 pb-6">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="AlertTriangle" size={12} />
            <span>Exiting will save your progress but end the current session</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PauseModal;