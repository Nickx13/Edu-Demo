import React from 'react';
import Icon from '../../../components/AppIcon';

const LearningStyleCard = ({ 
  formData, 
  onFormChange, 
  errors 
}) => {
  const learningStyles = [
    {
      id: 'visual',
      name: 'Visual Learner',
      description: 'Learn best through diagrams, charts, and visual aids',
      icon: 'Eye',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      features: ['Mind maps', 'Flowcharts', 'Color coding', 'Infographics']
    },
    {
      id: 'auditory',
      name: 'Auditory Learner',
      description: 'Learn best through listening and verbal explanations',
      icon: 'Volume2',
      color: 'text-green-600 bg-green-50 border-green-200',
      features: ['Audio lectures', 'Discussions', 'Verbal repetition', 'Music mnemonics']
    },
    {
      id: 'kinesthetic',
      name: 'Kinesthetic Learner',
      description: 'Learn best through hands-on activities and movement',
      icon: 'Hand',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      features: ['Practical exercises', 'Physical models', 'Role playing', 'Lab experiments']
    },
    {
      id: 'reading',
      name: 'Reading/Writing Learner',
      description: 'Learn best through reading and writing activities',
      icon: 'BookOpen',
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      features: ['Note-taking', 'Text summaries', 'Written exercises', 'Research papers']
    }
  ];

  const studyEnvironments = [
    { id: 'quiet', label: 'Quiet Environment', icon: 'Volume' },
    { id: 'background-music', label: 'Background Music', icon: 'Music' },
    { id: 'group-study', label: 'Group Study', icon: 'Users' },
    { id: 'solo-study', label: 'Solo Study', icon: 'User' }
  ];

  const difficultyApproaches = [
    { id: 'easy-first', label: 'Start with Easy Topics', description: 'Build confidence gradually' },
    { id: 'hard-first', label: 'Tackle Difficult Topics First', description: 'Get challenges out of the way' },
    { id: 'mixed', label: 'Mix Easy and Hard', description: 'Balanced approach' }
  ];

  const handleEnvironmentToggle = (envId) => {
    const currentEnvs = formData.studyEnvironment || [];
    const isSelected = currentEnvs.includes(envId);
    
    if (isSelected) {
      onFormChange('studyEnvironment', currentEnvs.filter(e => e !== envId));
    } else {
      onFormChange('studyEnvironment', [...currentEnvs, envId]);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Brain" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Learning Style & Preferences</h3>
          <p className="text-sm text-muted-foreground">Help us understand how you learn best</p>
        </div>
      </div>

      {/* Learning Style Selection */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-3">
            Primary Learning Style
          </label>
          {errors.learningStyle && (
            <p className="text-sm text-error mb-3">{errors.learningStyle}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningStyles.map((style) => (
              <div
                key={style.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  formData.learningStyle === style.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => onFormChange('learningStyle', style.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    formData.learningStyle === style.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={style.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-card-foreground">{style.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{style.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {style.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Environment */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-card-foreground">
            Preferred Study Environment
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {studyEnvironments.map((env) => {
              const isSelected = formData.studyEnvironment?.includes(env.id);
              return (
                <button
                  key={env.id}
                  onClick={() => handleEnvironmentToggle(env.id)}
                  className={`p-3 rounded-lg border text-center transition-all duration-150 ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-card-foreground'
                  }`}
                >
                  <Icon name={env.icon} size={20} className="mx-auto mb-2" />
                  <div className="text-xs font-medium">{env.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Approach */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-card-foreground">
            How do you prefer to approach difficult topics?
          </label>
          <div className="space-y-2">
            {difficultyApproaches.map((approach) => (
              <button
                key={approach.id}
                onClick={() => onFormChange('difficultyApproach', approach.id)}
                className={`w-full p-3 rounded-lg border text-left transition-all duration-150 ${
                  formData.difficultyApproach === approach.id
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-card-foreground'
                }`}
              >
                <div className="font-medium">{approach.label}</div>
                <div className="text-sm text-muted-foreground mt-1">{approach.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Motivation Factors */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-card-foreground">
            What motivates you most?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'achievements', label: 'Achievements & Badges', icon: 'Award' },
              { id: 'progress', label: 'Progress Tracking', icon: 'TrendingUp' },
              { id: 'competition', label: 'Friendly Competition', icon: 'Trophy' },
              { id: 'rewards', label: 'Rewards & Points', icon: 'Star' }
            ].map((motivation) => {
              const isSelected = formData.motivationFactors?.includes(motivation.id);
              return (
                <button
                  key={motivation.id}
                  onClick={() => {
                    const current = formData.motivationFactors || [];
                    if (isSelected) {
                      onFormChange('motivationFactors', current.filter(m => m !== motivation.id));
                    } else {
                      onFormChange('motivationFactors', [...current, motivation.id]);
                    }
                  }}
                  className={`p-3 rounded-lg border transition-all duration-150 ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-card-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={motivation.icon} size={16} />
                    <span className="text-sm font-medium">{motivation.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-card-foreground">Personalized Learning:</p>
            <p className="text-muted-foreground">
              Your learning style preferences will help us create a study plan with the most effective methods and resources for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningStyleCard;