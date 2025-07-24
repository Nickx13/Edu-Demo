import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const FloatingActionButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);

  // Determine the action based on current page
  const getActionConfig = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/ai-chat-tutor':
        return {
          icon: 'Mic',
          action: 'voice',
          tooltip: 'Voice input',
          color: 'bg-secondary',
        };
      case '/doubt-solver':
        return {
          icon: 'MessageCircle',
          action: 'chat',
          tooltip: 'Ask AI tutor',
          color: 'bg-primary',
        };
      case '/adaptive-quiz':
        return {
          icon: 'Camera',
          action: 'camera',
          tooltip: 'Scan question',
          color: 'bg-accent',
        };
      case '/study-plan-generator':
        return {
          icon: 'Plus',
          action: 'add',
          tooltip: 'Add study goal',
          color: 'bg-success',
        };
      case '/home-dashboard':
        return {
          icon: 'Camera',
          action: 'camera',
          tooltip: 'Quick solve',
          color: 'bg-primary',
        };
      default:
        return {
          icon: 'Camera',
          action: 'camera',
          tooltip: 'Quick solve',
          color: 'bg-primary',
        };
    }
  };

  const config = getActionConfig();

  const handleAction = () => {
    setIsPressed(true);
    
    setTimeout(() => {
      setIsPressed(false);
    }, 150);

    switch (config.action) {
      case 'voice':
        // Handle voice input
        console.log('Starting voice input...');
        break;
      case 'chat': navigate('/ai-chat-tutor');
        break;
      case 'camera':
        if (location.pathname !== '/doubt-solver') {
          navigate('/doubt-solver');
        } else {
          // Trigger camera action
          console.log('Opening camera...');
        }
        break;
      case 'add':
        // Handle add study goal
        console.log('Adding new study goal...');
        break;
      default:
        navigate('/doubt-solver');
    }
  };

  // Hide FAB on parent dashboard
  if (location.pathname === '/parent-dashboard') {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-80">
      <button
        onClick={handleAction}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={`
          relative w-14 h-14 rounded-full shadow-elevated hover:shadow-lg
          transition-all duration-200 animation-ease-out
          ${config.color} hover:scale-105 active:scale-95
          ${isPressed ? 'scale-95' : ''}
          group
          flex items-center justify-center
        `}
        aria-label={config.tooltip}
      >
        <Icon
          name={config.icon}
          size={24}
          className="text-white transition-transform duration-150 group-hover:scale-110"
        />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {config.tooltip}
          <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900" />
        </div>
      </button>
    </div>
  );
};

export default FloatingActionButton;