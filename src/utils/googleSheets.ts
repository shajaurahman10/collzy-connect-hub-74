
// Google Sheets Integration for Collzy
// This file handles communication with Google Sheets API for storing user profiles and college data

const GOOGLE_SHEETS_CONFIG = {
  collegesSheetId: '1RfbBjM4Qi7M95wpYDIB7JOprKBrX0QfxbCfIopoKTi0',
  profilesSheetId: '1UG0f3zSVN9gmx_poAjd3kgPLvYLNBaagKpPhDMBue1I',
  projectId: 'collzy-connect',
  serviceAccountEmail: 'collzysheetin@collzy-connect.iam.gserviceaccount.com',
  serviceAccountId: '116508275097633380604',
  // Note: In production, the private key should be stored securely
  // privateKey: '-----BEGIN PRIVATE KEY-----...-----END PRIVATE KEY-----'
};

interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  website: string;
  whatsapp: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  submittedBy: string;
}

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  education: string;
  gpa: string;
  interests: string[];
  achievements: string[];
  isPublic: boolean;
  createdDate: string;
}

class GoogleSheetsService {
  private accessToken: string | null = null;

  // Initialize Google Sheets API (in production, implement proper OAuth2 flow)
  async initialize() {
    try {
      // This is a simplified version - in production, implement proper authentication
      console.log('Google Sheets service initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Sheets service:', error);
      return false;
    }
  }

  // College Management Methods
  async submitCollege(collegeData: Omit<College, 'id' | 'submittedDate' | 'status'>): Promise<boolean> {
    try {
      const college: College = {
        ...collegeData,
        id: this.generateId(),
        submittedDate: new Date().toISOString(),
        status: 'pending'
      };

      // In production, this would make an actual API call to Google Sheets
      console.log('Submitting college to Google Sheets:', college);
      
      // Simulate API call
      await this.delay(1000);
      
      // Store in localStorage as fallback (for demo purposes)
      const existingColleges = this.getStoredColleges();
      existingColleges.push(college);
      localStorage.setItem('collzy_colleges', JSON.stringify(existingColleges));
      
      return true;
    } catch (error) {
      console.error('Error submitting college:', error);
      return false;
    }
  }

  async getColleges(status?: 'pending' | 'approved' | 'rejected'): Promise<College[]> {
    try {
      // In production, this would fetch from Google Sheets
      console.log('Fetching colleges from Google Sheets');
      
      const colleges = this.getStoredColleges();
      
      if (status) {
        return colleges.filter(college => college.status === status);
      }
      
      return colleges;
    } catch (error) {
      console.error('Error fetching colleges:', error);
      return [];
    }
  }

  async updateCollegeStatus(collegeId: string, status: 'approved' | 'rejected'): Promise<boolean> {
    try {
      const colleges = this.getStoredColleges();
      const collegeIndex = colleges.findIndex(c => c.id === collegeId);
      
      if (collegeIndex === -1) {
        throw new Error('College not found');
      }
      
      colleges[collegeIndex].status = status;
      localStorage.setItem('collzy_colleges', JSON.stringify(colleges));
      
      console.log(`College ${collegeId} status updated to ${status}`);
      return true;
    } catch (error) {
      console.error('Error updating college status:', error);
      return false;
    }
  }

  async deleteCollege(collegeId: string): Promise<boolean> {
    try {
      const colleges = this.getStoredColleges();
      const filteredColleges = colleges.filter(c => c.id !== collegeId);
      localStorage.setItem('collzy_colleges', JSON.stringify(filteredColleges));
      
      console.log(`College ${collegeId} deleted`);
      return true;
    } catch (error) {
      console.error('Error deleting college:', error);
      return false;
    }
  }

  // User Profile Management Methods
  async saveUserProfile(profileData: Omit<UserProfile, 'id' | 'createdDate'>): Promise<boolean> {
    try {
      const profile: UserProfile = {
        ...profileData,
        id: this.generateId(),
        createdDate: new Date().toISOString()
      };

      console.log('Saving user profile to Google Sheets:', profile);
      
      // Simulate API call
      await this.delay(500);
      
      // Store in localStorage as fallback
      localStorage.setItem('collzy_user_profile', JSON.stringify(profile));
      
      return true;
    } catch (error) {
      console.error('Error saving user profile:', error);
      return false;
    }
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      // In production, this would fetch from Google Sheets
      const stored = localStorage.getItem('collzy_user_profile');
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  async updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<boolean> {
    try {
      const existingProfile = await this.getUserProfile(userId);
      if (!existingProfile) {
        throw new Error('Profile not found');
      }

      const updatedProfile = { ...existingProfile, ...profileData };
      localStorage.setItem('collzy_user_profile', JSON.stringify(updatedProfile));
      
      console.log('User profile updated:', updatedProfile);
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  // Utility Methods
  private generateId(): string {
    return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getStoredColleges(): College[] {
    try {
      const stored = localStorage.getItem('collzy_colleges');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Analytics and Reporting
  async getAnalytics(): Promise<{
    totalColleges: number;
    pendingColleges: number;
    approvedColleges: number;
    totalUsers: number;
    recentSubmissions: College[];
  }> {
    try {
      const colleges = await this.getColleges();
      const pendingColleges = colleges.filter(c => c.status === 'pending');
      const approvedColleges = colleges.filter(c => c.status === 'approved');
      
      // Sort by submission date and get recent ones
      const recentSubmissions = colleges
        .sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime())
        .slice(0, 5);

      return {
        totalColleges: colleges.length,
        pendingColleges: pendingColleges.length,
        approvedColleges: approvedColleges.length,
        totalUsers: 1234, // This would come from user profiles sheet
        recentSubmissions
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return {
        totalColleges: 0,
        pendingColleges: 0,
        approvedColleges: 0,
        totalUsers: 0,
        recentSubmissions: []
      };
    }
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService();

// Export types for use in components
export type { College, UserProfile };

// Initialize service
googleSheetsService.initialize();
