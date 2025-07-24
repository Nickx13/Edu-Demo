import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SolutionDisplay = ({ 
  solution, 
  originalText, 
  imageUrl, 
  onSave, 
  onShare, 
  isGenerating 
}) => {
  const [activeFormat, setActiveFormat] = useState('text');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const formatOptions = [
    { id: 'text', label: 'Text', icon: 'FileText' },
    { id: 'audio', label: 'Audio', icon: 'Volume2' },
    { id: 'video', label: 'Video', icon: 'Play' }
  ];

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playback
    if (!isPlaying) {
      const interval = setInterval(() => {
        setPlaybackTime(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    onSave?.(solution);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleShare = () => {
    onShare?.(solution);
  };

  if (isGenerating) {
    return (
      <div className="space-y-4">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <div>
              <h3 className="text-lg font-medium text-primary">Generating Solution</h3>
              <p className="text-sm text-primary/80 mt-1">
                Our AI is analyzing your problem and creating a detailed step-by-step solution...
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="space-y-2 text-left">
              <div className="flex items-center space-x-2 text-xs">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span className="text-muted-foreground">Problem analyzed</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-primary">Generating solution steps...</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <Icon name="Circle" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Creating explanations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!solution) return null;

  return (
    <div className="space-y-6">
      {/* Solution Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground mb-2">Solution</h2>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{solution.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="BarChart" size={14} />
              <span>Difficulty: {solution.difficulty}</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={isSaved}
          >
            <Icon name={isSaved ? "Check" : "Bookmark"} size={14} className="mr-1" />
            {isSaved ? "Saved" : "Save"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            <Icon name="Share" size={14} className="mr-1" />
            Share
          </Button>
        </div>
      </div>

      {/* Original Problem */}
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          {imageUrl && (
            <div className="w-16 h-16 bg-card rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={imageUrl}
                alt="Original problem"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-foreground mb-1">Original Problem</h3>
            <p className="text-sm text-muted-foreground">{originalText}</p>
          </div>
        </div>
      </div>

      {/* Format Toggle */}
      <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
        {formatOptions.map((format) => (
          <button
            key={format.id}
            onClick={() => setActiveFormat(format.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-150 ${
              activeFormat === format.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={format.icon} size={14} />
            <span>{format.label}</span>
          </button>
        ))}
      </div>

      {/* Solution Content */}
      <div className="space-y-4">
        {activeFormat === 'text' && (
          <div className="space-y-4">
            {solution.steps.map((step, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{step.explanation}</p>
                    {step.formula && (
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        {step.formula}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Final Answer */}
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <h4 className="font-medium text-success">Final Answer</h4>
              </div>
              <p className="text-foreground font-medium">{solution.finalAnswer}</p>
            </div>
          </div>
        )}

        {activeFormat === 'audio' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Volume2" size={32} className="text-primary" />
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Audio Explanation</h3>
                <p className="text-sm text-muted-foreground">
                  Listen to the step-by-step solution with AI narration
                </p>
              </div>
              
              {/* Audio Controls */}
              <div className="space-y-3">
                <Button
                  onClick={handlePlayAudio}
                  className="w-full"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={16} className="mr-2" />
                  {isPlaying ? "Pause" : "Play"} Explanation
                </Button>
                
                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-100"
                    style={{ width: `${playbackTime}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.floor(playbackTime * 1.8 / 100)}:{String(Math.floor((playbackTime * 1.8) % 60)).padStart(2, '0')}</span>
                  <span>1:48</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeFormat === 'video' && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white space-y-3">
                <Icon name="Play" size={48} className="mx-auto opacity-80" />
                <div>
                  <h3 className="font-medium">Video Explanation</h3>
                  <p className="text-sm opacity-80">Visual step-by-step solution</p>
                </div>
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Icon name="Play" size={16} className="mr-2" />
                  Play Video
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Concepts */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-3">Related Concepts</h3>
        <div className="flex flex-wrap gap-2">
          {solution.relatedConcepts.map((concept, index) => (
            <button
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors duration-150"
            >
              {concept}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionDisplay;