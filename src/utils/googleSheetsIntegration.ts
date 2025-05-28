
// Enhanced Google Sheets Integration with Real API Support
const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID || 'your-spreadsheet-id-here';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || 'your-google-api-key-here';

interface College {
  id?: number;
  name: string;
  location: string;
  state: string;
  type: string;
  description: string;
  website?: string;
  whatsapp: string;
  email?: string;
  submittedBy?: string;
  submittedDate?: string;
  status?: 'pending' | 'approved' | 'rejected';
  rating?: number;
  students?: number;
  image?: string;
  founded?: number;
}

class GoogleSheetsIntegration {
  private baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`;

  async getColleges(): Promise<College[]> {
    try {
      // Check if we have valid API configuration
      if (!SPREADSHEET_ID || SPREADSHEET_ID === 'your-spreadsheet-id-here' || 
          !API_KEY || API_KEY === 'your-google-api-key-here') {
        console.log('Google Sheets not configured, using local data');
        return this.getLocalColleges();
      }

      const response = await fetch(
        `${this.baseUrl}/values/Sheet1!A2:N1000?key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.values || data.values.length === 0) {
        console.log('No data found in Google Sheets, using local data');
        return this.getLocalColleges();
      }

      return data.values.map((row: any[], index: number) => ({
        id: parseInt(row[0]) || index + 1,
        name: row[1] || '',
        location: row[2] || '',
        state: row[3] || '',
        type: row[4] || '',
        rating: parseFloat(row[5]) || 4.0,
        students: parseInt(row[6]) || 0,
        description: row[7] || '',
        image: row[8] || '/placeholder.svg',
        whatsapp: row[9] || '',
        status: row[10] as 'approved' || 'approved',
        founded: parseInt(row[11]) || 2000,
        website: row[12] || '',
        email: row[13] || ''
      }));
    } catch (error) {
      console.error('Error fetching from Google Sheets:', error);
      return this.getLocalColleges();
    }
  }

  async addCollege(college: Partial<College>): Promise<boolean> {
    try {
      if (!SPREADSHEET_ID || SPREADSHEET_ID === 'your-spreadsheet-id-here' || 
          !API_KEY || API_KEY === 'your-google-api-key-here') {
        console.log('Google Sheets not configured, storing locally');
        return this.addLocalCollege(college);
      }

      const values = [[
        college.id || Date.now(),
        college.name || '',
        college.location || '',
        college.state || '',
        college.type || '',
        college.rating || 4.0,
        college.students || 0,
        college.description || '',
        college.image || '/placeholder.svg',
        college.whatsapp || '',
        college.status || 'pending',
        college.founded || new Date().getFullYear(),
        college.website || '',
        college.email || ''
      ]];

      const response = await fetch(
        `${this.baseUrl}/values/Sheet1!A:N:append?valueInputOption=RAW&key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values })
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Error adding to Google Sheets:', error);
      return this.addLocalCollege(college);
    }
  }

  private getLocalColleges(): College[] {
    // Fallback to local storage or hardcoded data
    const stored = localStorage.getItem('localColleges');
    if (stored) {
      return JSON.parse(stored);
    }
    return []; // Return empty array if no local data
  }

  private addLocalCollege(college: Partial<College>): boolean {
    try {
      const colleges = this.getLocalColleges();
      const newCollege = {
        id: Date.now(),
        ...college,
        submittedDate: new Date().toISOString(),
        status: 'pending' as const
      };
      colleges.push(newCollege as College);
      localStorage.setItem('localColleges', JSON.stringify(colleges));
      return true;
    } catch (error) {
      console.error('Error storing locally:', error);
      return false;
    }
  }

  // Method to sync local data to sheets when API becomes available
  async syncLocalToSheets(): Promise<void> {
    const localColleges = this.getLocalColleges();
    for (const college of localColleges) {
      await this.addCollege(college);
    }
    localStorage.removeItem('localColleges'); // Clear local storage after sync
  }
}

export const googleSheetsIntegration = new GoogleSheetsIntegration();
