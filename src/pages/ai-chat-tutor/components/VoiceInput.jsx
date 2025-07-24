import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VoiceInput = ({ isActive, onTranscript, onToggle, currentLanguage }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [waveformData, setWaveformData] = useState(Array(20).fill(0));

  const languageLabels = {
    en: { listening: "Listening...", tapToSpeak: "Tap to speak", processing: "Processing..." },
    hi: { listening: "सुन रहा हूं...", tapToSpeak: "बोलने के लिए टैप करें", processing: "प्रसंस्करण..." },
    bn: { listening: "শুনছি...", tapToSpeak: "কথা বলতে ট্যাপ করুন", processing: "প্রক্রিয়াকরণ..." },
    te: { listening: "వింటున్నాను...", tapToSpeak: "మాట్లాడటానికి ట్యాప్ చేయండి", processing: "ప্রক্রিয়াকরণ..." },
    ta: { listening: "கேட்டுக்கொண்டிருக்கிறேன்...", tapToSpeak: "பேச டேப் செய்யவும்", processing: "செயலாக்கம்..." },
  };

  const labels = languageLabels[currentLanguage] || languageLabels.en;

  // Simulate waveform animation
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setWaveformData(prev => 
          prev.map(() => Math.random() * 100)
        );
      }, 100);
    } else {
      setWaveformData(Array(20).fill(0));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isListening]);

  // Simulate speech recognition
  useEffect(() => {
    if (isActive && !isListening) {
      setIsListening(true);
      
      // Simulate speech recognition delay
      const timer = setTimeout(() => {
        const mockTranscripts = {
          en: "What is the formula for quadratic equation?",
          hi: "द्विघात समीकरण का सूत्र क्या है?",
          bn: "দ্বিঘাত সমীকরণের সূত্র কী?",
          te: "వర్గ సమీకరణం యొక్క సూత్రం ఏమిటి?",
          ta: "இருபடி சமன்பாட்டின் சூத்திரம் என்ன?",
        };
        
        const mockTranscript = mockTranscripts[currentLanguage] || mockTranscripts.en;
        setTranscript(mockTranscript);
        onTranscript(mockTranscript);
        setIsListening(false);
        onToggle();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isActive, currentLanguage, onTranscript, onToggle]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-sm mx-auto">
        <div className="text-center">
          {/* Microphone Icon */}
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <Icon 
              name="Mic" 
              size={32} 
              className="text-primary-foreground" 
            />
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
            )}
          </div>

          {/* Status Text */}
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            {isListening ? labels.listening : labels.processing}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-6">
            {isListening ? labels.tapToSpeak : labels.processing}
          </p>

          {/* Waveform Visualization */}
          <div className="flex items-center justify-center space-x-1 h-16 mb-6">
            {waveformData.map((height, index) => (
              <div
                key={index}
                className="w-1 bg-primary rounded-full transition-all duration-100"
                style={{ 
                  height: `${Math.max(4, height * 0.4)}px`,
                  opacity: isListening ? 1 : 0.3 
                }}
              />
            ))}
          </div>

          {/* Transcript Preview */}
          {transcript && (
            <div className="bg-muted rounded-lg p-3 mb-4">
              <p className="text-sm text-foreground">{transcript}</p>
            </div>
          )}

          {/* Cancel Button */}
          <button
            onClick={onToggle}
            className="w-12 h-12 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors duration-150"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;