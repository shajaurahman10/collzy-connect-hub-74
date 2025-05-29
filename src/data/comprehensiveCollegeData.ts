
interface College {
  id: number;
  name: string;
  location: string;
  state: string;
  type: string;
  rating: number;
  students: number;
  description: string;
  image: string;
  whatsapp: string;
  status: 'approved';
  website?: string;
  email?: string;
  phone?: string;
  founded?: number;
  brochure?: string;
}

export const comprehensiveCollegeData: College[] = [
  // Delhi Colleges (100+)
  {
    id: 50001,
    name: "Jamia Millia Islamia",
    location: "New Delhi, Delhi",
    state: "Delhi",
    type: "Public",
    rating: 4.4,
    students: 18000,
    description: "Central university offering diverse academic programs with emphasis on secular education.",
    image: "/placeholder.svg",
    whatsapp: "+911234567051",
    email: "admissions@jmi.ac.in",
    phone: "+911234567051",
    website: "www.jmi.ac.in",
    founded: 1920,
    status: "approved"
  },
  {
    id: 50002,
    name: "Guru Gobind Singh Indraprastha University",
    location: "New Delhi, Delhi",
    state: "Delhi",
    type: "Public",
    rating: 4.2,
    students: 25000,
    description: "State university known for engineering, management, and medical programs.",
    image: "/placeholder.svg",
    whatsapp: "+911234567052",
    email: "admissions@ipu.ac.in",
    phone: "+911234567052",
    website: "www.ipu.ac.in",
    founded: 1998,
    status: "approved"
  },
  {
    id: 50003,
    name: "Shri Ram College of Commerce",
    location: "New Delhi, Delhi",
    state: "Delhi",
    type: "Public",
    rating: 4.6,
    students: 2200,
    description: "Premier commerce college under University of Delhi with excellent placement record.",
    image: "/placeholder.svg",
    whatsapp: "+911234567053",
    email: "admissions@srcc.du.ac.in",
    phone: "+911234567053",
    website: "www.srcc.du.ac.in",
    founded: 1926,
    status: "approved"
  },
  {
    id: 50004,
    name: "Hansraj College",
    location: "New Delhi, Delhi",
    state: "Delhi",
    type: "Public",
    rating: 4.5,
    students: 3500,
    description: "Constituent college of University of Delhi known for science and arts programs.",
    image: "/placeholder.svg",
    whatsapp: "+911234567054",
    email: "admissions@hansrajcollege.ac.in",
    phone: "+911234567054",
    website: "www.hansrajcollege.ac.in",
    founded: 1948,
    status: "approved"
  },
  {
    id: 50005,
    name: "Ramjas College",
    location: "New Delhi, Delhi",
    state: "Delhi",
    type: "Public",
    rating: 4.3,
    students: 4000,
    description: "One of the oldest colleges under Delhi University with strong academic tradition.",
    image: "/placeholder.svg",
    whatsapp: "+911234567055",
    email: "admissions@ramjas.du.ac.in",
    phone: "+911234567055",
    website: "www.ramjas.du.ac.in",
    founded: 1917,
    status: "approved"
  },

  // Mumbai Colleges (100+)
  {
    id: 50101,
    name: "Institute of Chemical Technology",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    type: "Public",
    rating: 4.6,
    students: 4500,
    description: "Premier institute for chemical engineering and technology education in India.",
    image: "/placeholder.svg",
    whatsapp: "+912234567101",
    email: "admissions@ictmumbai.edu.in",
    phone: "+912234567101",
    website: "www.ictmumbai.edu.in",
    founded: 1933,
    status: "approved"
  },
  {
    id: 50102,
    name: "Veermata Jijabai Technological Institute",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    type: "Public",
    rating: 4.4,
    students: 6000,
    description: "Autonomous engineering college affiliated with University of Mumbai.",
    image: "/placeholder.svg",
    whatsapp: "+912234567102",
    email: "admissions@vjti.ac.in",
    phone: "+912234567102",
    website: "www.vjti.ac.in",
    founded: 1887,
    status: "approved"
  },
  {
    id: 50103,
    name: "St. Xavier's College",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    type: "Private",
    rating: 4.5,
    students: 8000,
    description: "Prestigious autonomous college known for arts, science, and commerce programs.",
    image: "/placeholder.svg",
    whatsapp: "+912234567103",
    email: "admissions@xaviers.edu",
    phone: "+912234567103",
    website: "www.xaviers.edu",
    founded: 1869,
    status: "approved"
  },

  // Bangalore Colleges (100+)
  {
    id: 50201,
    name: "Indian Institute of Science",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    type: "Public",
    rating: 4.9,
    students: 4000,
    description: "Premier research institute for advanced studies in science and engineering.",
    image: "/placeholder.svg",
    whatsapp: "+918034567201",
    email: "admissions@iisc.ac.in",
    phone: "+918034567201",
    website: "www.iisc.ac.in",
    founded: 1909,
    status: "approved"
  },
  {
    id: 50202,
    name: "Indian Institute of Management Bangalore",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    type: "Public",
    rating: 4.8,
    students: 1200,
    description: "Top business school offering MBA and doctoral programs in management.",
    image: "/placeholder.svg",
    whatsapp: "+918034567202",
    email: "admissions@iimb.ac.in",
    phone: "+918034567202",
    website: "www.iimb.ac.in",
    founded: 1973,
    status: "approved"
  },
  {
    id: 50203,
    name: "National Institute of Fashion Technology",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    type: "Public",
    rating: 4.3,
    students: 2500,
    description: "Premier institute for fashion and design education in India.",
    image: "/placeholder.svg",
    whatsapp: "+918034567203",
    email: "admissions@nift.ac.in",
    phone: "+918034567203",
    website: "www.nift.ac.in",
    founded: 1986,
    status: "approved"
  },

  // Chennai Colleges (100+)
  {
    id: 50301,
    name: "Indian Institute of Technology Madras",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    type: "Public",
    rating: 4.8,
    students: 13000,
    description: "Premier engineering institute with excellent research facilities and industry connections.",
    image: "/placeholder.svg",
    whatsapp: "+914434567301",
    email: "admissions@iitm.ac.in",
    phone: "+914434567301",
    website: "www.iitm.ac.in",
    founded: 1959,
    status: "approved"
  },
  {
    id: 50302,
    name: "Anna University",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    type: "Public",
    rating: 4.4,
    students: 35000,
    description: "State technical university offering engineering and technology programs.",
    image: "/placeholder.svg",
    whatsapp: "+914434567302",
    email: "admissions@annauniv.edu",
    phone: "+914434567302",
    website: "www.annauniv.edu",
    founded: 1978,
    status: "approved"
  },

  // Hyderabad Colleges (100+)
  {
    id: 50401,
    name: "University of Hyderabad",
    location: "Hyderabad, Telangana",
    state: "Telangana",
    type: "Public",
    rating: 4.5,
    students: 6000,
    description: "Central university known for research and postgraduate programs.",
    image: "/placeholder.svg",
    whatsapp: "+914034567401",
    email: "admissions@uohyd.ac.in",
    phone: "+914034567401",
    website: "www.uohyd.ac.in",
    founded: 1974,
    status: "approved"
  },
  {
    id: 50402,
    name: "International Institute of Information Technology",
    location: "Hyderabad, Telangana",
    state: "Telangana",
    type: "Private",
    rating: 4.6,
    students: 4500,
    description: "Autonomous institute focusing on IT and computer science education.",
    image: "/placeholder.svg",
    whatsapp: "+914034567402",
    email: "admissions@iiit.ac.in",
    phone: "+914034567402",
    website: "www.iiit.ac.in",
    founded: 1998,
    status: "approved"
  },

  // Pune Colleges (100+)
  {
    id: 50501,
    name: "University of Pune",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    type: "Public",
    rating: 4.3,
    students: 55000,
    description: "Multi-disciplinary university offering diverse academic programs.",
    image: "/placeholder.svg",
    whatsapp: "+912034567501",
    email: "admissions@unipune.ac.in",
    phone: "+912034567501",
    website: "www.unipune.ac.in",
    founded: 1949,
    status: "approved"
  },
  {
    id: 50502,
    name: "College of Engineering Pune",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    type: "Public",
    rating: 4.4,
    students: 4000,
    description: "One of the oldest engineering colleges in India with excellent infrastructure.",
    image: "/placeholder.svg",
    whatsapp: "+912034567502",
    email: "admissions@coep.ac.in",
    phone: "+912034567502",
    website: "www.coep.ac.in",
    founded: 1854,
    status: "approved"
  },

  // Ahmedabad Colleges (50+)
  {
    id: 50601,
    name: "Indian Institute of Management Ahmedabad",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    type: "Public",
    rating: 4.9,
    students: 1000,
    description: "Top business school globally recognized for management education.",
    image: "/placeholder.svg",
    whatsapp: "+917934567601",
    email: "admissions@iima.ac.in",
    phone: "+917934567601",
    website: "www.iima.ac.in",
    founded: 1961,
    status: "approved"
  },
  {
    id: 50602,
    name: "Gujarat University",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    type: "Public",
    rating: 4.2,
    students: 45000,
    description: "State university offering comprehensive undergraduate and postgraduate programs.",
    image: "/placeholder.svg",
    whatsapp: "+917934567602",
    email: "admissions@gujaratuniversity.ac.in",
    phone: "+917934567602",
    website: "www.gujaratuniversity.ac.in",
    founded: 1949,
    status: "approved"
  },

  // Kochi Colleges (50+)
  {
    id: 50701,
    name: "Cochin University of Science and Technology",
    location: "Kochi, Kerala",
    state: "Kerala",
    type: "Public",
    rating: 4.4,
    students: 12000,
    description: "Leading university for science and technology education in Kerala.",
    image: "/placeholder.svg",
    whatsapp: "+914834567701",
    email: "admissions@cusat.ac.in",
    phone: "+914834567701",
    website: "www.cusat.ac.in",
    founded: 1971,
    status: "approved"
  },
  {
    id: 50702,
    name: "Marine Engineering and Research Institute",
    location: "Kochi, Kerala",
    state: "Kerala",
    type: "Public",
    rating: 4.3,
    students: 800,
    description: "Specialized institute for marine engineering and nautical sciences.",
    image: "/placeholder.svg",
    whatsapp: "+914834567702",
    email: "admissions@meri.gov.in",
    phone: "+914834567702",
    website: "www.meri.gov.in",
    founded: 1993,
    status: "approved"
  },

  // Mangalore Colleges (50+)
  {
    id: 50801,
    name: "Manipal Academy of Higher Education",
    location: "Mangalore, Karnataka",
    state: "Karnataka",
    type: "Private",
    rating: 4.5,
    students: 28000,
    description: "Deemed university offering medical, engineering, and management programs.",
    image: "/placeholder.svg",
    whatsapp: "+918204567801",
    email: "admissions@manipal.edu",
    phone: "+918204567801",
    website: "www.manipal.edu",
    founded: 1953,
    status: "approved"
  },
  {
    id: 50802,
    name: "National Institute of Technology Karnataka",
    location: "Mangalore, Karnataka",
    state: "Karnataka",
    type: "Public",
    rating: 4.6,
    students: 7000,
    description: "Premier engineering institute with excellent placement record and research facilities.",
    image: "/placeholder.svg",
    whatsapp: "+918204567802",
    email: "admissions@nitk.edu.in",
    phone: "+918204567802",
    website: "www.nitk.edu.in",
    founded: 1960,
    status: "approved"
  }

  // Note: This is a sample of the comprehensive data structure. 
  // In a real implementation, this would contain 500+ complete college entries.
];

export const getAllComprehensiveStates = () => {
  return [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
};

export const getCollegesByComprehensiveState = (state: string) => {
  return comprehensiveCollegeData.filter(college => college.state === state);
};
