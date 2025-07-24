import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    chat: 2,
    solve: 0,
    quiz: 1,
    plan: 0,
  });

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/home-dashboard',
      icon: 'Home',
      activeIcon: 'Home',
    },
    {
      id: 'chat',
      label: 'Chat',
      path: '/ai-chat-tutor',
      icon: 'MessageCircle',
      activeIcon: 'MessageCircle',
      badge: notifications.chat,
    },
    {
      id: 'solve',
      label: 'Solve',
      path: '/doubt-solver',
      icon: 'Camera',
      activeIcon: 'Camera',
      badge: notifications.solve,
    },
    {
      id: 'quiz',
      label: 'Quiz',
      path: '/adaptive-quiz',
      icon: 'Brain',
      activeIcon: 'Brain',
      badge: notifications.quiz,
    },
    {
      id: 'plan',
      label: 'Plan',
      path: '/study-plan-generator',
      icon: 'Calendar',
      activeIcon: 'Calendar',
      badge: notifications.plan,
    },
  ];

  const handleNavigation = (item) => {
    navigate(item.path);
    
    // Clear notification badge when navigating to that section
    if (item.badge > 0) {
      setNotifications(prev => ({
        ...prev,
        [item.id]: 0,
      }));
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Simulate receiving new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add notifications for demo purposes
      const sections = ['chat', 'solve', 'quiz', 'plan'];
      const randomSection = sections[Math.floor(Math.random() * sections.length)];
      
      if (Math.random() > 0.8) { // 20% chance every 30 seconds
        setNotifications(prev => ({
          ...prev,
          [randomSection]: prev[randomSection] + 1,
        }));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-90">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems.map((item) => {
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`relative flex flex-col items-center justify-center min-w-[60px] h-12 px-2 rounded-lg transition-all duration-200 animation-ease-out ${
                active
                  ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {/* Icon with badge */}
              <div className="relative">
                <Icon
                  name={active ? item.activeIcon : item.icon}
                  size={20}
                  className={`transition-colors duration-150 ${
                    active ? 'text-primary' : 'text-current'
                  }`}
                />
                
                {/* Notification Badge */}
                {item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
                    {item.badge > 9 ? '9+' : item.badge}
                  </div>
                )}
              </div>
              
              {/* Label */}
              <span
                className={`text-xs font-medium mt-0.5 transition-colors duration-150 ${
                  active ? 'text-primary' : 'text-current'
                }`}
              >
                {item.label}
              </span>
              
              {/* Active Indicator */}
              {active && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;