import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LoadingAnimation = ({ isVisible }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      icon: 'Brain',
      title: 'Analyzing Your Learning Style',
      description: 'Understanding your preferences and study habits...',
      duration: 2000
    },
    {
      icon: 'Calendar',
      title: 'Creating Weekly Schedule',
      description: 'Organizing your study sessions and time slots...',
      duration: 2500
    },
    {
      icon: 'BookOpen',
      title: 'Prioritizing Subjects',
      description: 'Balancing your subjects based on difficulty and importance...',
      duration: 2000
    },
    {
      icon: 'Target',
      title: 'Optimizing for Your Goals',
      description: 'Aligning the plan with your target score and exam date...',
      duration: 1500
    },
    {
      icon: 'Sparkles',
      title: 'Finalizing Your Plan',
      description: 'Adding personalized tips and study resources...',
      duration: 1000
    }
  ];

  const motivationalMessages = [
    "Great things never come from comfort zones! 🚀",
    "Success is the sum of small efforts repeated daily 📚",
    "Your future self will thank you for starting today! ⭐",
    "Every expert was once a beginner 🌟",
    "The best time to plant a tree was 20 years ago. The second best time is now! 🌱"
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let stepTimer;
    let progressTimer;
    let totalDuration = 0;

    const runStep = (stepIndex) => {
      if (stepIndex >= steps.length) return;

      setCurrentStep(stepIndex);
      const step = steps[stepIndex];
      
      // Progress animation for current step
      let stepProgress = 0;
      const progressIncrement = 100 / (step.duration / 50);
      
      progressTimer = setInterval(() => {
        stepProgress += progressIncrement;
        if (stepProgress >= 100) {
          stepProgress = 100;
          clearInterval(progressTimer);
        }
        setProgress(stepProgress);
      }, 50);

      // Move to next step
      stepTimer = setTimeout(() => {
        if (stepIndex < steps.length - 1) {
          runStep(stepIndex + 1);
        }
      }, step.duration);
    };

    runStep(0);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];
  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-xl shadow-elevated w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="Sparkles" size={32} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-card-foreground mb-2">
            Creating Your Study Plan
          </h2>
          <p className="text-sm text-muted-foreground">
            This will take just a moment...
          </p>
        </div>

        {/* Current Step */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center animate-pulse">
              <Icon name={currentStepData.icon} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-card-foreground">{currentStepData.title}</h3>
              <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-primary font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Steps Overview */}
          <div className="grid grid-cols-5 gap-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-success'
                    : index === currentStep
                    ? 'bg-primary' :'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Motivational Message */}
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground italic">
              {randomMessage}
            </p>
          </div>

          {/* AI Processing Indicator */}
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>AI is working its magic</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;