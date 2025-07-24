import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const actions = [
    {
      id: 'chat',
      title: 'AI Tutor Chat',
      description: 'Get instant help from AI',
      icon: 'MessageCircle',
      color: 'bg-primary/10 text-primary',
      route: '/ai-chat-tutor'
    },
    {
      id: 'solve',
      title: 'Solve Doubt',
      description: 'Capture & solve questions',
      icon: 'Camera',
      color: 'bg-secondary/10 text-secondary',
      route: '/doubt-solver'
    },
    {
      id: 'quiz',
      title: 'Take Quiz',
      description: 'Test your knowledge',
      icon: 'Brain',
      color: 'bg-accent/10 text-accent',
      route: '/adaptive-quiz'
    },
    {
      id: 'plan',
      title: 'Study Plan',
      description: 'Organize your learning',
      icon: 'Calendar',
      color: 'bg-success/10 text-success',
      route: '/study-plan-generator'
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => window.location.href = action.route}
            className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-muted/50 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${action.color}`}>
              <Icon name={action.icon} size={20} />
            </div>
            
            <h4 className="text-sm font-medium text-card-foreground mb-1 text-center">
              {action.title}
            </h4>
            
            <p className="text-xs text-muted-foreground text-center">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;