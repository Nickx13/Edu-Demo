import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopicSelector = ({ onStartQuiz }) => {
  const [selectedClass, setSelectedClass] = useState('8');
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');

  const classes = [
    { id: '6', name: 'Class 6' },
    { id: '7', name: 'Class 7' },
    { id: '8', name: 'Class 8' },
    { id: '9', name: 'Class 9' },
    { id: '10', name: 'Class 10' },
    { id: '11', name: 'Class 11' },
    { id: '12', name: 'Class 12' }
  ];

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', icon: 'Calculator' },
    { id: 'science', name: 'Science', icon: 'Atom' },
    { id: 'english', name: 'English', icon: 'BookOpen' },
    { id: 'hindi', name: 'Hindi', icon: 'Languages' },
    { id: 'social-science', name: 'Social Science', icon: 'Globe' }
  ];

  const topics = {
    mathematics: [
      { id: 'algebra', name: 'Algebra', questions: 25, xp: 150 },
      { id: 'geometry', name: 'Geometry', questions: 20, xp: 120 },
      { id: 'arithmetic', name: 'Arithmetic', questions: 30, xp: 180 },
      { id: 'mensuration', name: 'Mensuration', questions: 15, xp: 100 }
    ],
    science: [
      { id: 'physics', name: 'Physics', questions: 22, xp: 140 },
      { id: 'chemistry', name: 'Chemistry', questions: 18, xp: 110 },
      { id: 'biology', name: 'Biology', questions: 25, xp: 150 }
    ],
    english: [
      { id: 'grammar', name: 'Grammar', questions: 20, xp: 120 },
      { id: 'comprehension', name: 'Comprehension', questions: 15, xp: 100 },
      { id: 'vocabulary', name: 'Vocabulary', questions: 25, xp: 150 }
    ]
  };

  const difficulties = [
    { id: 'easy', name: 'Easy', description: 'Basic concepts', color: 'text-success', xpMultiplier: 1 },
    { id: 'medium', name: 'Medium', description: 'Standard level', color: 'text-warning', xpMultiplier: 1.5 },
    { id: 'hard', name: 'Hard', description: 'Advanced concepts', color: 'text-error', xpMultiplier: 2 }
  ];

  const selectedTopicData = topics[selectedSubject]?.find(t => t.id === selectedTopic);
  const selectedDifficultyData = difficulties.find(d => d.id === selectedDifficulty);
  const estimatedXP = selectedTopicData ? Math.floor(selectedTopicData.xp * selectedDifficultyData.xpMultiplier) : 0;

  const handleStartQuiz = () => {
    if (!selectedTopic) return;
    
    onStartQuiz({
      class: selectedClass,
      subject: selectedSubject,
      topic: selectedTopic,
      difficulty: selectedDifficulty,
      estimatedQuestions: selectedTopicData.questions,
      estimatedXP
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Adaptive Quiz</h1>
          <p className="text-muted-foreground">Choose your topic and start learning!</p>
        </div>

        {/* Class Selection */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">Select Class</h3>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                className={`p-3 rounded-lg border transition-all duration-150 ${
                  selectedClass === cls.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                }`}
              >
                <div className="text-sm font-medium">{cls.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Subject Selection */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">Select Subject</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => {
                  setSelectedSubject(subject.id);
                  setSelectedTopic('');
                }}
                className={`p-4 rounded-lg border transition-all duration-150 ${
                  selectedSubject === subject.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                }`}
              >
                <Icon name={subject.icon} size={24} className="mx-auto mb-2" />
                <div className="text-sm font-medium">{subject.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Topic Selection */}
        {selectedSubject && (
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">
              Class {selectedClass} → {subjects.find(s => s.id === selectedSubject)?.name} → Select Topic
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topics[selectedSubject]?.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`p-4 rounded-lg border text-left transition-all duration-150 ${
                    selectedTopic === topic.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                  }`}
                >
                  <div className="font-medium mb-1">{topic.name}</div>
                  <div className="text-xs opacity-80">
                    {topic.questions} questions • {topic.xp} XP
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty Selection */}
        {selectedTopic && (
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">Select Difficulty</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`p-4 rounded-lg border text-left transition-all duration-150 ${
                    selectedDifficulty === difficulty.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                  }`}
                >
                  <div className={`font-medium mb-1 ${selectedDifficulty === difficulty.id ? 'text-primary-foreground' : difficulty.color}`}>
                    {difficulty.name}
                  </div>
                  <div className="text-xs opacity-80">{difficulty.description}</div>
                  <div className="text-xs opacity-60 mt-1">
                    {difficulty.xpMultiplier}x XP multiplier
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Summary & Start */}
        {selectedTopic && (
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Quiz Summary</h3>
              <div className="flex items-center space-x-2 text-warning">
                <Icon name="Star" size={16} />
                <span className="font-medium">{estimatedXP} XP</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Topic:</span>
                <span className="font-medium text-card-foreground">
                  Class {selectedClass} → {subjects.find(s => s.id === selectedSubject)?.name} → {selectedTopicData?.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Difficulty:</span>
                <span className={`font-medium ${selectedDifficultyData?.color}`}>
                  {selectedDifficultyData?.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Questions:</span>
                <span className="font-medium text-card-foreground">{selectedTopicData?.questions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Time:</span>
                <span className="font-medium text-card-foreground">
                  {Math.ceil(selectedTopicData?.questions * 1.5)} minutes
                </span>
              </div>
            </div>

            <Button
              onClick={handleStartQuiz}
              className="w-full"
              iconName="Play"
              iconPosition="left"
            >
              Start Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicSelector;