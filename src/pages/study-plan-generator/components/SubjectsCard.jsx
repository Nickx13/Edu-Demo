import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const SubjectsCard = ({ 
  formData, 
  onFormChange, 
  errors 
}) => {
  const subjectsByClass = {
    '6': ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Sanskrit'],
    '7': ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Sanskrit'],
    '8': ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Sanskrit'],
    '9': ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Sanskrit', 'Computer Science'],
    '10': ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Sanskrit', 'Computer Science'],
    '11': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'Economics', 'Business Studies', 'Accountancy'],
    '12': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'Economics', 'Business Studies', 'Accountancy']
  };

  const availableSubjects = subjectsByClass[formData.class] || subjectsByClass['10'];

  const handleSubjectToggle = (subject) => {
    const currentSubjects = formData.subjects || [];
    const isSelected = currentSubjects.includes(subject);
    
    if (isSelected) {
      const updatedSubjects = currentSubjects.filter(s => s !== subject);
      onFormChange('subjects', updatedSubjects);
      
      // Remove from priorities if deselected
      const updatedPriorities = { ...formData.subjectPriorities };
      delete updatedPriorities[subject];
      onFormChange('subjectPriorities', updatedPriorities);
    } else {
      onFormChange('subjects', [...currentSubjects, subject]);
    }
  };

  const handlePriorityChange = (subject, priority) => {
    const updatedPriorities = {
      ...formData.subjectPriorities,
      [subject]: priority
    };
    onFormChange('subjectPriorities', updatedPriorities);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="BookOpen" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Subjects & Priorities</h3>
          <p className="text-sm text-muted-foreground">Choose subjects and set study priorities</p>
        </div>
      </div>

      {errors.subjects && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-sm text-error">{errors.subjects}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableSubjects.map((subject) => {
            const isSelected = formData.subjects?.includes(subject);
            return (
              <div
                key={subject}
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  isSelected 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <Checkbox
                  label={subject}
                  checked={isSelected}
                  onChange={() => handleSubjectToggle(subject)}
                  className="mb-3"
                />
                
                {isSelected && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Priority Level</label>
                    <div className="flex space-x-2">
                      {['high', 'medium', 'low'].map((priority) => (
                        <button
                          key={priority}
                          onClick={() => handlePriorityChange(subject, priority)}
                          className={`flex-1 px-2 py-1 rounded-md text-xs font-medium border transition-all duration-150 ${
                            formData.subjectPriorities?.[subject] === priority
                              ? getPriorityColor(priority)
                              : 'text-muted-foreground bg-muted/50 border-border hover:border-primary/30'
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-1">
                            <Icon 
                              name={getPriorityIcon(priority)} 
                              size={12} 
                            />
                            <span className="capitalize">{priority}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {formData.subjects?.length > 0 && (
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-card-foreground mb-3">Selected Subjects Summary</h4>
            <div className="flex flex-wrap gap-2">
              {formData.subjects.map((subject) => {
                const priority = formData.subjectPriorities?.[subject] || 'medium';
                return (
                  <div
                    key={subject}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(priority)}`}
                  >
                    <div className="flex items-center space-x-1">
                      <Icon name={getPriorityIcon(priority)} size={10} />
                      <span>{subject}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-card-foreground">Priority Guidelines:</p>
            <ul className="text-muted-foreground mt-1 space-y-1">
              <li>• <span className="text-error">High:</span> Subjects you find challenging or have upcoming tests</li>
              <li>• <span className="text-warning">Medium:</span> Regular subjects requiring consistent study</li>
              <li>• <span className="text-success">Low:</span> Subjects you're confident in or enjoy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectsCard;