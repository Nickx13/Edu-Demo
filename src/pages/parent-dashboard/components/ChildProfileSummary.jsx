import React from 'react';
import Icon from '../../../components/AppIcon';

const ChildProfileSummary = ({ child }) => {
  const stats = [
    {
      label: "Current Streak",
      value: "12 days",
      icon: "Flame",
      color: "text-accent"
    },
    {
      label: "Weekly Hours",
      value: "18.5 hrs",
      icon: "Clock",
      color: "text-primary"
    },
    {
      label: "XP Points",
      value: "2,450",
      icon: "Star",
      color: "text-warning"
    },
    {
      label: "Rank",
      value: "#3",
      icon: "Trophy",
      color: "text-secondary"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={child.avatar}
          alt={child.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">{child.name}</h3>
          <p className="text-muted-foreground">{child.class} • CBSE Board</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-success">Active now</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-3 bg-muted rounded-lg">
            <Icon name={stat.icon} size={20} className={`mx-auto mb-2 ${stat.color}`} />
            <p className="text-lg font-semibold text-card-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <button className="w-full flex items-center justify-center space-x-2 p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150">
          <Icon name="MessageCircle" size={16} />
          <span>Message Child</span>
        </button>
        <button className="w-full flex items-center justify-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted transition-colors duration-150">
          <Icon name="Settings" size={16} />
          <span>Study Settings</span>
        </button>
      </div>
    </div>
  );
};

export default ChildProfileSummary;