import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodayStudyPlan = ({ studyPlan, onTaskComplete }) => {
  const [completedTasks, setCompletedTasks] = useState(new Set());

  const handleTaskToggle = (taskId) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
    onTaskComplete(taskId, newCompleted.has(taskId));
  };

  const completedCount = completedTasks.size;
  const totalTasks = studyPlan.tasks.length;
  const progressPercentage = (completedCount / totalTasks) * 100;

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Today's Study Plan</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-IN', { 
              weekday: 'short', 
              day: 'numeric', 
              month: 'short' 
            })}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-card-foreground">
            {completedCount}/{totalTasks} completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {studyPlan.tasks.map((task) => {
          const isCompleted = completedTasks.has(task.id);
          return (
            <div 
              key={task.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                isCompleted 
                  ? 'bg-success/10 border-success/20' :'bg-muted/50 border-border hover:bg-muted'
              }`}
            >
              <button
                onClick={() => handleTaskToggle(task.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  isCompleted
                    ? 'bg-success border-success text-success-foreground'
                    : 'border-muted-foreground hover:border-primary'
                }`}
              >
                {isCompleted && <Icon name="Check" size={12} />}
              </button>
              
              <div className="flex-1">
                <h4 className={`text-sm font-medium transition-all duration-200 ${
                  isCompleted ? 'text-muted-foreground line-through' : 'text-card-foreground'
                }`}>
                  {task.subject} - {task.topic}
                </h4>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>{task.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="BookOpen" size={12} />
                    <span>{task.type}</span>
                  </div>
                </div>
              </div>

              <div className={`px-2 py-1 rounded text-xs font-medium ${
                task.priority === 'high' ?'bg-error/10 text-error'
                  : task.priority === 'medium' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
              }`}>
                {task.priority}
              </div>
            </div>
          );
        })}
      </div>

      <Button 
        variant="outline" 
        fullWidth 
        iconName="Plus" 
        iconPosition="left"
        onClick={() => window.location.href = '/study-plan-generator'}
      >
        View Full Study Plan
      </Button>
    </div>
  );
};

export default TodayStudyPlan;