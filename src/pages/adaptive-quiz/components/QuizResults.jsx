import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizResults = ({ results, onRetakeQuiz, onNewQuiz }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const {
    score,
    totalQuestions,
    correctAnswers,
    timeSpent,
    xpEarned,
    accuracy,
    topicBreakdown,
    recommendations,
    previousAttempts,
    leaderboard
  } = results;

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Outstanding! 🌟";
    if (accuracy >= 80) return "Excellent work! 🎉";
    if (accuracy >= 70) return "Good job! 👍";
    if (accuracy >= 60) return "Keep practicing! 💪";
    return "Don't give up! 🚀";
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'breakdown', name: 'Breakdown', icon: 'PieChart' },
    { id: 'leaderboard', name: 'Leaderboard', icon: 'Trophy' }
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header with Celebration */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Trophy" size={40} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Quiz Complete!</h1>
            <p className="text-lg text-muted-foreground">{getPerformanceMessage()}</p>
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getPerformanceColor(accuracy)}`}>
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getPerformanceColor(accuracy)}`}>
                {accuracy}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">
                +{xpEarned}
              </div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">
                {formatTime(timeSpent)}
              </div>
              <div className="text-sm text-muted-foreground">Time Taken</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-lg border border-border">
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 transition-colors duration-150 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="text-sm font-medium">{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Performance Analysis */}
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Performance Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Strong Areas</span>
                      <div className="flex space-x-2">
                        {topicBreakdown.filter(t => t.accuracy >= 80).map((topic, index) => (
                          <span key={index} className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                            {topic.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Needs Practice</span>
                      <div className="flex space-x-2">
                        {topicBreakdown.filter(t => t.accuracy < 60).map((topic, index) => (
                          <span key={index} className="px-2 py-1 bg-error/10 text-error text-xs rounded-full">
                            {topic.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
                        <div>
                          <div className="font-medium text-card-foreground">{rec.title}</div>
                          <div className="text-sm text-muted-foreground">{rec.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'breakdown' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Topic-wise Performance</h3>
                {topicBreakdown.map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-card-foreground">{topic.name}</span>
                      <span className={`font-medium ${getPerformanceColor(topic.accuracy)}`}>
                        {topic.correct}/{topic.total} ({topic.accuracy}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          topic.accuracy >= 80 ? 'bg-success' :
                          topic.accuracy >= 60 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${topic.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Top Performers</h3>
                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      user.isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'bg-muted'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-warning text-warning-foreground' :
                        index === 1 ? 'bg-muted-foreground text-background' :
                        index === 2 ? 'bg-accent text-accent-foreground': 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-card-foreground">
                          {user.name} {user.isCurrentUser && '(You)'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.score}% • {user.xp} XP
                        </div>
                      </div>
                      {index < 3 && (
                        <Icon 
                          name="Trophy" 
                          size={16} 
                          className={
                            index === 0 ? 'text-warning' :
                            index === 1 ? 'text-muted-foreground': 'text-accent'
                          } 
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={onRetakeQuiz}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Retake Quiz
          </Button>
          <Button
            variant="outline"
            onClick={onNewQuiz}
            iconName="Plus"
            iconPosition="left"
          >
            New Quiz
          </Button>
          <Button
            onClick={() => navigate('/home-dashboard')}
            iconName="Home"
            iconPosition="left"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;