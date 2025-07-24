import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const ParentAccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('auth'); // 'auth' or 'verification'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    verificationCode: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (step === 'auth') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    } else if (step === 'verification') {
      if (!formData.verificationCode) {
        newErrors.verificationCode = 'Verification code is required';
      } else if (formData.verificationCode.length !== 6) {
        newErrors.verificationCode = 'Please enter the 6-digit code';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (step === 'auth') {
        // Simulate authentication
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStep('verification');
      } else {
        // Simulate verification
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Navigate to parent dashboard
        onClose();
        navigate('/parent-dashboard');
      }
    } catch (error) {
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setStep('auth');
    setFormData({
      email: '',
      password: '',
      verificationCode: '',
    });
    setErrors({});
    setIsLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">
              {step === 'auth' ? 'Parent Access' : 'Verify Identity'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {step === 'auth' ?'Enter your credentials to access the parent dashboard' :'Enter the verification code sent to your email'
              }
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.general && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error">{errors.general}</p>
            </div>
          )}

          {step === 'auth' ? (
            <>
              <Input
                label="Email Address"
                type="email"
                placeholder="parent@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />
              
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
                required
              />
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  We've sent a 6-digit verification code to
                </p>
                <p className="text-sm font-medium text-card-foreground">
                  {formData.email}
                </p>
              </div>
              
              <Input
                label="Verification Code"
                type="text"
                placeholder="000000"
                value={formData.verificationCode}
                onChange={(e) => handleInputChange('verificationCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                error={errors.verificationCode}
                required
                className="text-center text-lg tracking-widest"
              />
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-150"
                >
                  Didn't receive the code? Resend
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            {step === 'verification' && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('auth')}
                disabled={isLoading}
                className="flex-1"
              >
                Back
              </Button>
            )}
            
            <Button
              type="submit"
              loading={isLoading}
              className="flex-1"
            >
              {step === 'auth' ? 'Continue' : 'Verify & Access'}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={12} />
            <span>Your data is protected with end-to-end encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentAccessModal;