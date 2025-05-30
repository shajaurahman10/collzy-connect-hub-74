
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
  email: string;
}

export const generateApplicationEmail = (student: StudentProfile, college: College): EmailData => {
  const subject = `Admission Enquiry via Collzy - ${student.full_name}`;
  
  const body = `Dear ${college.name} Admissions Team,

I hope this email finds you well. I am ${student.full_name}, and I came across your esteemed institution through the Collzy platform. I am very interested in applying for admission and would like to request detailed information about your programs.

My Profile Details:
• Name: ${student.full_name}
• Email: ${student.email}
• Phone: ${student.phone}
• State: ${student.state}
• 12th Grade Marks: ${student.marks}
• Course Interest: ${student.course_interest}

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

You can also view my complete profile and verify my details through the Collzy platform: https://forms.gle/Cp2G5Lm5sNFe8eJu6

I am very enthusiastic about the prospect of joining your institution and would appreciate a prompt response. Please let me know if you need any additional information from my side.

Thank you for your time and consideration.

Best regards,
${student.full_name}
Email: ${student.email}
Phone: ${student.phone}

---
This inquiry was sent through Collzy - India's leading college discovery platform.
Visit: www.collzy.com`;

  return {
    to: college.email,
    subject,
    body
  };
};

export const openGmailCompose = (emailData: EmailData) => {
  const { to, subject, body } = emailData;
  
  // Create Gmail compose URL
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Open in new tab
  window.open(gmailUrl, '_blank');
};
