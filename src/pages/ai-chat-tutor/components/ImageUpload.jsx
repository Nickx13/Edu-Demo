import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImageUpload = ({ isOpen, onClose, onImageUpload, currentLanguage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState('upload'); // 'upload', 'processing', 'confirm'

  const labels = {
    en: {
      title: "Upload Image",
      subtitle: "Take a photo or select from gallery",
      camera: "Camera",
      gallery: "Gallery",
      processing: "Processing image...",
      extractedText: "Extracted text:",
      confirm: "Send to AI",
      cancel: "Cancel",
      retake: "Retake",
    },
    hi: {
      title: "छवि अपलोड करें",
      subtitle: "फोटो लें या गैलरी से चुनें",
      camera: "कैमरा",
      gallery: "गैलरी",
      processing: "छवि प्रसंस्करण...",
      extractedText: "निकाला गया पाठ:",
      confirm: "AI को भेजें",
      cancel: "रद्द करें",
      retake: "फिर से लें",
    },
    bn: {
      title: "ছবি আপলোড করুন",
      subtitle: "ছবি তুলুন বা গ্যালারি থেকে নির্বাচন করুন",
      camera: "ক্যামেরা",
      gallery: "গ্যালারি",
      processing: "ছবি প্রক্রিয়াকরণ...",
      extractedText: "নিষ্কাশিত পাঠ:",
      confirm: "AI-তে পাঠান",
      cancel: "বাতিল",
      retake: "আবার নিন",
    },
    te: {
      title: "చిత్రాన్ని అప్‌లోడ్ చేయండి",
      subtitle: "ఫోటో తీయండి లేదా గ్యాలరీ నుండి ఎంచుకోండి",
      camera: "కెమెరా",
      gallery: "గ్యాలరీ",
      processing: "చిత్రం ప్రాసెసింగ్...",
      extractedText: "వెలికితీసిన వచనం:",
      confirm: "AI కి పంపండి",
      cancel: "రద్దు చేయండి",
      retake: "మళ్లీ తీయండి",
    },
    ta: {
      title: "படத்தை பதிவேற்றவும்",
      subtitle: "புகைப்படம் எடுக்கவும் அல்லது கேலரியில் இருந்து தேர்ந்தெடுக்கவும்",
      camera: "கேமரா",
      gallery: "கேலரி",
      processing: "படம் செயலாக்கம்...",
      extractedText: "பிரித்தெடுக்கப்பட்ட உரை:",
      confirm: "AI க்கு அனுப்பவும்",
      cancel: "ரத்து செய்",
      retake: "மீண்டும் எடுக்கவும்",
    },
  };

  const currentLabels = labels[currentLanguage] || labels.en;

  const handleImageSelect = (source) => {
    setIsProcessing(true);
    setStep('processing');

    // Simulate image capture/selection and OCR processing
    setTimeout(() => {
      const mockImage = source === 'camera' 
        ? "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop"
        : "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop";
      
      const mockExtractedText = {
        en: "Solve for x: 2x² + 5x - 3 = 0\nFind the roots of the quadratic equation.",
        hi: "x के लिए हल करें: 2x² + 5x - 3 = 0\nद्विघात समीकरण के मूल ज्ञात करें।",
        bn: "x এর জন্য সমাধান করুন: 2x² + 5x - 3 = 0\nদ্বিঘাত সমীকরণের মূল খুঁজুন।",
        te: "x కోసం పరిష్కరించండి: 2x² + 5x - 3 = 0\nవర్గ సమీకరణం యొక్క మూలాలను కనుగొనండి।",
        ta: "x க்கு தீர்க்கவும்: 2x² + 5x - 3 = 0\nஇருபடி சமன்பாட்டின் வேர்களைக் கண்டறியவும்।",
      };

      setSelectedImage(mockImage);
      setExtractedText(mockExtractedText[currentLanguage] || mockExtractedText.en);
      setIsProcessing(false);
      setStep('confirm');
    }, 2000);
  };

  const handleConfirm = () => {
    onImageUpload({
      image: selectedImage,
      extractedText: extractedText,
    });
    handleClose();
  };

  const handleClose = () => {
    setSelectedImage(null);
    setExtractedText('');
    setIsProcessing(false);
    setStep('upload');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-2xl w-full max-w-md mx-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">
              {currentLabels.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentLabels.subtitle}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors duration-150"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {step === 'upload' && (
            <div className="space-y-4">
              <button
                onClick={() => handleImageSelect('camera')}
                className="w-full flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-150"
              >
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Camera" size={20} className="text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-card-foreground">{currentLabels.camera}</p>
                  <p className="text-sm text-muted-foreground">Take a new photo</p>
                </div>
              </button>

              <button
                onClick={() => handleImageSelect('gallery')}
                className="w-full flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-150"
              >
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Image" size={20} className="text-secondary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-card-foreground">{currentLabels.gallery}</p>
                  <p className="text-sm text-muted-foreground">Choose from gallery</p>
                </div>
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Loader2" size={24} className="text-primary animate-spin" />
              </div>
              <p className="text-lg font-medium text-card-foreground mb-2">
                {currentLabels.processing}
              </p>
              <p className="text-sm text-muted-foreground">
                Extracting text from image...
              </p>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="rounded-lg overflow-hidden">
                <Image 
                  src={selectedImage} 
                  alt="Selected image" 
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Extracted Text */}
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm font-medium text-card-foreground mb-2">
                  {currentLabels.extractedText}
                </p>
                <p className="text-sm text-foreground whitespace-pre-line">
                  {extractedText}
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('upload')}
                  className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors duration-150"
                >
                  {currentLabels.retake}
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors duration-150"
                >
                  {currentLabels.confirm}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;