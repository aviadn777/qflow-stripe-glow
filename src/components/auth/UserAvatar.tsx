
import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface UserAvatarProps {
  currentLanguage: 'hebrew' | 'english';
  isScrolled: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ currentLanguage, isScrolled }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();

  // Get user initials
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  // Get display name from user metadata or email
  const getDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const displayName = getDisplayName();
  const initials = getInitials(displayName);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await signOut();
  };

  const menuItems = {
    hebrew: [
      { icon: User, label: 'פרופיל', action: () => console.log('Profile') },
      { icon: Settings, label: 'הגדרות חשבון', action: () => console.log('Settings') },
      { icon: BarChart3, label: 'לוח בקרה', action: () => console.log('Dashboard') },
      { icon: LogOut, label: 'התנתק', action: handleLogout, isLogout: true }
    ],
    english: [
      { icon: User, label: 'Profile', action: () => console.log('Profile') },
      { icon: Settings, label: 'Account Settings', action: () => console.log('Settings') },
      { icon: BarChart3, label: 'Dashboard', action: () => console.log('Dashboard') },
      { icon: LogOut, label: 'Logout', action: handleLogout, isLogout: true }
    ]
  };

  const currentItems = menuItems[currentLanguage];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`w-10 h-10 rounded-full bg-gradient-to-br from-[#635bff] to-[#0066ff] 
          flex items-center justify-center text-white font-semibold text-sm
          border-2 transition-all duration-200 transform hover:scale-105
          ${isScrolled 
            ? 'border-white/20 shadow-lg hover:shadow-xl' 
            : 'border-white/30 shadow-md hover:shadow-lg'
          }`}
        style={{
          boxShadow: isDropdownOpen 
            ? '0 8px 25px rgba(99, 91, 255, 0.4)' 
            : '0 4px 15px rgba(99, 91, 255, 0.2)'
        }}
      >
        {initials}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div 
          className={`absolute top-12 min-w-48 bg-white/95 backdrop-blur-md 
            border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden
            transform transition-all duration-300 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2
            ${currentLanguage === 'hebrew' ? 'right-0' : 'left-0'}`}
          style={{
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* User Info Header */}
          <div className={`px-4 py-3 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-white/30
            ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
            <div className="text-sm font-semibold text-gray-900">{displayName}</div>
            <div className="text-xs text-gray-600">{user?.email}</div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {currentItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.isLogout && <div className="h-px bg-gray-100/50 my-1 mx-2" />}
                <button
                  onClick={item.action}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50/70 
                    transition-colors duration-150 text-sm font-medium
                    ${currentLanguage === 'hebrew' ? 'text-right flex-row-reverse' : 'text-left'}
                    ${item.isLogout ? 'text-red-600 hover:bg-red-50/70' : 'text-gray-700'}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
