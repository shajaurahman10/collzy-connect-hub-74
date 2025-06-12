// Utility functions for managing localStorage and cookies for better user experience

export interface UserSession {
  userId: string;
  email: string;
  profileData?: any;
  preferences?: any;
  lastLogin?: string;
}

export interface ApplicationData {
  collegeId: string;
  collegeName: string;
  appliedAt: string;
  userEmail: string;
  status: 'applied' | 'pending' | 'accepted' | 'rejected';
}

export interface FavoriteCollege {
  collegeId: string;
  collegeName: string;
  addedAt: string;
}

// Cookie management
export const setCookie = (name: string, value: string, days: number = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

// LocalStorage management with expiry
export const setStorageWithExpiry = (key: string, value: any, ttl: number = 24 * 60 * 60 * 1000) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getStorageWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  
  try {
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.value;
  } catch (error) {
    localStorage.removeItem(key);
    return null;
  }
};

// Application tracking
export const saveApplication = (application: ApplicationData) => {
  const applications = getStorageWithExpiry('college_applications') || [];
  applications.push(application);
  setStorageWithExpiry('college_applications', applications, 30 * 24 * 60 * 60 * 1000); // 30 days
  
  // Update application count cookie
  setCookie('application_count', applications.length.toString());
};

export const getApplications = (): ApplicationData[] => {
  return getStorageWithExpiry('college_applications') || [];
};

// Favorites management
export const saveFavorite = (favorite: FavoriteCollege) => {
  const favorites = getStorageWithExpiry('favorite_colleges') || [];
  const exists = favorites.find((fav: FavoriteCollege) => fav.collegeId === favorite.collegeId);
  
  if (!exists) {
    favorites.push(favorite);
    setStorageWithExpiry('favorite_colleges', favorites, 365 * 24 * 60 * 60 * 1000); // 1 year
    setCookie('favorite_count', favorites.length.toString());
  }
};

export const removeFavorite = (collegeId: string) => {
  const favorites = getStorageWithExpiry('favorite_colleges') || [];
  const filtered = favorites.filter((fav: FavoriteCollege) => fav.collegeId !== collegeId);
  setStorageWithExpiry('favorite_colleges', filtered, 365 * 24 * 60 * 60 * 1000);
  setCookie('favorite_count', filtered.length.toString());
};

export const getFavorites = (): FavoriteCollege[] => {
  return getStorageWithExpiry('favorite_colleges') || [];
};

// User preferences
export const saveUserPreferences = (preferences: any) => {
  setStorageWithExpiry('user_preferences', preferences, 365 * 24 * 60 * 60 * 1000);
  setCookie('has_preferences', 'true');
};

export const getUserPreferences = () => {
  return getStorageWithExpiry('user_preferences') || {};
};

// Search history
export const saveSearchHistory = (searchTerm: string) => {
  const history = getStorageWithExpiry('search_history') || [];
  if (!history.includes(searchTerm)) {
    history.unshift(searchTerm);
    // Keep only last 10 searches
    const trimmed = history.slice(0, 10);
    setStorageWithExpiry('search_history', trimmed, 7 * 24 * 60 * 60 * 1000); // 7 days
  }
};

export const getSearchHistory = (): string[] => {
  return getStorageWithExpiry('search_history') || [];
};

// Clear all user data
export const clearAllUserData = () => {
  const keysToRemove = [
    'user_profile',
    'profile_cache_time',
    'college_applications',
    'favorite_colleges',
    'user_preferences',
    'search_history',
    'supabase_session',
    'website_visits',
    'call_attempts'
  ];
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  const cookiesToRemove = [
    'user_email',
    'user_id',
    'user_name',
    'user_phone',
    'user_state',
    'application_count',
    'favorite_count',
    'has_preferences',
    'last_application'
  ];
  
  cookiesToRemove.forEach(cookie => deleteCookie(cookie));
};

// Session management
export const saveUserSession = (session: UserSession) => {
  setStorageWithExpiry('user_session', session, 7 * 24 * 60 * 60 * 1000); // 7 days
  setCookie('user_email', session.email);
  setCookie('user_id', session.userId);
};

export const getUserSession = (): UserSession | null => {
  return getStorageWithExpiry('user_session');
};
