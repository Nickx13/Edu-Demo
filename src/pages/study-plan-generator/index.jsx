import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import ExamDetailsCard from './components/ExamDetailsCard';
import SubjectsCard from './components/SubjectsCard';
import AvailabilityCard from './components/AvailabilityCard';
import LearningStyleCard from './components/LearningStyleCard';
import GeneratedPlan from './components/GeneratedPlan';
import LoadingAnimation from './components/LoadingAnimation';

const StudyPlanGenerator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('form'); // 'form', 'generating', 'plan'
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExistingPlans, setShowExistingPlans] = useState(false);
  
  const [formData, setFormData] = useState({
    // Exam Details
    board: '',
    class: '',
    examType: '',
    examDate: '',
    targetScore: 85,
    
    // Subjects
    subjects: [],
    subjectPriorities: {},
    
    // Availability
    availableTimeSlots: [],
    dailyStudyHours: 3,
    sessionDuration: 60,
    breakDuration: 10,
    
    // Learning Style
    learningStyle: '',
    studyEnvironment: [],
    difficultyApproach: '',
    motivationFactors: []
  });

  const [errors, setErrors] = useState({});
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Mock existing plans
  const existingPlans = [
    {
      id: 1,
      name: "CBSE Class 10 Board Prep",
      examDate: "2025-03-15",
      subjects: ["Mathematics", "Science", "English", "Hindi", "Social Science"],
      progress: 65,
      createdAt: "2025-01-10",
      isActive: true
    },
    {
      id: 2,
      name: "Mathematics Focus Plan",
      examDate: "2025-02-20",
      subjects: ["Mathematics"],
      progress: 40,
      createdAt: "2025-01-05",
      isActive: false
    }
  ];

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user makes changes
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Exam Details validation
    if (!formData.board) newErrors.board = 'Please select your education board';
    if (!formData.class) newErrors.class = 'Please select your class';
    if (!formData.examType) newErrors.examType = 'Please select exam type';
    if (!formData.examDate) newErrors.examDate = 'Please select exam date';
    
    // Subjects validation
    if (!formData.subjects || formData.subjects.length === 0) {
      newErrors.subjects = 'Please select at least one subject';
    }
    
    // Availability validation
    if (!formData.availableTimeSlots || formData.availableTimeSlots.length === 0) {
      newErrors.availableTimeSlots = 'Please select at least one time slot';
    }
    
    // Learning Style validation
    if (!formData.learningStyle) {
      newErrors.learningStyle = 'Please select your learning style';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateMockPlan = () => {
    const examDate = new Date(formData.examDate);
    const today = new Date();
    const timeDiff = examDate.getTime() - today.getTime();
    const totalWeeks = Math.ceil(timeDiff / (1000 * 3600 * 24 * 7));
    
    const mockPlan = {
      id: Date.now(),
      examType: formData.examType,
      targetScore: formData.targetScore,
      subjects: formData.subjects,
      dailyHours: formData.dailyStudyHours,
      totalWeeks: Math.min(totalWeeks, 12),
      totalHours: formData.dailyStudyHours * 7 * Math.min(totalWeeks, 12),
      weeks: []
    };

    // Generate weeks
    for (let week = 0; week < Math.min(totalWeeks, 12); week++) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() + (week * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const weekData = {
        weekNumber: week + 1,
        dateRange: `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`,
        theme: week < 4 ? 'Foundation Building' : week < 8 ? 'Concept Mastery' : 'Exam Preparation',
        tip: week < 4 
          ? 'Focus on understanding basic concepts and building strong foundations.'
          : week < 8 
          ? 'Practice problems and apply concepts to real scenarios.' :'Review, practice mock tests, and focus on weak areas.',
        days: []
      };

      // Generate days for the week
      const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      
      dayNames.forEach((dayName, dayIndex) => {
        const dayDate = new Date(weekStart);
        dayDate.setDate(weekStart.getDate() + dayIndex);
        
        const dayData = {
          name: dayName,
          date: dayDate.toLocaleDateString(),
          sessions: []
        };

        // Generate study sessions based on available time slots
        formData.availableTimeSlots.forEach((timeSlot, sessionIndex) => {
          if (sessionIndex < 2) { // Limit to 2 sessions per day
            const session = {
              time: timeSlot === 'morning' ? '9:00 AM - 10:00 AM' : 
                    timeSlot === 'afternoon' ? '2:00 PM - 3:00 PM' : 
                    timeSlot === 'evening' ? '6:00 PM - 7:00 PM' : '8:00 PM - 9:00 PM',
              tasks: []
            };

            // Add tasks for each subject
            const subjectForSession = formData.subjects[sessionIndex % formData.subjects.length];
            const topics = {
              'Mathematics': ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'],
              'Science': ['Physics', 'Chemistry', 'Biology', 'Environmental Science'],
              'English': ['Grammar', 'Literature', 'Writing Skills', 'Reading Comprehension'],
              'Hindi': ['व्याकरण', 'साहित्य', 'लेखन कौशल', 'गद्य-पद्य'],
              'Social Science': ['History', 'Geography', 'Civics', 'Economics']
            };

            const subjectTopics = topics[subjectForSession] || ['Chapter 1', 'Chapter 2', 'Chapter 3'];
            const randomTopic = subjectTopics[Math.floor(Math.random() * subjectTopics.length)];

            session.tasks.push({
              id: `task-${week}-${dayIndex}-${sessionIndex}`,
              subject: subjectForSession,
              topic: randomTopic,
              duration: formData.sessionDuration,
              type: week < 4 ? 'study' : week < 8 ? 'practice' : 'revision',
              resources: true
            });

            dayData.sessions.push(session);
          }
        });

        weekData.days.push(dayData);
      });

      mockPlan.weeks.push(weekData);
    }

    return mockPlan;
  };

  const handleGeneratePlan = async () => {
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);
    setCurrentStep('generating');

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 9000));
      
      const plan = generateMockPlan();
      setGeneratedPlan(plan);
      setCurrentStep('plan');
    } catch (error) {
      console.error('Error generating plan:', error);
      setErrors({ general: 'Failed to generate plan. Please try again.' });
      setCurrentStep('form');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditPlan = () => {
    setCurrentStep('form');
  };

  const handleExportPlan = () => {
    // Mock export functionality
    const planData = JSON.stringify(generatedPlan, null, 2);
    const blob = new Blob([planData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-plan-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSavePlan = () => {
    // Mock save functionality
    localStorage.setItem(`study-plan-${generatedPlan.id}`, JSON.stringify(generatedPlan));
    alert('Study plan saved successfully!');
  };

  const handleExistingPlanClick = (plan) => {
    setGeneratedPlan(plan);
    setCurrentStep('plan');
    setShowExistingPlans(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-14 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/home-dashboard')}
                className="w-10 h-10 rounded-lg border border-border hover:bg-muted flex items-center justify-center transition-colors duration-150"
              >
                <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Study Plan Generator</h1>
                <p className="text-sm text-muted-foreground">Create your personalized study schedule</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="History"
              onClick={() => setShowExistingPlans(true)}
            >
              My Plans
            </Button>
          </div>

          {/* Form Steps */}
          {currentStep === 'form' && (
            <div className="space-y-6">
              {errors.general && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                  <p className="text-sm text-error">{errors.general}</p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <ExamDetailsCard
                    formData={formData}
                    onFormChange={handleFormChange}
                    errors={errors}
                  />
                  
                  <SubjectsCard
                    formData={formData}
                    onFormChange={handleFormChange}
                    errors={errors}
                  />
                </div>
                
                <div className="space-y-6">
                  <AvailabilityCard
                    formData={formData}
                    onFormChange={handleFormChange}
                    errors={errors}
                  />
                  
                  <LearningStyleCard
                    formData={formData}
                    onFormChange={handleFormChange}
                    errors={errors}
                  />
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center pt-6">
                <Button
                  size="lg"
                  iconName="Sparkles"
                  iconPosition="left"
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="px-8"
                >
                  Generate My Study Plan
                </Button>
              </div>
            </div>
          )}

          {/* Generated Plan */}
          {currentStep === 'plan' && generatedPlan && (
            <GeneratedPlan
              plan={generatedPlan}
              onEdit={handleEditPlan}
              onExport={handleExportPlan}
              onSave={handleSavePlan}
            />
          )}
        </div>
      </main>

      {/* Existing Plans Modal */}
      {showExistingPlans && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
          <div className="bg-card rounded-xl shadow-elevated w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-card-foreground">My Study Plans</h2>
              <button
                onClick={() => setShowExistingPlans(false)}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors duration-150"
              >
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 overflow-y-auto">
              {existingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="border border-border rounded-lg p-4 hover:border-primary/50 cursor-pointer transition-all duration-150"
                  onClick={() => handleExistingPlanClick(plan)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-card-foreground">{plan.name}</h3>
                    {plan.isActive && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-md border border-success/20">
                        Active
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>📅 Exam: {new Date(plan.examDate).toLocaleDateString()}</span>
                      <span>📚 {plan.subjects.length} subjects</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-card-foreground font-medium">{plan.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${plan.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {existingPlans.length === 0 && (
                <div className="text-center py-8">
                  <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No study plans found</p>
                  <p className="text-sm text-muted-foreground">Create your first plan to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading Animation */}
      <LoadingAnimation isVisible={currentStep === 'generating'} />

      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default StudyPlanGenerator;