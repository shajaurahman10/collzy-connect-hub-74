
// Central India Private Colleges Database
export const centralIndiaPrivateColleges = [
  // Madhya Pradesh Colleges
  {
    id: 3601,
    name: "Oriental University",
    location: "Indore, Madhya Pradesh",
    state: "Madhya Pradesh",
    type: "Private",
    rating: 3.8,
    students: 8000,
    description: "Comprehensive university offering diverse programs with modern facilities.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543360",
    website: "orientaluniversity.in",
    email: "admissions@orientaluniversity.in",
    phone: "+91-731-2570901",
    founded: 2011,
    brochure: "https://orientaluniversity.in/brochure.pdf",
    status: "approved"
  },
  {
    id: 3602,
    name: "LNCT University",
    location: "Bhopal, Madhya Pradesh",
    state: "Madhya Pradesh",
    type: "Private",
    rating: 3.7,
    students: 7000,
    description: "Technology-focused university with strong industry partnerships and placement support.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543361",
    website: "lnctuniversity.ac.in",
    email: "admissions@lnctuniversity.ac.in",
    phone: "+91-755-6112200",
    founded: 2003,
    brochure: "https://lnctuniversity.ac.in/brochure.pdf",
    status: "approved"
  },
  {
    id: 3603,
    name: "Medi-Caps University",
    location: "Indore, Madhya Pradesh",
    state: "Madhya Pradesh",
    type: "Private",
    rating: 3.9,
    students: 9000,
    description: "Multi-disciplinary university with focus on engineering, management and healthcare.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543362",
    website: "medicaps.ac.in",
    email: "admissions@medicaps.ac.in",
    phone: "+91-731-2479730",
    founded: 2009,
    brochure: "https://medicaps.ac.in/brochure.pdf",
    status: "approved"
  },
  
  // Chhattisgarh Colleges
  {
    id: 3701,
    name: "Kalinga University",
    location: "Raipur, Chhattisgarh",
    state: "Chhattisgarh",
    type: "Private",
    rating: 3.8,
    students: 10000,
    description: "Modern university with focus on engineering, management and applied sciences.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543370",
    website: "kalingauniversity.ac.in",
    email: "admissions@kalingauniversity.ac.in",
    phone: "+91-771-2596222",
    founded: 2007,
    brochure: "https://kalingauniversity.ac.in/brochure.pdf",
    status: "approved"
  },
  {
    id: 3702,
    name: "ISBM University",
    location: "Raipur, Chhattisgarh",
    state: "Chhattisgarh",
    type: "Private",
    rating: 3.6,
    students: 5000,
    description: "University focusing on management, technology and professional education.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543371",
    website: "isbmuniversity.edu.in",
    email: "admissions@isbmuniversity.edu.in",
    phone: "+91-771-2442293",
    founded: 2008,
    brochure: "https://isbmuniversity.edu.in/brochure.pdf",
    status: "approved"
  }
];

export const getCentralIndiaPrivateStates = () => {
  const states = Array.from(new Set(centralIndiaPrivateColleges.map(college => college.state)));
  return states.sort();
};
