import React from 'react';
import Icon from '../../../components/AppIcon';
import { useChat } from '../ChatContext.jsx'; // Import the chat context

const QuickSuggestions = () => {
  const { sendMessage } = useChat(); // Get sendMessage from context

  // English-only suggestions
  const suggestions = [
    { id: 1, text: "Explain this concept", icon: "BookOpen" },
    { id: 2, text: "Solve this problem", icon: "Calculator" },
    { id: 3, text: "Give me examples", icon: "Lightbulb" },
    { id: 4, text: "Practice questions", icon: "PenTool" },
    { id: 5, text: "Summary notes", icon: "FileText" },
  ];

  return (
    <div className="px-4 py-2">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => sendMessage(suggestion.text)} // Use sendMessage directly
            className="flex items-center space-x-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm text-foreground transition-colors duration-150 border border-border"
          >
            <Icon name={suggestion.icon} size={14} className="text-muted-foreground" />
            <span>{suggestion.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickSuggestions;