import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { useChat } from '../ChatContext.jsx'; // Add this import

const MessageBubble = ({ message, isUser }) => {
  const { isLoading } = useChat(); // Get loading state from context

  // Your existing timestamp formatter
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return messageTime.toLocaleDateString();
  };

  // Typing indicator for AI responses
  if (!isUser && isLoading && !message) {
    return (
      <div className="flex items-end space-x-2 mb-4">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Bot" size={16} className="text-primary-foreground" />
        </div>
        <div className="bg-muted rounded-bl-md rounded-2xl px-4 py-3">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs text-muted-foreground ml-2">Buddy is thinking...</span>
          </div>
        </div>
      </div>
    );
  }

  // Your existing message rendering (unchanged)
  return (
    <div className={`flex items-end space-x-2 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} className="text-primary-foreground" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-muted text-foreground rounded-bl-md'
          }`}
        >
          <div className="space-y-2">
            {/* Image display (unchanged) */}
            {message.image && (
              <div className="rounded-lg overflow-hidden max-w-xs">
                <Image 
                  src={message.image} 
                  alt="Uploaded image" 
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            {/* Extracted text (unchanged) */}
            {message.extractedText && (
              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Extracted text:</p>
                <p className="text-sm">{message.extractedText}</p>
              </div>
            )}
            
            {/* Main content (now uses message.text instead of message.content) */}
            <div className="prose prose-sm max-w-none">
              {message.text?.split('\n').map((line, index) => (
                <p key={index} className="mb-2 last:mb-0">{line}</p>
              ))}
            </div>

            {/* Code snippet (unchanged) */}
            {message.codeSnippet && (
              <div className="bg-gray-900 rounded-lg p-3 mt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Code</span>
                  <button className="text-xs text-gray-400 hover:text-white transition-colors">
                    Copy
                  </button>
                </div>
                <pre className="text-sm text-green-400 overflow-x-auto">
                  <code>{message.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Steps (unchanged) */}
            {message.steps && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium text-foreground">Step-by-step solution:</p>
                {message.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground flex-1">{step}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Timestamp (unchanged) */}
        <div className={`flex items-center mt-1 space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(message.timestamp)}
          </span>
          {isUser && (
            <Icon 
              name="Check" 
              size={12} 
              className={`${message.read ? 'text-primary' : 'text-muted-foreground'}`} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;