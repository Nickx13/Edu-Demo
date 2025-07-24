import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import QuizHeader from './components/QuizHeader';
import TopicSelector from './components/TopicSelector';
import QuizQuestion from './components/QuizQuestion';
import QuizResults from './components/QuizResults';
import PauseModal from './components/PauseModal';
import StreakNotification from './components/StreakNotification';

const AdaptiveQuiz = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState('selection'); // 'selection', 'active', 'paused', 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [isPaused, setIsPaused] = useState(false);
  const [quizConfig, setQuizConfig] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [streakNotification, setStreakNotification] = useState({ show: false, message: '', type: 'success' });

  // Mock quiz data
  const mockQuestions = [
    {
      id: 1,
      text: "What is the value of x in the equation 2x + 5 = 13?",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      correctAnswer: "B",
      explanation: "To solve 2x + 5 = 13, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
      difficulty: "medium",
      topic: "algebra"
    },
    {
      id: 2,
      text: "Which of the following is a prime number?",
      options: ["15", "17", "21", "25"],
      correctAnswer: "B",
      explanation: "17 is a prime number because it can only be divided by 1 and itself without remainder",
      difficulty: "easy",
      topic: "arithmetic"
    },
    {
      id: 3,
      text: "What is the area of a rectangle with length 8 cm and width 5 cm?",
      options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"],
      correctAnswer: "C",
      explanation: "Area of rectangle = length × width = 8 × 5 = 40 cm²",
      difficulty: "easy",
      topic: "geometry"
    },
    {
      id: 4,
      text: "Simplify: (3x + 2) + (5x - 4)",
      options: ["8x - 2", "8x + 2", "2x - 2", "2x + 6"],
      correctAnswer: "A",
      explanation: "Combine like terms: 3x + 5x = 8x and 2 + (-4) = -2, so the answer is 8x - 2",
      difficulty: "medium",
      topic: "algebra"
    },
    {
      id: 5,
      text: "What is 15% of 200?",
      options: ["25", "30", "35", "40"],
      correctAnswer: "B",
      explanation: "15% of 200 = (15/100) × 200 = 0.15 × 200 = 30",
      difficulty: "medium",
      topic: "arithmetic"
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (quizState === 'active' && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizState, isPaused, timeRemaining]);

  const handleStartQuiz = (config) => {
    setQuizConfig(config);
    setQuizState('active');
    setCurrentQuestion(0);
    setUserAnswers([]);
    setTimeRemaining(config.estimatedQuestions * 120); // 2 minutes per question
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    const question = mockQuestions[currentQuestion];
    const isCorrect = answer === question.correctAnswer;
    
    // Update user answers
    const newAnswer = {
      questionId: question.id,
      selectedAnswer: answer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      timeSpent: (quizConfig.estimatedQuestions * 120) - timeRemaining
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    
    // Show result after a brief delay
    setTimeout(() => {
      setShowResult(true);
      
      // Show streak notification for correct answers
      if (isCorrect) {
        const consecutiveCorrect = userAnswers.filter(a => a.isCorrect).length + 1;
        if (consecutiveCorrect > 1) {
          setStreakNotification({
            show: true,
            message: `${consecutiveCorrect} in a row! 🔥`,
            type: 'success'
          });
        }
      }
    }, 500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const accuracy = Math.round((correctAnswers / userAnswers.length) * 100);
    const xpEarned = Math.floor(correctAnswers * 20 * (quizConfig?.difficulty === 'hard' ? 2 : quizConfig?.difficulty === 'medium' ? 1.5 : 1));
    
    const results = {
      score: correctAnswers,
      totalQuestions: mockQuestions.length,
      correctAnswers,
      timeSpent: (quizConfig?.estimatedQuestions * 120) - timeRemaining,
      xpEarned,
      accuracy,
      topicBreakdown: [
        { name: 'Algebra', correct: 2, total: 2, accuracy: 100 },
        { name: 'Arithmetic', correct: 1, total: 2, accuracy: 50 },
        { name: 'Geometry', correct: 1, total: 1, accuracy: 100 }
      ],
      recommendations: [
        {
          title: "Practice Arithmetic",
          description: "Focus on percentage calculations and basic operations"
        },
        {
          title: "Review Algebra Concepts",
          description: "You're doing well! Keep practicing equation solving"
        }
      ],
      previousAttempts: [
        { date: "2025-01-15", score: 85, xp: 170 },
        { date: "2025-01-10", score: 70, xp: 140 }
      ],
      leaderboard: [
        { name: "Priya Sharma", score: 95, xp: 1250, isCurrentUser: false },
        { name: "Arjun Patel", score: 90, xp: 1180, isCurrentUser: false },
        { name: "You", score: accuracy, xp: xpEarned, isCurrentUser: true },
        { name: "Sneha Reddy", score: 85, xp: 1050, isCurrentUser: false },
        { name: "Rahul Kumar", score: 80, xp: 980, isCurrentUser: false }
      ]
    };
    
    setQuizState('results');
  };

  const handlePause = () => {
    setIsPaused(true);
    setQuizState('paused');
  };

  const handleResume = () => {
    setIsPaused(false);
    setQuizState('active');
  };

  const handleExit = () => {
    navigate('/home-dashboard');
  };

  const handleRetakeQuiz = () => {
    setQuizState('active');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers([]);
    setTimeRemaining(quizConfig.estimatedQuestions * 120);
  };

  const handleNewQuiz = () => {
    setQuizState('selection');
    setQuizConfig(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers([]);
  };

  const closeStreakNotification = () => {
    setStreakNotification({ show: false, message: '', type: 'success' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {quizState === 'selection' && (
        <div className="pt-14 pb-20">
          <TopicSelector onStartQuiz={handleStartQuiz} />
        </div>
      )}

      {(quizState === 'active' || quizState === 'paused') && (
        <>
          <QuizHeader
            currentQuestion={currentQuestion + 1}
            totalQuestions={mockQuestions.length}
            timeRemaining={timeRemaining}
            onPause={handlePause}
            onExit={handleExit}
            isPaused={isPaused}
          />
          <div className="pt-20 pb-20">
            <QuizQuestion
              question={mockQuestions[currentQuestion]}
              onAnswer={handleAnswer}
              showResult={showResult}
              selectedAnswer={selectedAnswer}
              correctAnswer={mockQuestions[currentQuestion]?.correctAnswer}
              explanation={mockQuestions[currentQuestion]?.explanation}
              onNext={handleNextQuestion}
              isLastQuestion={currentQuestion === mockQuestions.length - 1}
            />
          </div>
        </>
      )}

      {quizState === 'results' && (
        <div className="pt-14 pb-20">
          <QuizResults
            results={{
              score: userAnswers.filter(a => a.isCorrect).length,
              totalQuestions: mockQuestions.length,
              correctAnswers: userAnswers.filter(a => a.isCorrect).length,
              timeSpent: (quizConfig?.estimatedQuestions * 120) - timeRemaining,
              xpEarned: Math.floor(userAnswers.filter(a => a.isCorrect).length * 20),
              accuracy: Math.round((userAnswers.filter(a => a.isCorrect).length / userAnswers.length) * 100),
              topicBreakdown: [
                { name: 'Algebra', correct: 2, total: 2, accuracy: 100 },
                { name: 'Arithmetic', correct: 1, total: 2, accuracy: 50 },
                { name: 'Geometry', correct: 1, total: 1, accuracy: 100 }
              ],
              recommendations: [
                {
                  title: "Practice Arithmetic",
                  description: "Focus on percentage calculations and basic operations"
                },
                {
                  title: "Review Algebra Concepts", 
                  description: "You're doing well! Keep practicing equation solving"
                }
              ],
              previousAttempts: [
                { date: "2025-01-15", score: 85, xp: 170 },
                { date: "2025-01-10", score: 70, xp: 140 }
              ],
              leaderboard: [
                { name: "Priya Sharma", score: 95, xp: 1250, isCurrentUser: false },
                { name: "Arjun Patel", score: 90, xp: 1180, isCurrentUser: false },
                { name: "You", score: Math.round((userAnswers.filter(a => a.isCorrect).length / userAnswers.length) * 100), xp: Math.floor(userAnswers.filter(a => a.isCorrect).length * 20), isCurrentUser: true },
                { name: "Sneha Reddy", score: 85, xp: 1050, isCurrentUser: false },
                { name: "Rahul Kumar", score: 80, xp: 980, isCurrentUser: false }
              ]
            }}
            onRetakeQuiz={handleRetakeQuiz}
            onNewQuiz={handleNewQuiz}
          />
        </div>
      )}

      <PauseModal
        isOpen={quizState === 'paused'}
        onResume={handleResume}
        onExit={handleExit}
        timeRemaining={timeRemaining}
        currentQuestion={currentQuestion + 1}
        totalQuestions={mockQuestions.length}
      />

      <StreakNotification
        show={streakNotification.show}
        message={streakNotification.message}
        type={streakNotification.type}
        onClose={closeStreakNotification}
      />

      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default AdaptiveQuiz;