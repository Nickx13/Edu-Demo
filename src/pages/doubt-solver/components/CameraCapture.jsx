import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CameraCapture = ({ onImageCapture, isProcessing }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      // Fallback to file input
      fileInputRef.current?.click();
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      setCapturedImage(imageUrl);
      onImageCapture(blob, imageUrl);
      stopCamera();
    }, 'image/jpeg', 0.8);
  };

  const stopCamera = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      video.srcObject = null;
    }
    setShowCamera(false);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
      onImageCapture(file, imageUrl);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  if (showCamera) {
    return (
      <div className="relative w-full h-80 bg-gray-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Camera Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={stopCamera}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Icon name="X" size={20} />
          </Button>
          
          <button
            onClick={capturePhoto}
            className="w-16 h-16 bg-white rounded-full border-4 border-white/50 hover:scale-105 transition-transform duration-150"
          >
            <div className="w-full h-full bg-white rounded-full" />
          </button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Icon name="Image" size={20} />
          </Button>
        </div>
        
        {/* Camera overlay grid */}
        <div className="absolute inset-4 border-2 border-white/30 rounded-lg pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (capturedImage) {
    return (
      <div className="relative w-full h-80 bg-muted rounded-lg overflow-hidden">
        <img
          src={capturedImage}
          alt="Captured problem"
          className="w-full h-full object-cover"
        />
        
        {/* Image Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={retakePhoto}
            disabled={isProcessing}
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Retake
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
          >
            <Icon name="Image" size={16} className="mr-2" />
            Gallery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Camera Viewfinder */}
      <div className="relative w-full h-80 bg-muted border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center space-y-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Camera" size={32} className="text-primary" />
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium text-foreground">Capture Your Problem</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Take a clear photo of your math problem, homework question, or any doubt you need help with
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <Button
            onClick={startCamera}
            disabled={isProcessing}
            className="w-full sm:w-auto"
          >
            <Icon name="Camera" size={16} className="mr-2" />
            Open Camera
          </Button>
          
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="w-full sm:w-auto"
          >
            <Icon name="Image" size={16} className="mr-2" />
            Choose from Gallery
          </Button>
        </div>
        
        {/* Tips */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium mb-1">Tips for better results:</p>
                <ul className="space-y-1">
                  <li>• Ensure good lighting and clear text</li>
                  <li>• Keep the camera steady</li>
                  <li>• Include the complete problem</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default CameraCapture;