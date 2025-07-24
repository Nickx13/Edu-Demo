import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ConversationSidebar = ({ isOpen, onClose, currentLanguage }) => {
  const [activeTab, setActiveTab] = useState('history');

  const conversationHistory = [
    {
      id: 1,
      title: "Quadratic Equations",
      lastMessage: "What is the formula for quadratic equation?",
      timestamp: new Date(Date.now() - 3600000),
      messageCount: 12,
    },
    {
      id: 2,
      title: "Photosynthesis Process",
      lastMessage: "Explain the process of photosynthesis",
      timestamp: new Date(Date.now() - 7200000),
      messageCount: 8,
    },
    {
      id: 3,
      title: "Indian History",
      lastMessage: "Tell me about Mughal Empire",
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 15,
    },
    {
      id: 4,
      title: "Chemical Bonding",
      lastMessage: "Types of chemical bonds",
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 6,
    },
  ];

  const savedExplanations = [
    {
      id: 1,
      title: "Pythagorean Theorem",
      subject: "Mathematics",
      savedAt: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      title: "Newton\'s Laws",
      subject: "Physics",
      savedAt: new Date(Date.now() - 7200000),
    },
    {
      id: 3,
      title: "Periodic Table",
      subject: "Chemistry",
      savedAt: new Date(Date.now() - 86400000),
    },
  ];

  const relatedTopics = [
    { id: 1, title: "Linear Equations", subject: "Mathematics" },
    { id: 2, title: "Algebraic Expressions", subject: "Mathematics" },
    { id: 3, title: "Coordinate Geometry", subject: "Mathematics" },
    { id: 4, title: "Trigonometry Basics", subject: "Mathematics" },
  ];

  const labels = {
    en: {
      history: "History",
      saved: "Saved",
      topics: "Topics",
      conversations: "Recent Conversations",
      explanations: "Saved Explanations",
      relatedTopics: "Related Topics",
      messages: "messages",
      noHistory: "No conversation history",
      noSaved: "No saved explanations",
      startChat: "Start a new conversation",
    },
    hi: {
      history: "इतिहास",
      saved: "सहेजे गए",
      topics: "विषय",
      conversations: "हाल की बातचीत",
      explanations: "सहेजे गए स्पष्टीकरण",
      relatedTopics: "संबंधित विषय",
      messages: "संदेश",
      noHistory: "कोई बातचीत इतिहास नहीं",
      noSaved: "कोई सहेजे गए स्पष्टीकरण नहीं",
      startChat: "नई बातचीत शुरू करें",
    },
    bn: {
      history: "ইতিহাস",
      saved: "সংরক্ষিত",
      topics: "বিষয়",
      conversations: "সাম্প্রতিক কথোপকথন",
      explanations: "সংরক্ষিত ব্যাখ্যা",
      relatedTopics: "সম্পর্কিত বিষয়",
      messages: "বার্তা",
      noHistory: "কোন কথোপকথনের ইতিহাস নেই",
      noSaved: "কোন সংরক্ষিত ব্যাখ্যা নেই",
      startChat: "নতুন কথোপকথন শুরু করুন",
    },
    te: {
      history: "చరిత్ర",
      saved: "సేవ్ చేసినవి",
      topics: "అంశాలు",
      conversations: "ఇటీవలి సంభాషణలు",
      explanations: "సేవ్ చేసిన వివరణలు",
      relatedTopics: "సంబంధిత అంశాలు",
      messages: "సందేశాలు",
      noHistory: "సంభాషణ చరిత్ర లేదు",
      noSaved: "సేవ్ చేసిన వివరణలు లేవు",
      startChat: "కొత్త సంభాషణ ప్రారంభించండి",
    },
    ta: {
      history: "வரலாறு",
      saved: "சேமிக்கப்பட்டது",
      topics: "தலைப்புகள்",
      conversations: "சமீபத்திய உரையாடல்கள்",
      explanations: "சேமிக்கப்பட்ட விளக்கங்கள்",
      relatedTopics: "தொடர்புடைய தலைப்புகள்",
      messages: "செய்திகள்",
      noHistory: "உரையாடல் வரலாறு இல்லை",
      noSaved: "சேமிக்கப்பட்ட விளக்கங்கள் இல்லை",
      startChat: "புதிய உரையாடலைத் தொடங்கவும்",
    },
  };

  const currentLabels = labels[currentLanguage] || labels.en;

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return timestamp.toLocaleDateString();
  };

  const tabs = [
    { id: 'history', label: currentLabels.history, icon: 'Clock' },
    { id: 'saved', label: currentLabels.saved, icon: 'Bookmark' },
    { id: 'topics', label: currentLabels.topics, icon: 'Hash' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-190 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`
        fixed top-14 right-0 bottom-16 w-80 bg-card border-l border-border z-200
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:top-0 lg:bottom-0 lg:transform-none lg:z-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <h3 className="text-lg font-semibold text-card-foreground">Chat History</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors duration-150"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 text-sm font-medium transition-colors duration-150 ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'history' && (
            <div className="p-4 space-y-3">
              <h4 className="text-sm font-medium text-card-foreground mb-3">
                {currentLabels.conversations}
              </h4>
              {conversationHistory.map((conversation) => (
                <button
                  key={conversation.id}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors duration-150 border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-card-foreground text-sm truncate">
                      {conversation.title}
                    </h5>
                    <span className="text-xs text-muted-foreground ml-2">
                      {formatTimestamp(conversation.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mb-2">
                    {conversation.lastMessage}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Icon name="MessageCircle" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {conversation.messageCount} {currentLabels.messages}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="p-4 space-y-3">
              <h4 className="text-sm font-medium text-card-foreground mb-3">
                {currentLabels.explanations}
              </h4>
              {savedExplanations.map((explanation) => (
                <button
                  key={explanation.id}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors duration-150 border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-card-foreground text-sm">
                      {explanation.title}
                    </h5>
                    <Icon name="Bookmark" size={12} className="text-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {explanation.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(explanation.savedAt)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'topics' && (
            <div className="p-4 space-y-3">
              <h4 className="text-sm font-medium text-card-foreground mb-3">
                {currentLabels.relatedTopics}
              </h4>
              {relatedTopics.map((topic) => (
                <button
                  key={topic.id}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors duration-150 border border-border"
                >
                  <h5 className="font-medium text-card-foreground text-sm mb-1">
                    {topic.title}
                  </h5>
                  <span className="text-xs text-muted-foreground">
                    {topic.subject}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConversationSidebar;