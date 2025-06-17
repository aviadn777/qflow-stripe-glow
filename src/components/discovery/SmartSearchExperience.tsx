
import React, { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Extend Window interface for Speech Recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface SmartSearchExperienceProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentLanguage: 'hebrew' | 'english';
  onAddHeart: (amount: number) => void;
}

const SmartSearchExperience: React.FC<SmartSearchExperienceProps> = ({
  searchQuery,
  onSearchChange,
  currentLanguage,
  onAddHeart
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const placeholders = {
    hebrew: [
      'איזה טיפול יעשה לך שמח היום?',
      'מחפשת משהו מיוחד?',
      'בואי נמצא משהו מושלם בשבילך',
      'ספרי לנו מה את חולמת עליו...'
    ],
    english: [
      'What treatment would make you happy today?',
      'Looking for something special?',
      'Let\'s find something perfect for you',
      'Tell us what you\'re dreaming of...'
    ]
  };

  const suggestions = {
    hebrew: [
      { text: 'תספורת נשים 💇‍♀️', emoji: '💇‍♀️' },
      { text: 'עיסוי מרגיע 💆‍♀️', emoji: '💆‍♀️' },
      { text: 'מניקור ג\'ל 💅', emoji: '💅' },
      { text: 'טיפול פנים 🌟', emoji: '🌟' },
      { text: 'צביעת שיער 🎨', emoji: '🎨' },
      { text: 'הארכת ריסים ✨', emoji: '✨' }
    ],
    english: [
      { text: 'Women\'s Haircut 💇‍♀️', emoji: '💇‍♀️' },
      { text: 'Relaxing Massage 💆‍♀️', emoji: '💆‍♀️' },
      { text: 'Gel Manicure 💅', emoji: '💅' },
      { text: 'Facial Treatment 🌟', emoji: '🌟' },
      { text: 'Hair Coloring 🎨', emoji: '🎨' },
      { text: 'Eyelash Extensions ✨', emoji: '✨' }
    ]
  };

  useEffect(() => {
    const currentPlaceholders = placeholders[currentLanguage];
    let index = 0;

    const interval = setInterval(() => {
      setCurrentPlaceholder(currentPlaceholders[index]);
      index = (index + 1) % currentPlaceholders.length;
    }, 3000);

    // Set initial placeholder
    setCurrentPlaceholder(currentPlaceholders[0]);

    return () => clearInterval(interval);
  }, [currentLanguage]);

  const handleSearchFocus = () => {
    setShowSuggestions(true);
    onAddHeart(1); // Reward for engaging with search
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    onAddHeart(2); // Reward for using suggestions
  };

  const handleVoiceSearch = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(currentLanguage === 'hebrew' ? 'חיפוש קולי לא נתמך בדפדפן זה' : 'Voice search not supported in this browser');
      return;
    }

    setIsListening(true);
    
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = currentLanguage === 'hebrew' ? 'he-IL' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onSearchChange(transcript);
      onAddHeart(3); // Extra reward for voice search
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      <style>{`
        .font-hebrew {
          font-family: "Noto Sans Hebrew", system-ui;
        }
      `}</style>
      
      <div className="relative max-w-4xl mx-auto" dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
        {/* Main Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={currentPlaceholder}
            className={`pl-12 pr-16 py-6 text-lg border-2 border-gray-200 rounded-2xl shadow-lg focus:border-[#635bff] focus:ring-[#635bff] focus:ring-2 transition-all duration-300 ${
              currentLanguage === 'hebrew' ? 'text-right font-hebrew' : 'text-left'
            }`}
            style={{
              fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
            }}
          />

          {/* Voice Search Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVoiceSearch}
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              currentLanguage === 'hebrew' ? 'left-3' : 'right-3'
            } ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-[#635bff]'}`}
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
            <div className="p-4">
              <h3 className={`text-sm font-medium text-gray-500 mb-3 ${
                currentLanguage === 'hebrew' ? 'text-right font-hebrew' : 'text-left'
              }`}>
                {currentLanguage === 'hebrew' ? 'הצעות פופולריות:' : 'Popular suggestions:'}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {suggestions[currentLanguage].map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`cursor-pointer hover:bg-[#635bff] hover:text-white hover:border-[#635bff] transition-all duration-200 p-3 justify-center text-center ${
                      currentLanguage === 'hebrew' ? 'font-hebrew' : ''
                    }`}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    style={{
                      fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                    }}
                  >
                    <span className="mr-2">{suggestion.emoji}</span>
                    {suggestion.text.replace(/ 💇‍♀️| 💆‍♀️| 💅| 🌟| 🎨| ✨/g, '')}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Tips */}
        {!searchQuery && (
          <div className={`mt-4 text-center ${currentLanguage === 'hebrew' ? 'font-hebrew' : ''}`}>
            <p className="text-sm text-gray-500">
              {currentLanguage === 'hebrew' 
                ? 'תגידי מה את מחפשת או בחרי מההצעות למטה 💬'
                : 'Tell us what you\'re looking for or choose from suggestions below 💬'
              }
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SmartSearchExperience;
