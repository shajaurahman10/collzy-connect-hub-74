// WhatsApp Integration for College Applications
// This utility handles WhatsApp messaging for college applications

interface ApplicationMessage {
  collegeName: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  studentEducation?: string;
  studentMarks?: string;
  studentAchievements?: string;
  message?: string;
}

class WhatsAppService {
  
  // Generate application message
  generateApplicationMessage(data: ApplicationMessage): string {
    const defaultMessage = data.message || `
Hi! I'm interested in applying to ${data.collegeName}.

My Details:
${data.studentPhone ? `- Phone: ${data.studentPhone}` : ''}
${data.studentEducation ? `- Education: ${data.studentEducation}` : ''}
${data.studentMarks ? `- Marks/Percentage: ${data.studentMarks}` : ''}
${data.studentAchievements ? `- Achievements: ${data.studentAchievements}` : ''}

Could you please provide me with more information about:
- Application deadlines
- Tuition fees and scholarships
- Campus facilities and programs

Thank you for your time. I look forward to hearing from you!

Best regards,
${data.studentName}
    `.trim();

    return defaultMessage;
  }

  // Create WhatsApp URL with message
  createWhatsAppUrl(phoneNumber: string, message: string): string {
    // Clean phone number (remove spaces, dashes, etc.)
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    
    return whatsappUrl;
  }

  // Open WhatsApp with pre-filled message
  openWhatsApp(phoneNumber: string, applicationData: ApplicationMessage): void {
    try {
      const message = this.generateApplicationMessage(applicationData);
      const url = this.createWhatsAppUrl(phoneNumber, message);
      
      // Open in new tab/window
      window.open(url, '_blank', 'noopener,noreferrer');
      
      // Log application attempt (for analytics)
      this.logApplicationAttempt(applicationData);
      
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      throw new Error('Failed to open WhatsApp. Please check the phone number and try again.');
    }
  }

  // Quick apply with minimal information
  quickApply(phoneNumber: string, collegeName: string, studentInfo?: Partial<ApplicationMessage>): void {
    const applicationData: ApplicationMessage = {
      studentName: studentInfo?.studentName || 'Prospective Student',
      studentEmail: studentInfo?.studentEmail || 'Not provided',
      studentPhone: studentInfo?.studentPhone,
      studentEducation: studentInfo?.studentEducation,
      studentMarks: studentInfo?.studentMarks,
      studentAchievements: studentInfo?.studentAchievements,
      collegeName,
      message: studentInfo?.message
    };

    this.openWhatsApp(phoneNumber, applicationData);
  }

  // Validate phone number format
  validatePhoneNumber(phoneNumber: string): boolean {
    // Basic validation for international phone numbers
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    return phoneRegex.test(cleanNumber);
  }

  // Format phone number for display
  formatPhoneNumber(phoneNumber: string): string {
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    // If it starts with +, keep it; otherwise add +
    if (cleanNumber.startsWith('+')) {
      return cleanNumber;
    } else {
      return `+${cleanNumber}`;
    }
  }

  // Log application attempt for analytics
  private logApplicationAttempt(applicationData: ApplicationMessage): void {
    try {
      const logEntry = {
        ...applicationData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };

      // Store in localStorage for now (in production, send to analytics service)
      const existingLogs = JSON.parse(localStorage.getItem('collzy_application_logs') || '[]');
      existingLogs.push(logEntry);
      
      // Keep only last 100 logs
      if (existingLogs.length > 100) {
        existingLogs.splice(0, existingLogs.length - 100);
      }
      
      localStorage.setItem('collzy_application_logs', JSON.stringify(existingLogs));
      
      console.log('Application attempt logged:', logEntry);
      
    } catch (error) {
      console.error('Error logging application attempt:', error);
    }
  }

  // Get application statistics
  getApplicationStats(): {
    totalApplications: number;
    applicationsToday: number;
    topColleges: Array<{ name: string; count: number }>;
  } {
    try {
      const logs = JSON.parse(localStorage.getItem('collzy_application_logs') || '[]');
      const today = new Date().toDateString();
      
      const totalApplications = logs.length;
      const applicationsToday = logs.filter((log: any) => 
        new Date(log.timestamp).toDateString() === today
      ).length;

      // Count applications per college
      const collegeStats: { [key: string]: number } = {};
      logs.forEach((log: any) => {
        collegeStats[log.collegeName] = (collegeStats[log.collegeName] || 0) + 1;
      });

      // Get top 5 colleges by application count
      const topColleges = Object.entries(collegeStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

      return {
        totalApplications,
        applicationsToday,
        topColleges
      };
      
    } catch (error) {
      console.error('Error getting application stats:', error);
      return {
        totalApplications: 0,
        applicationsToday: 0,
        topColleges: []
      };
    }
  }

  // Check if WhatsApp is available (mobile detection)
  isWhatsAppAvailable(): boolean {
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // WhatsApp web works on desktop too, so return true
    return true;
  }

  // Generate different message templates
  generateMessageTemplate(
    type: 'inquiry' | 'application' | 'scholarship' | 'visit',
    data: ApplicationMessage
  ): string {
    const templates = {
      inquiry: `
Hi! I'm ${data.studentName} and I'm interested in learning more about ${data.collegeName}.

Could you please provide information about:
- Available programs and courses
- Admission requirements
- Application deadlines
- Campus life and facilities

Contact: ${data.studentEmail}

Thank you!
      `,
      
      application: `
Dear Admissions Team,

I'm ${data.studentName} and I would like to apply to ${data.collegeName}.

Could you please guide me through:
- Application process and requirements
- Required documents
- Application deadlines
- Tuition fees and financial aid

My email: ${data.studentEmail}

Looking forward to your response.

Best regards,
${data.studentName}
      `,
      
      scholarship: `
Hello,

I'm ${data.studentName}, interested in ${data.collegeName} and exploring scholarship opportunities.

Could you provide information about:
- Available scholarships and grants
- Eligibility criteria
- Application process for financial aid
- Merit-based opportunities

Contact: ${data.studentEmail}

Thank you for your assistance.
      `,
      
      visit: `
Hi,

I'm ${data.studentName} and I'm planning to visit ${data.collegeName}.

Could you help me arrange:
- Campus tour
- Meeting with admissions counselor
- Information session
- Accommodation recommendations

Contact: ${data.studentEmail}

Thank you!
      `
    };

    return templates[type].trim();
  }
}

// Export singleton instance
export const whatsAppService = new WhatsAppService();

// Export types
export type { ApplicationMessage };