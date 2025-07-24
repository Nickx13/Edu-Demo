import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import ChildSelector from './components/ChildSelector';
import ChildProfileSummary from './components/ChildProfileSummary';
import PerformanceChart from './components/PerformanceChart';
import WeakAreasPanel from './components/WeakAreasPanel';
import ScreenTimeMonitor from './components/ScreenTimeMonitor';
import WeeklyProgressReport from './components/WeeklyProgressReport';
import CommunicationCenter from './components/CommunicationCenter';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState({
    id: 1,
    name: "Aarav Sharma",
    class: "Class 10",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    status: "active"
  });
  const [activeView, setActiveView] = useState('overview');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const quickStats = [
    {
      title: "Today\'s Study Time",
      value: "3h 45m",
      target: "4h",
      icon: "Clock",
      color: "text-primary",
      progress: 94
    },
    {
      title: "Weekly Average",
      value: "87%",
      change: "+5%",
      icon: "TrendingUp",
      color: "text-success",
      progress: 87
    },
    {
      title: "Assignments Pending",
      value: "2",
      total: "10",
      icon: "FileText",
      color: "text-warning",
      progress: 80
    },
    {
      title: "Current Streak",
      value: "12 days",
      icon: "Flame",
      color: "text-accent",
      progress: 100
    }
  ];

  const navigationViews = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'performance', label: 'Performance', icon: 'BarChart3' },
    { id: 'screen-time', label: 'Screen Time', icon: 'Smartphone' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' },
    { id: 'communication', label: 'Messages', icon: 'MessageCircle' }
  ];

  const handleChildChange = (child) => {
    setSelectedChild(child);
  };

  const handleBackToStudent = () => {
    navigate('/home-dashboard');
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'performance':
        return (
          <div className="space-y-6">
            <PerformanceChart />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <PerformanceChart />
              </div>
              <div>
                <WeakAreasPanel />
              </div>
            </div>
          </div>
        );
      case 'screen-time':
        return <ScreenTimeMonitor />;
      case 'progress':
        return <WeeklyProgressReport />;
      case 'communication':
        return <CommunicationCenter />;
      default:
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon name={stat.icon} size={20} className={stat.color} />
                    {stat.change && (
                      <span className="text-xs text-success font-medium">{stat.change}</span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-card-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  {stat.target && (
                    <p className="text-xs text-muted-foreground mt-1">Target: {stat.target}</p>
                  )}
                  {stat.total && (
                    <p className="text-xs text-muted-foreground mt-1">of {stat.total} total</p>
                  )}
                  <div className="w-full bg-border rounded-full h-2 mt-3">
                    <div 
                      className={`h-2 rounded-full ${
                        stat.progress >= 90 ? 'bg-success' :
                        stat.progress >= 70 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left Sidebar */}
              <div className="xl:col-span-3 space-y-6">
                <ChildProfileSummary child={selectedChild} />
              </div>

              {/* Center Content */}
              <div className="xl:col-span-6 space-y-6">
                <PerformanceChart />
                <CommunicationCenter />
              </div>

              {/* Right Panel */}
              <div className="xl:col-span-3 space-y-6">
                <WeakAreasPanel />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Parent Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToStudent}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
              >
                <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-card-foreground">Parent Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Monitor & Support Learning</p>
                </div>
              </div>
            </div>

            {/* Child Selector */}
            <div className="flex items-center space-x-4">
              <div className="w-64 hidden lg:block">
                <ChildSelector 
                  selectedChild={selectedChild} 
                  onChildChange={handleChildChange} 
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 hover:bg-muted rounded-lg transition-colors duration-150">
                <Icon name="Bell" size={20} className="text-muted-foreground" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></div>
              </button>

              {/* Settings */}
              <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-150">
                <Icon name="Settings" size={20} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Child Selector */}
      <div className="lg:hidden bg-card border-b border-border p-4">
        <ChildSelector 
          selectedChild={selectedChild} 
          onChildChange={handleChildChange} 
        />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {navigationViews.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                  activeView === view.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-card-foreground hover:bg-muted'
                }`}
              >
                <Icon name={view.icon} size={16} />
                <span>{view.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderMainContent()}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">
                Secure Parent Dashboard • Data Protected
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <button className="hover:text-card-foreground transition-colors duration-150">
                Privacy Policy
              </button>
              <button className="hover:text-card-foreground transition-colors duration-150">
                Support
              </button>
              <span>© {new Date().getFullYear()} EduMitra AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ParentDashboard;