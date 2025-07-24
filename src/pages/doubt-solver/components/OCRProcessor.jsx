import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OCRProcessor = ({ imageUrl, onTextExtracted, onSolutionRequest }) => {
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      processImage();
    }
  }, [imageUrl]);

  const processImage = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock extracted text based on common math problems
      const mockTexts = [
        "Solve for x: 2x + 5 = 13",
        "Find the area of a triangle with base 8 cm and height 6 cm",
        "If a = 3 and b = 4, find the value of a² + b²",
        "Simplify: (x + 2)(x - 3)",
        "A train travels 120 km in 2 hours. What is its speed?",
        "Find the derivative of f(x) = x² + 3x + 2"
      ];
      
      const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      setExtractedText(randomText);
      onTextExtracted(randomText);
    } catch (error) {
      console.error('OCR processing failed:', error);
      setExtractedText('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setExtractedText(newText);
    onTextExtracted(newText);
  };

  const handleGetSolution = () => {
    if (extractedText.trim()) {
      onSolutionRequest(extractedText.trim());
    }
  };

  const retryOCR = () => {
    processImage();
  };

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      {imageUrl && (
        <div className="relative">
          <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt="Problem to solve"
              className="w-full h-full object-cover"
            />
          </div>
          
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm">Extracting text...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* OCR Status */}
      {isProcessing ? (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <div>
              <p className="text-sm font-medium text-primary">Processing Image</p>
              <p className="text-xs text-primary/80">Using AI to extract text from your image...</p>
            </div>
          </div>
        </div>
      ) : extractedText ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Extracted Text</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Icon name={isEditing ? "Check" : "Edit"} size={14} className="mr-1" />
                {isEditing ? "Done" : "Edit"}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={retryOCR}
              >
                <Icon name="RotateCcw" size={14} className="mr-1" />
                Retry
              </Button>
            </div>
          </div>
          
          {isEditing ? (
            <textarea
              value={extractedText}
              onChange={handleTextChange}
              className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Edit the extracted text if needed..."
            />
          ) : (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-foreground whitespace-pre-wrap">{extractedText}</p>
            </div>
          )}
          
          {/* Confidence Indicator */}
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span>Text extracted with 94% confidence</span>
          </div>
        </div>
      ) : (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error" />
            <div>
              <p className="text-sm font-medium text-error">Text Extraction Failed</p>
              <p className="text-xs text-error/80">Could not extract text from the image. Please try again or type manually.</p>
            </div>
          </div>
          
          <div className="mt-3 flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={retryOCR}
            >
              <Icon name="RotateCcw" size={14} className="mr-1" />
              Retry OCR
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Icon name="Type" size={14} className="mr-1" />
              Type Manually
            </Button>
          </div>
        </div>
      )}

      {/* Manual Input Option */}
      {isEditing && !extractedText && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Type Your Question</h3>
          <textarea
            value={extractedText}
            onChange={handleTextChange}
            className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Type your math problem or question here..."
          />
        </div>
      )}

      {/* Get Solution Button */}
      {extractedText && (
        <Button
          onClick={handleGetSolution}
          disabled={!extractedText.trim()}
          className="w-full"
        >
          <Icon name="Sparkles" size={16} className="mr-2" />
          Get AI Solution
        </Button>
      )}
    </div>
  );
};

export default OCRProcessor;