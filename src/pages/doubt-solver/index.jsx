import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import CameraCapture from './components/CameraCapture';
import OCRProcessor from './components/OCRProcessor';
import SolutionDisplay from './components/SolutionDisplay';
import RecentDoubts from './components/RecentDoubts';
import LanguageSelector from './components/LanguageSelector';

const DoubtSolver = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('capture'); // 'capture', 'process', 'solution'
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [solution, setSolution] = useState(null);
  const [isGeneratingSolution, setIsGeneratingSolution] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showHistory, setShowHistory] = useState(false);

  // Mock solution data
  const mockSolution = {
    steps: [
      {
        title: "Identify the equation type",
        explanation: "This is a linear equation in one variable (x). We need to isolate x on one side.",
        formula: "2x + 5 = 13"
      },
      {
        title: "Subtract 5 from both sides",
        explanation: "To eliminate the constant term on the left side, subtract 5 from both sides of the equation.",
        formula: "2x + 5 - 5 = 13 - 5\n2x = 8"
      },
      {
        title: "Divide both sides by 2",
        explanation: "To isolate x, divide both sides by the coefficient of x, which is 2.",
        formula: "2x ÷ 2 = 8 ÷ 2\nx = 4"
      }
    ],
    finalAnswer: "x = 4",
    difficulty: "Easy",
    estimatedTime: "2 min",
    relatedConcepts: ["Linear Equations", "Algebraic Manipulation", "Solving for Variables"]
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('edumitra-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleImageCapture = (file, url) => {
    setCapturedImage(file);
    setImageUrl(url);
    setCurrentStep('process');
  };

  const handleTextExtracted = (text) => {
    setExtractedText(text);
  };

  const handleSolutionRequest = async (text) => {
    setIsGeneratingSolution(true);
    setCurrentStep('solution');
    
    try {
      // Simulate AI solution generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      setSolution(mockSolution);
    } catch (error) {
      console.error('Solution generation failed:', error);
    } finally {
      setIsGeneratingSolution(false);
    }
  };

  const handleSaveSolution = (solutionData) => {
    console.log('Saving solution:', solutionData);
    // Implement save functionality
  };

  const handleShareSolution = (solutionData) => {
    console.log('Sharing solution:', solutionData);
    // Implement share functionality
  };

  const handleDoubtSelect = (doubt) => {
    // Load selected doubt
    setExtractedText(doubt.question);
    setImageUrl(doubt.thumbnail);
    setCurrentStep('solution');
    setSolution(mockSolution);
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    // Trigger re-translation of current solution if available
    if (solution) {
      console.log('Translating solution to:', langCode);
    }
  };

  const resetSolver = () => {
    setCurrentStep('capture');
    setCapturedImage(null);
    setImageUrl(null);
    setExtractedText('');
    setSolution(null);
    setIsGeneratingSolution(false);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'capture':
        return 'Capture Problem';
      case 'process':
        return 'Extract Text';
      case 'solution':
        return 'AI Solution';
      default:
        return 'Doubt Solver';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-14 pb-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/home-dashboard')}
                className="lg:hidden"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold text-foreground">Doubt Solver</h1>
                <p className="text-sm text-muted-foreground">{getStepTitle()}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowHistory(!showHistory)}
              >
                <Icon name="History" size={16} />
              </Button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center space-x-2 mb-6">
            {['capture', 'process', 'solution'].map((step, index) => (
              <React.Fragment key={step}>
                <div className={`flex items-center space-x-2 ${
                  currentStep === step ? 'text-primary' : 
                  ['capture', 'process', 'solution'].indexOf(currentStep) > index ? 'text-success' : 'text-muted-foreground'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step ? 'bg-primary text-primary-foreground' :
                    ['capture', 'process', 'solution'].indexOf(currentStep) > index ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {['capture', 'process', 'solution'].indexOf(currentStep) > index ? (
                      <Icon name="Check" size={14} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">
                    {step === 'capture' ? 'Capture' : step === 'process' ? 'Process' : 'Solution'}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`flex-1 h-0.5 ${
                    ['capture', 'process', 'solution'].indexOf(currentStep) > index ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Left Column - Input */}
            <div className="space-y-6">
              {currentStep === 'capture' && (
                <CameraCapture 
                  onImageCapture={handleImageCapture}
                  isProcessing={isGeneratingSolution}
                />
              )}

              {currentStep === 'process' && (
                <OCRProcessor
                  imageUrl={imageUrl}
                  onTextExtracted={handleTextExtracted}
                  onSolutionRequest={handleSolutionRequest}
                />
              )}

              {currentStep === 'solution' && imageUrl && (
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">Original Problem</h3>
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={imageUrl}
                        alt="Original problem"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{extractedText}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetSolver}
                        className="mt-2"
                      >
                        <Icon name="RotateCcw" size={14} className="mr-1" />
                        New Problem
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Doubts - Mobile */}
              {(currentStep === 'capture' || showHistory) && (
                <div className="lg:hidden">
                  <RecentDoubts onDoubtSelect={handleDoubtSelect} />
                </div>
              )}
            </div>

            {/* Right Column - Solution */}
            <div className="mt-6 lg:mt-0">
              {currentStep === 'solution' && (
                <SolutionDisplay
                  solution={solution}
                  originalText={extractedText}
                  imageUrl={imageUrl}
                  onSave={handleSaveSolution}
                  onShare={handleShareSolution}
                  isGenerating={isGeneratingSolution}
                />
              )}

              {currentStep !== 'solution' && (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <Icon name="Sparkles" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">AI Solution Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Capture or upload your problem to get instant step-by-step solutions
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Doubts - Desktop */}
          <div className="hidden lg:block mt-8">
            <RecentDoubts onDoubtSelect={handleDoubtSelect} />
          </div>
        </div>
      </main>

      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default DoubtSolver;