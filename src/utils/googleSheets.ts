// Google Sheets API Integration
const SPREADSHEET_ID = 'your-spreadsheet-id-here'; // Replace with actual spreadsheet ID
const API_KEY = 'your-google-api-key-here'; // Replace with actual API key

interface College {
  id?: number;
  name: string;
  location: string;
  type: string;
  description: string;
  website?: string;
  whatsapp: string;
  email?: string;
  submittedBy: string;
  submittedDate?: string;
  status?: 'pending' | 'approved' | 'rejected';
  rating?: number;
  students?: number;
  image?: string;
}

class GoogleSheetsService {
  private baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`;

  async getColleges(status: 'pending' | 'approved' | 'all' = 'all'): Promise<College[]> {
    try {
      // For demo purposes, return sample data
      // In production, this would fetch from actual Google Sheets
      const sampleColleges: College[] = [
        {
          id: 1,
          name: "Harvard University",
          location: "Cambridge, MA",
          type: "Private",
          rating: 4.9,
          students: 23000,
          description: "World-renowned Ivy League institution known for excellence in academics and research.",
          image: "/placeholder.svg",
          whatsapp: "+1234567890",
          status: "approved",
          submittedDate: new Date().toISOString(),
          submittedBy: "admin@harvard.edu"
        },
        {
          id: 2,
          name: "Stanford University", 
          location: "Stanford, CA",
          type: "Private",
          rating: 4.8,
          students: 17000,
          description: "Leading university in technology and innovation, located in Silicon Valley.",
          image: "/placeholder.svg",
          whatsapp: "+1234567891",
          status: "approved",
          submittedDate: new Date().toISOString(),
          submittedBy: "admin@stanford.edu"
        }
      ];

      if (status === 'all') {
        return sampleColleges;
      }
      return sampleColleges.filter(college => college.status === status);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      return [];
    }
  }

  async submitCollege(collegeData: Partial<College>): Promise<boolean> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In production, this would append to Google Sheets
      const newCollege: College = {
        id: Date.now(),
        ...collegeData,
        submittedDate: new Date().toISOString(),
        status: 'pending'
      } as College;

      console.log('College submitted successfully:', newCollege);

      // Store in localStorage for demo (in production, use actual Google Sheets API)
      const existingColleges = JSON.parse(localStorage.getItem('colleges') || '[]');
      existingColleges.push(newCollege);
      localStorage.setItem('colleges', JSON.stringify(existingColleges));

      return true;
    } catch (error) {
      console.error('Error submitting college:', error);
      return false;
    }
  }

  async updateCollegeStatus(id: number, status: 'approved' | 'rejected'): Promise<boolean> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, update Google Sheets
      console.log(`College ${id} status updated to ${status}`);
      return true;
    } catch (error) {
      console.error('Error updating college status:', error);
      return false;
    }
  }

  async deleteCollege(id: number): Promise<boolean> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, delete from Google Sheets
      console.log(`College ${id} deleted`);
      return true;
    } catch (error) {
      console.error('Error deleting college:', error);
      return false;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();