import React, { useState, useEffect, useRef } from 'react';
import { ChatProvider, useChat } from './ChatContext';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import Icon from '../../components/AppIcon';
import MessageBubble from './components/MessageBubble';
import QuickSuggestions from './components/QuickSuggestions';
import VoiceInput from './components/VoiceInput';
import ImageUpload from './components/ImageUpload';
import ConversationSidebar from './components/ConversationSidebar';

const AIChatTutor = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputText, setInputText] = useState('');
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceTranscript = (transcript) => {
    sendMessage(transcript);
    setShowVoiceInput(false);
  };

  const handleImageUpload = (imageData) => {
    sendMessage({
      text: `I uploaded an image: ${imageData.extractedText}`,
      image: imageData.image
    });
    setShowImageUpload(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-screen pt-14 pb-16">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">AI Tutor</h1>
                <p className="text-sm text-muted-foreground">
                  Always here to help you learn
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowSidebar(true)}
              className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center lg:hidden"
            >
              <Icon name="Menu" size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                message={message}
                isUser={message.isUser}
              />
            ))}
            
            {isLoading && (
              <MessageBubble isTyping isUser={false} />
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions - Only show when chat is empty */}
          {messages.length === 0 && <QuickSuggestions />}

          {/* Input Area */}
          <div className="border-t border-border bg-card p-4">
            <div className="flex items-end gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 min-h-[44px] px-4 py-3 bg-muted rounded-2xl focus:outline-none"
                rows={1}
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowVoiceInput(true)}
                  className="w-11 h-11 bg-secondary rounded-full flex items-center justify-center"
                >
                  <Icon name="Mic" size={20} className="text-secondary-foreground" />
                </button>
                
                <button
                  onClick={() => setShowImageUpload(true)}
                  className="w-11 h-11 bg-accent rounded-full flex items-center justify-center"
                >
                  <Icon name="Camera" size={20} className="text-accent-foreground" />
                </button>
                
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="w-11 h-11 bg-primary rounded-full flex items-center justify-center disabled:bg-muted"
                >
                  <Icon name="Send" size={20} className="text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <ConversationSidebar
            isOpen
            onClose={() => {}}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <ConversationSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
      />

      {/* Modals */}
      <VoiceInput
        isActive={showVoiceInput}
        onTranscript={handleVoiceTranscript}
        onToggle={() => setShowVoiceInput(false)}
      />
      
      <ImageUpload
        isOpen={showImageUpload}
        onClose={() => setShowImageUpload(false)}
        onImageUpload={handleImageUpload}
      />

      <BottomNavigation />
    </div>
  );
};

export default function AIChatTutorWrapper() {
  return (
    <ChatProvider>
      <AIChatTutor />
    </ChatProvider>
  );
}