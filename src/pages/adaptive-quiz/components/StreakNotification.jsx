import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StreakNotification = ({ show, message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const getNotificationStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Star';
    }
  };

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-150 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
    }`}>
      <div className={`${getNotificationStyle()} rounded-lg px-4 py-3 shadow-elevated flex items-center space-x-3 min-w-[200px]`}>
        <Icon name={getIcon()} size={20} />
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};

export default StreakNotification;