import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ChildSelector = ({ selectedChild, onChildChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const children = [
    {
      id: 1,
      name: "Aarav Sharma",
      class: "Class 10",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "active"
    },
    {
      id: 2,
      name: "Priya Sharma",
      class: "Class 8",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "active"
    }
  ];

  const handleChildSelect = (child) => {
    onChildChange(child);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors duration-150 w-full"
      >
        <img
          src={selectedChild.avatar}
          alt={selectedChild.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 text-left">
          <p className="font-medium text-card-foreground">{selectedChild.name}</p>
          <p className="text-sm text-muted-foreground">{selectedChild.class}</p>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => handleChildSelect(child)}
              className={`w-full flex items-center space-x-3 p-3 hover:bg-muted transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                selectedChild.id === child.id ? 'bg-muted' : ''
              }`}
            >
              <img
                src={child.avatar}
                alt={child.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 text-left">
                <p className="font-medium text-popover-foreground">{child.name}</p>
                <p className="text-sm text-muted-foreground">{child.class}</p>
              </div>
              {selectedChild.id === child.id && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ChildSelector;