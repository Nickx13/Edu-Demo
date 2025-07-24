import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const AvailabilityCard = ({ 
  formData, 
  onFormChange, 
  errors 
}) => {
  const timeSlots = [
    { id: 'early-morning', label: 'Early Morning', time: '5:00 AM - 7:00 AM', icon: 'Sunrise' },
    { id: 'morning', label: 'Morning', time: '7:00 AM - 10:00 AM', icon: 'Sun' },
    { id: 'late-morning', label: 'Late Morning', time: '10:00 AM - 12:00 PM', icon: 'Clock' },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 4:00 PM', icon: 'CloudSun' },
    { id: 'evening', label: 'Evening', time: '4:00 PM - 7:00 PM', icon: 'Sunset' },
    { id: 'night', label: 'Night', time: '7:00 PM - 10:00 PM', icon: 'Moon' }
  ];

  const studyDurations = [
    { value: 30, label: '30 minutes', description: 'Quick focused sessions' },
    { value: 45, label: '45 minutes', description: 'Balanced study periods' },
    { value: 60, label: '1 hour', description: 'Standard study sessions' },
    { value: 90, label: '1.5 hours', description: 'Deep learning sessions' },
    { value: 120, label: '2 hours', description: 'Extended study periods' }
  ];

  const breakPreferences = [
    { value: 5, label: '5 minutes', description: 'Quick refresh' },
    { value: 10, label: '10 minutes', description: 'Standard break' },
    { value: 15, label: '15 minutes', description: 'Extended break' },
    { value: 20, label: '20 minutes', description: 'Long break' }
  ];

  const handleTimeSlotToggle = (slotId) => {
    const currentSlots = formData.availableTimeSlots || [];
    const isSelected = currentSlots.includes(slotId);
    
    if (isSelected) {
      onFormChange('availableTimeSlots', currentSlots.filter(s => s !== slotId));
    } else {
      onFormChange('availableTimeSlots', [...currentSlots, slotId]);
    }
  };

  const handleDailyHoursChange = (value) => {
    onFormChange('dailyStudyHours', parseFloat(value));
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Calendar" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Study Availability</h3>
          <p className="text-sm text-muted-foreground">When can you dedicate time to studying?</p>
        </div>
      </div>

      {/* Available Time Slots */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-3">
            Available Time Slots
          </label>
          {errors.availableTimeSlots && (
            <p className="text-sm text-error mb-3">{errors.availableTimeSlots}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {timeSlots.map((slot) => {
              const isSelected = formData.availableTimeSlots?.includes(slot.id);
              return (
                <div
                  key={slot.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTimeSlotToggle(slot.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon name={slot.icon} size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleTimeSlotToggle(slot.id)}
                        />
                        <span className="font-medium text-card-foreground">{slot.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{slot.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Study Hours */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-card-foreground">
            Daily Study Hours: {formData.dailyStudyHours} hours
          </label>
          <div className="px-3">
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={formData.dailyStudyHours}
              onChange={(e) => handleDailyHoursChange(e.target.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${(formData.dailyStudyHours - 1) * 14.28}%, var(--color-muted) ${(formData.dailyStudyHours - 1) * 14.28}%, var(--color-muted) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1h</span>
              <span>4h</span>
              <span>8h</span>
            </div>
          </div>
        </div>

        {/* Preferred Session Duration */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-card-foreground">
            Preferred Session Duration
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {studyDurations.map((duration) => (
              <button
                key={duration.value}
                onClick={() => onFormChange('sessionDuration', duration.value)}
                className={`p-3 rounded-lg border text-left transition-all duration-150 ${
                  formData.sessionDuration === duration.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-card-foreground'
                }`}
              >
                <div className="font-medium">{duration.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{duration.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Break Preferences */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-card-foreground">
            Break Duration Between Sessions
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {breakPreferences.map((breakPref) => (
              <button
                key={breakPref.value}
                onClick={() => onFormChange('breakDuration', breakPref.value)}
                className={`p-3 rounded-lg border text-center transition-all duration-150 ${
                  formData.breakDuration === breakPref.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-card-foreground'
                }`}
              >
                <div className="font-medium">{breakPref.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{breakPref.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Clock" size={16} className="text-accent mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-card-foreground">Study Schedule Tips:</p>
            <ul className="text-muted-foreground mt-1 space-y-1">
              <li>• Choose time slots when you feel most alert and focused</li>
              <li>• Include breaks to maintain concentration and avoid burnout</li>
              <li>• Be realistic about your daily capacity for effective studying</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCard;