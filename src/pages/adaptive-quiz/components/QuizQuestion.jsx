import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizQuestion = ({ 
  question, 
  onAnswer, 
  showResult, 
  selectedAnswer, 
  correctAnswer,
  explanation,
  onNext,
  isLastQuestion 
}) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (showResult) {
      setAnimationClass('animate-pulse');
      const timer = setTimeout(() => setAnimationClass(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [showResult]);

  const getOptionStyle = (optionId) => {
    if (!showResult) {
      return selectedAnswer === optionId
        ? 'bg-primary text-primary-foreground border-primary'
        : 'bg-card text-card-foreground border-border hover:bg-muted/50';
    }

    if (optionId === correctAnswer) {
      return 'bg-success text-success-foreground border-success';
    }
    
    if (optionId === selectedAnswer && optionId !== correctAnswer) {
      return 'bg-error text-error-foreground border-error';
    }
    
    return 'bg-muted text-muted-foreground border-border opacity-60';
  };

  const getOptionIcon = (optionId) => {
    if (!showResult) return null;
    
    if (optionId === correctAnswer) {
      return <Icon name="Check" size={20} className="text-success-foreground" />;
    }
    
    if (optionId === selectedAnswer && optionId !== correctAnswer) {
      return <Icon name="X" size={20} className="text-error-foreground" />;
    }
    
    return null;
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 space-y-6">
        {/* Question */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name="HelpCircle" size={16} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium text-card-foreground leading-relaxed">
                {question.text}
              </h2>
              {question.image && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <img 
                    src={question.image} 
                    alt="Question illustration"
                    className="w-full h-auto max-h-64 object-contain bg-muted"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const optionId = String.fromCharCode(65 + index); // A, B, C, D
            return (
              <button
                key={optionId}
                onClick={() => !showResult && onAnswer(optionId)}
                disabled={showResult}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${getOptionStyle(optionId)} ${animationClass}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium ${
                      showResult && optionId === correctAnswer 
                        ? 'border-success-foreground text-success-foreground'
                        : showResult && optionId === selectedAnswer && optionId !== correctAnswer
                        ? 'border-error-foreground text-error-foreground'
                        : 'border-current'
                    }`}>
                      {optionId}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                  {getOptionIcon(optionId)}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && explanation && (
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Lightbulb" size={14} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-card-foreground mb-2">Explanation</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        {showResult && (
          <div className="flex justify-end">
            <Button
              onClick={onNext}
              iconName={isLastQuestion ? "Flag" : "ArrowRight"}
              iconPosition="right"
              className="min-w-[120px]"
            >
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;