import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GeneratedPlan = ({ 
  plan, 
  onEdit, 
  onExport, 
  onSave 
}) => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(new Set());

  const handleTaskToggle = (taskId) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800 border-blue-200',
      'Science': 'bg-green-100 text-green-800 border-green-200',
      'English': 'bg-purple-100 text-purple-800 border-purple-200',
      'Hindi': 'bg-orange-100 text-orange-800 border-orange-200',
      'Social Science': 'bg-red-100 text-red-800 border-red-200',
      'Physics': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Chemistry': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Biology': 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getDayProgress = (day) => {
    const dayTasks = day.sessions.flatMap(session => session.tasks);
    const completedCount = dayTasks.filter(task => completedTasks.has(task.id)).length;
    return dayTasks.length > 0 ? (completedCount / dayTasks.length) * 100 : 0;
  };

  const getWeekProgress = (week) => {
    const allTasks = week.days.flatMap(day => 
      day.sessions.flatMap(session => session.tasks)
    );
    const completedCount = allTasks.filter(task => completedTasks.has(task.id)).length;
    return allTasks.length > 0 ? (completedCount / allTasks.length) * 100 : 0;
  };

  if (!plan) return null;

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Your Personalized Study Plan</h3>
            <p className="text-sm text-muted-foreground">
              {plan.totalWeeks} weeks until {plan.examType} • {plan.totalHours} total study hours
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Edit" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="outline" size="sm" iconName="Share" onClick={onExport}>
            Export
          </Button>
          <Button size="sm" iconName="Save" onClick={onSave}>
            Save Plan
          </Button>
        </div>
      </div>

      {/* Plan Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Target Score</span>
          </div>
          <p className="text-2xl font-bold text-primary mt-1">{plan.targetScore}%</p>
        </div>
        <div className="bg-secondary/5 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-secondary">Subjects</span>
          </div>
          <p className="text-2xl font-bold text-secondary mt-1">{plan.subjects.length}</p>
        </div>
        <div className="bg-accent/5 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Daily Hours</span>
          </div>
          <p className="text-2xl font-bold text-accent mt-1">{plan.dailyHours}h</p>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        {plan.weeks.map((week, index) => {
          const progress = getWeekProgress(week);
          return (
            <button
              key={index}
              onClick={() => setSelectedWeek(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all duration-150 ${
                selectedWeek === index
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-card-foreground'
              }`}
            >
              <div className="text-sm font-medium">Week {index + 1}</div>
              <div className="text-xs text-muted-foreground">{week.dateRange}</div>
              <div className="w-full bg-muted rounded-full h-1 mt-1">
                <div 
                  className="bg-primary h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Week Details */}
      {plan.weeks[selectedWeek] && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-card-foreground">
              Week {selectedWeek + 1}: {plan.weeks[selectedWeek].theme}
            </h4>
            <div className="text-sm text-muted-foreground">
              Progress: {Math.round(getWeekProgress(plan.weeks[selectedWeek]))}%
            </div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {plan.weeks[selectedWeek].days.map((day, dayIndex) => {
              const progress = getDayProgress(day);
              return (
                <div key={dayIndex} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-card-foreground">{day.name}</h5>
                    <span className="text-xs text-muted-foreground">{day.date}</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-success h-1 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="space-y-2">
                    {day.sessions.map((session, sessionIndex) => (
                      <div key={sessionIndex} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Icon name="Clock" size={12} className="text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">
                            {session.time}
                          </span>
                        </div>
                        
                        {session.tasks.map((task, taskIndex) => (
                          <div
                            key={task.id}
                            className={`p-2 rounded-md border transition-all duration-150 ${
                              completedTasks.has(task.id)
                                ? 'bg-success/10 border-success/20' :'bg-muted/50 border-border'
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              <button
                                onClick={() => handleTaskToggle(task.id)}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5 transition-all duration-150 ${
                                  completedTasks.has(task.id)
                                    ? 'bg-success border-success text-success-foreground'
                                    : 'border-border hover:border-primary'
                                }`}
                              >
                                {completedTasks.has(task.id) && (
                                  <Icon name="Check" size={10} />
                                )}
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className={`text-xs font-medium ${getSubjectColor(task.subject)} px-2 py-1 rounded-md border inline-block mb-1`}>
                                  {task.subject}
                                </div>
                                <p className={`text-sm ${
                                  completedTasks.has(task.id) 
                                    ? 'line-through text-muted-foreground' 
                                    : 'text-card-foreground'
                                }`}>
                                  {task.topic}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {task.duration} min
                                  </span>
                                  {task.resources && (
                                    <button className="text-xs text-primary hover:text-primary/80">
                                      Resources
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Study Tips for the Week */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-card-foreground">Week {selectedWeek + 1} Focus:</p>
            <p className="text-muted-foreground">
              {plan.weeks[selectedWeek]?.tip || "Stay consistent with your study schedule and take regular breaks to maintain focus."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedPlan;