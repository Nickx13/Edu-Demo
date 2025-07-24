import React from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ExamDetailsCard = ({ 
  formData, 
  onFormChange, 
  errors 
}) => {
  const boardOptions = [
    { value: 'cbse', label: 'CBSE (Central Board of Secondary Education)' },
    { value: 'icse', label: 'ICSE (Indian Certificate of Secondary Education)' },
    { value: 'state', label: 'State Board' },
    { value: 'igcse', label: 'IGCSE (International General Certificate)' }
  ];

  const classOptions = [
    { value: '6', label: 'Class 6' },
    { value: '7', label: 'Class 7' },
    { value: '8', label: 'Class 8' },
    { value: '9', label: 'Class 9' },
    { value: '10', label: 'Class 10' },
    { value: '11', label: 'Class 11' },
    { value: '12', label: 'Class 12' }
  ];

  const examTypeOptions = [
    { value: 'term1', label: 'Term 1 Examination' },
    { value: 'term2', label: 'Term 2 Examination' },
    { value: 'annual', label: 'Annual Examination' },
    { value: 'board', label: 'Board Examination' },
    { value: 'competitive', label: 'Competitive Exam (JEE/NEET)' }
  ];

  const handleScoreChange = (value) => {
    onFormChange('targetScore', parseInt(value));
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Target" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Exam Details</h3>
          <p className="text-sm text-muted-foreground">Set your academic goals and exam information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Education Board"
          placeholder="Select your board"
          options={boardOptions}
          value={formData.board}
          onChange={(value) => onFormChange('board', value)}
          error={errors.board}
          required
        />

        <Select
          label="Class/Grade"
          placeholder="Select your class"
          options={classOptions}
          value={formData.class}
          onChange={(value) => onFormChange('class', value)}
          error={errors.class}
          required
        />
      </div>

      <Select
        label="Exam Type"
        placeholder="Select exam type"
        options={examTypeOptions}
        value={formData.examType}
        onChange={(value) => onFormChange('examType', value)}
        error={errors.examType}
        required
      />

      <Input
        label="Exam Date"
        type="date"
        value={formData.examDate}
        onChange={(e) => onFormChange('examDate', e.target.value)}
        error={errors.examDate}
        required
        min={new Date().toISOString().split('T')[0]}
      />

      <div className="space-y-3">
        <label className="block text-sm font-medium text-card-foreground">
          Target Score: {formData.targetScore}%
        </label>
        <div className="px-3">
          <input
            type="range"
            min="60"
            max="100"
            step="5"
            value={formData.targetScore}
            onChange={(e) => handleScoreChange(e.target.value)}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(formData.targetScore - 60) * 2.5}%, var(--color-muted) ${(formData.targetScore - 60) * 2.5}%, var(--color-muted) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>60%</span>
            <span>80%</span>
            <span>100%</span>
          </div>
        </div>
        {formData.targetScore >= 90 && (
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="Trophy" size={16} />
            <span>Excellent goal! You're aiming for distinction.</span>
          </div>
        )}
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-card-foreground">Pro Tip:</p>
            <p className="text-muted-foreground">
              Set realistic but challenging goals. A 5-10% improvement from your last performance is a great target!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailsCard;