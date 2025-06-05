
// East India Private Colleges Database
export const eastIndiaPrivateColleges = [
  // Odisha Colleges
  {
    id: 3101,
    name: "KIIT University",
    location: "Bhubaneswar, Odisha",
    state: "Odisha", 
    type: "Private",
    rating: 4.3,
    students: 25000,
    description: "Premier private university known for engineering, management and medical education.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543310",
    website: "kiit.ac.in",
    email: "admissions@kiit.ac.in",
    phone: "+91-674-2725466",
    founded: 2004,
    brochure: "https://kiit.ac.in/brochure.pdf",
    status: "approved"
  },
  {
    id: 3102,
    name: "Siksha 'O' Anusandhan University",
    location: "Bhubaneswar, Odisha",
    state: "Odisha",
    type: "Private",
    rating: 4.1,
    students: 15000,
    description: "Deemed university with focus on engineering, medicine and management education.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543311",
    website: "soa.ac.in",
    email: "admissions@soa.ac.in",
    phone: "+91-674-2351777",
    founded: 2007,
    brochure: "https://soa.ac.in/brochure.pdf",
    status: "approved"
  },
  {
    id: 3103,
    name: "Centurion University",
    location: "Bhubaneswar, Odisha",
    state: "Odisha",
    type: "Private",
    rating: 3.9,
    students: 8000,
    description: "Multi-campus university with focus on skill-based education and rural development.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543312",
    website: "cutm.ac.in",
    email: "admissions@cutm.ac.in", 
    phone: "+91-674-2386331",
    founded: 2010,
    brochure: "https://cutm.ac.in/brochure.pdf",
    status: "approved"
  },
  
  // Jharkhand Colleges
  {
    id: 3201,
    name: "Birla Institute of Technology",
    location: "Mesra, Ranchi, Jharkhand",
    state: "Jharkhand",
    type: "Private",
    rating: 4.4,
    students: 13000,
    description: "Premier technical institute known for engineering and technology education.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543320",
    website: "bitmesra.ac.in",
    email: "admissions@bitmesra.ac.in",
    phone: "+91-651-2275444",
    founded: 1955,
    brochure: "https://bitmesra.ac.in/brochure.pdf",
    status: "approved"
  },
  {
    id: 3202,
    name: "Usha Martin University",
    location: "Ranchi, Jharkhand",
    state: "Jharkhand",
    type: "Private",
    rating: 3.8,
    students: 5000,
    description: "Multi-disciplinary university with focus on professional education and research.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543321",
    website: "ushamartinuniversity.com",
    email: "admissions@ushamartinuniversity.com",
    phone: "+91-651-2270270",
    founded: 2012,
    brochure: "https://ushamartinuniversity.com/brochure.pdf",
    status: "approved"
  },
  
  // Assam Colleges
  {
    id: 3301,
    name: "Kaziranga University",
    location: "Jorhat, Assam",
    state: "Assam",
    type: "Private",
    rating: 3.9,
    students: 6000,
    description: "Private university focusing on liberal arts, sciences and professional education.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543330",
    website: "kazirangauniversity.in",
    email: "admissions@kazirangauniversity.in",
    phone: "+91-376-2370760",
    founded: 2012,
    brochure: "https://kazirangauniversity.in/brochure.pdf",
    status: "approved"
  },
  {
    id: 3302,
    name: "Assam Down Town University",
    location: "Guwahati, Assam",
    state: "Assam",
    type: "Private",
    rating: 3.7,
    students: 4500,
    description: "Modern university with focus on healthcare, engineering and management education.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543331",
    website: "adtu.in",
    email: "admissions@adtu.in",
    phone: "+91-361-2273000",
    founded: 2010,
    brochure: "https://adtu.in/brochure.pdf",
    status: "approved"
  },
  
  // Bihar Colleges
  {
    id: 3801,
    name: "Aryabhatta Knowledge University",
    location: "Patna, Bihar",
    state: "Bihar",
    type: "Private",
    rating: 3.7,
    students: 8500,
    description: "Knowledge university focusing on technology and professional education.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543380",
    website: "aku.ac.in",
    email: "admissions@aku.ac.in",
    phone: "+91-612-2367532",
    founded: 2008,
    brochure: "https://aku.ac.in/brochure.pdf",
    status: "approved"
  },
  {
    id: 3802,
    name: "Chandragupt Institute of Management",
    location: "Patna, Bihar",
    state: "Bihar",
    type: "Private",
    rating: 4.0,
    students: 1200,
    description: "Premier management institute with excellent placement record and industry connections.",
    image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png",
    whatsapp: "919876543381",
    website: "cimp.ac.in",
    email: "admissions@cimp.ac.in",
    phone: "+91-612-2302071",
    founded: 2008,
    brochure: "https://cimp.ac.in/brochure.pdf",
    status: "approved"
  }
];

export const getEastIndiaPrivateStates = () => {
  const states = Array.from(new Set(eastIndiaPrivateColleges.map(college => college.state)));
  return states.sort();
};
