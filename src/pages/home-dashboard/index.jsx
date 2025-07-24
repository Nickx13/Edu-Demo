import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import WelcomeBanner from './components/WelcomeBanner';
import StreakCard from './components/StreakCard';
import TodayStudyPlan from './components/TodayStudyPlan';
import RecentDoubts from './components/RecentDoubts';
import QuickQuizSuggestions from './components/QuickQuizSuggestions';
import PerformanceSummary from './components/PerformanceSummary';
import QuickActions from './components/QuickActions';
import UpcomingDeadlines from './components/UpcomingDeadlines';

const HomeDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock data for the dashboard
  const studentData = {
    name: "Arjun Sharma",
    currentStreak: 12,
    longestStreak: 28,
    xpPoints: 2450,
    dailyGoalProgress: {
      completed: 3,
      total: 5
    }
  };

  const achievements = [
    { emoji: '🔥', title: 'Week Warrior' },
    { emoji: '📚', title: 'Study Master' },
    { emoji: '🎯', title: 'Goal Crusher' },
    { emoji: '⭐', title: 'Star Student' }
  ];

  const todayStudyPlan = {
    tasks: [
      {
        id: 1,
        subject: 'Mathematics',
        topic: 'Quadratic Equations',
        duration: '45 min',
        type: 'Practice',
        priority: 'high'
      },
      {
        id: 2,
        subject: 'Physics',
        topic: 'Laws of Motion',
        duration: '30 min',
        type: 'Revision',
        priority: 'medium'
      },
      {
        id: 3,
        subject: 'Chemistry',
        topic: 'Periodic Table',
        duration: '25 min',
        type: 'Quiz',
        priority: 'low'
      },
      {
        id: 4,
        subject: 'English',
        topic: 'Essay Writing',
        duration: '40 min',
        type: 'Practice',
        priority: 'medium'
      }
    ]
  };

  const recentDoubts = [
    {
      id: 1,
      subject: 'Mathematics',
      question: 'How to solve quadratic equations using factorization method?',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      timestamp: new Date(Date.now() - 1800000),
      solveTime: '3 min'
    },
    {
      id: 2,
      subject: 'Physics',
      question: 'Explain Newton\'s third law with examples',
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop',
      timestamp: new Date(Date.now() - 7200000),
      solveTime: '5 min'
    },
    {
      id: 3,
      subject: 'Chemistry',
      question: 'What are the properties of noble gases?',
      thumbnail: null,
      timestamp: new Date(Date.now() - 14400000),
      solveTime: '4 min'
    }
  ];

  const quizSuggestions = [
    {
      id: 1,
      title: 'Algebra Basics',
      subject: 'Mathematics',
      difficulty: 'medium',
      questionCount: 15,
      estimatedTime: '20 min',
      xpReward: 150,
      isRecommended: true
    },
    {
      id: 2,
      title: 'Force and Motion',
      subject: 'Physics',
      difficulty: 'hard',
      questionCount: 12,
      estimatedTime: '18 min',
      xpReward: 200,
      isRecommended: false
    },
    {
      id: 3,
      title: 'Chemical Bonding',
      subject: 'Chemistry',
      difficulty: 'easy',
      questionCount: 10,
      estimatedTime: '15 min',
      xpReward: 100,
      isRecommended: true
    }
  ];

  const weakAreas = ['Quadratic Equations', 'Organic Chemistry', 'Essay Structure'];

  const performanceData = {
    week: {
      averageScore: 78,
      studyHours: 24,
      subjects: [
        { name: 'Mathematics', score: 85 },
        { name: 'Physics', score: 72 },
        { name: 'Chemistry', score: 80 },
        { name: 'Biology', score: 75 },
        { name: 'English', score: 88 }
      ]
    },
    month: {
      averageScore: 82,
      studyHours: 96,
      subjects: [
        { name: 'Mathematics', score: 88 },
        { name: 'Physics', score: 78 },
        { name: 'Chemistry', score: 83 },
        { name: 'Biology', score: 79 },
        { name: 'English', score: 90 }
      ]
    },
    quarter: {
      averageScore: 80,
      studyHours: 288,
      subjects: [
        { name: 'Mathematics', score: 86 },
        { name: 'Physics', score: 76 },
        { name: 'Chemistry', score: 81 },
        { name: 'Biology', score: 77 },
        { name: 'English', score: 89 }
      ]
    }
  };

  const weeklyProgress = [
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 5 },
    { day: 'Thu', hours: 2 },
    { day: 'Fri', hours: 4 },
    { day: 'Sat', hours: 3 },
    { day: 'Sun', hours: 3 }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Mathematics Unit Test',
      subject: 'Mathematics',
      type: 'exam',
      date: new Date(Date.now() + 86400000 * 2),
      time: '10:00 AM',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      subject: 'Physics',
      type: 'assignment',
      date: new Date(Date.now() + 86400000 * 5),
      time: '11:59 PM',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'English Essay Submission',
      subject: 'English',
      type: 'assignment',
      date: new Date(Date.now() + 86400000 * 7),
      time: '2:00 PM',
      priority: 'low'
    }
  ];

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Handle task completion
  const handleTaskComplete = (taskId, isCompleted) => {
    console.log(`Task ${taskId} ${isCompleted ? 'completed' : 'uncompleted'}`);
    // Update task completion status
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-14 pb-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Pull to refresh indicator */}
          {isRefreshing && (
            <div className="fixed top-14 left-0 right-0 bg-primary text-primary-foreground text-center py-2 z-50">
              <span className="text-sm">Refreshing dashboard...</span>
            </div>
          )}

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            <WelcomeBanner 
              studentName={studentData.name}
              dailyGoalProgress={studentData.dailyGoalProgress}
              currentStreak={studentData.currentStreak}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StreakCard 
                currentStreak={studentData.currentStreak}
                longestStreak={studentData.longestStreak}
                achievements={achievements}
              />
              <QuickActions />
            </div>

            <TodayStudyPlan 
              studyPlan={todayStudyPlan}
              onTaskComplete={handleTaskComplete}
            />

            <RecentDoubts doubts={recentDoubts} />

            <QuickQuizSuggestions 
              quizSuggestions={quizSuggestions}
              weakAreas={weakAreas}
            />

            <PerformanceSummary 
              performanceData={performanceData}
              weeklyProgress={weeklyProgress}
            />

            <UpcomingDeadlines deadlines={upcomingDeadlines} />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-6">
              {/* Main Content */}
              <div className="col-span-8 space-y-6">
                <WelcomeBanner 
                  studentName={studentData.name}
                  dailyGoalProgress={studentData.dailyGoalProgress}
                  currentStreak={studentData.currentStreak}
                />

                <div className="grid grid-cols-2 gap-6">
                  <TodayStudyPlan 
                    studyPlan={todayStudyPlan}
                    onTaskComplete={handleTaskComplete}
                  />
                  <RecentDoubts doubts={recentDoubts} />
                </div>

                <QuickQuizSuggestions 
                  quizSuggestions={quizSuggestions}
                  weakAreas={weakAreas}
                />
              </div>

              {/* Sidebar */}
              <div className="col-span-4 space-y-6">
                <StreakCard 
                  currentStreak={studentData.currentStreak}
                  longestStreak={studentData.longestStreak}
                  achievements={achievements}
                />

                <QuickActions />

                <PerformanceSummary 
                  performanceData={performanceData}
                  weeklyProgress={weeklyProgress}
                />

                <UpcomingDeadlines deadlines={upcomingDeadlines} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default HomeDashboard;