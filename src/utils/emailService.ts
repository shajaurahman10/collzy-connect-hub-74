
interface EmailData {
  to: string;
  subject: string;
  body: string;
}

interface StudentProfile {
  full_name: string;
  email: string;
  phone: string;
  state: string;
  marks: string;
  course_interest: string;
}

interface College {
  name: string;
  email?: string;
  admission_email?: string;
}

export const generateApplicationEmail = (student: StudentProfile, college: College): EmailData => {
  const collegeEmail = college.admission_email || college.email || '';
  const subject = `Admission Enquiry via Collzy - ${student.full_name}`;
  
  const body = `Dear ${college.name} Admissions Team,

I hope this email finds you well. I am ${student.full_name}, and I came across your esteemed institution through the Collzy platform. I am very interested in applying for admission and would like to request detailed information about your programs.

My Profile Details:
• Name: ${student.full_name}
• Email: ${student.email}
• Phone: ${student.phone || 'Not provided'}
• State: ${student.state || 'Not provided'}
• 12th Grade Marks: ${student.marks || 'Not provided'}
• Course Interest: ${student.course_interest || 'Not provided'}

I would be grateful if you could provide me with information about:

📚 Course Details:
- Available programs and specializations
- Eligibility criteria and prerequisites
- Duration and curriculum structure

💰 Fee Structure:
- Tuition fees (semester/annual)
- Additional charges (lab, library, sports, etc.)
- Payment schedule and scholarship opportunities

📅 Admission Process:
- Application deadlines and procedure
- Entrance exams (if any)
- Required documents and selection criteria

🏠 Accommodation:
- Hostel facilities and availability
- Accommodation fees and room types

🎯 Additional Information:
- Campus facilities and infrastructure
- Placement opportunities and statistics
- Student life and extracurricular activities

I am very enthusiastic about the prospect of joining your institution and would appreciate a prompt response. Please let me know if you need any additional information from my side.

Thank you for your time and consideration.

Best regards,
${student.full_name}
Email: ${student.email}
Phone: ${student.phone || 'Not provided'}

---
This inquiry was sent through Collzy - India's leading college discovery platform.
Contact us: collzy.info@gmail.com | WhatsApp: +91 8129913205`;

  return {
    to: collegeEmail,
    subject,
    body
  };
};

export const openGmailCompose = (emailData: EmailData) => {
  const { to, subject, body } = emailData;
  
  if (!to) {
    throw new Error('No email address available');
  }
  
  // Create Gmail compose URL
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Open in new tab
  window.open(gmailUrl, '_blank');
};

export const openDefaultEmail = (emailData: EmailData) => {
  const { to, subject, body } = emailData;
  
  if (!to) {
    throw new Error('No email address available');
  }
  
  // Fallback to mailto
  const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
};
