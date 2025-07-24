import { createContext, useState, useContext } from 'react';
import { ApiService } from './ApiService.js';

// 1. Create Context
const ChatContext = createContext();

// 2. Create Provider
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (userInput) => {
    // Add user message immediately
    setMessages(prev => [...prev, {
      text: userInput,
      isUser: true,
      timestamp: new Date().toISOString()
    }]);
    
    setIsLoading(true);
    
    try {
      // Get AI response
      const aiResponse = await ApiService.sendMessage(userInput);
      
      // Add AI response
      setMessages(prev => [...prev, {
        text: aiResponse,
        isUser: false,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, {
        text: "Buddy is resting! Try again soon 😴",
        isUser: false,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};

// 3. Create useChat hook for easy access
export const useChat = () => useContext(ChatContext);