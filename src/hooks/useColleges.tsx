
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  rating: number;
  students: number;
  description: string;
  courses: string[];
  email: string;
  phone: string;
  website: string;
  image?: string;
  founded: number;
  status: string;
}

interface PrivateCollege {
  id: number;
  name: string;
  city: string;
  state: string;
  website: string;
  admission_email: string;
  contact_number: string;
  affiliation: string;
  naac_grade: string;
  created_at: string;
}

// Comprehensive fallback data for private colleges across India
const fallbackPrivateColleges: PrivateCollege[] = [
  // Delhi Private Colleges
  {
    id: 1,
    name: "Amity University Delhi",
    city: "New Delhi",
    state: "Delhi",
    website: "https://www.amity.edu",
    admission_email: "admissions@amity.edu",
    contact_number: "011-43888888",
    affiliation: "UGC",
    naac_grade: "A+",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Bharati Vidyapeeth University Delhi",
    city: "New Delhi",
    state: "Delhi",
    website: "https://www.bharatividyapeeth.edu",
    admission_email: "admissions@bvuniversitydelhi.ac.in",
    contact_number: "011-25275386",
    affiliation: "UGC",
    naac_grade: "A",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Guru Gobind Singh Indraprastha University",
    city: "New Delhi",
    state: "Delhi",
    website: "http://www.ipu.ac.in",
    admission_email: "registrar@ipu.ac.in",
    contact_number: "011-23863207",
    affiliation: "UGC",
    naac_grade: "A",
    created_at: "2024-01-01T00:00:00Z"
  },

  // Maharashtra Private Colleges
  {
    id: 4,
    name: "Symbiosis International University",
    city: "Pune",
    state: "Maharashtra",
    website: "https://www.siu.edu.in",
    admission_email: "admissions@siu.edu.in",
    contact_number: "020-28116000",
    affiliation: "UGC",
    naac_grade: "A++",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 5,
    name: "MIT World Peace University",
    city: "Pune",
    state: "Maharashtra",
    website: "https://www.mitwpu.edu.in",
    admission_email: "admissions@mitwpu.edu.in",
    contact_number: "020-71177104",
    affiliation: "UGC",
    naac_grade: "A+",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 6,
    name: "Flame University",
    city: "Pune",
    state: "Maharashtra",
    website: "https://www.flame.edu.in",
    admission_email: "admissions@flame.edu.in",
    contact_number: "020-71289400",
    affiliation: "UGC",
    naac_grade: "A",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 7,
    name: "D.Y. Patil University",
    city: "Navi Mumbai",
    state: "Maharashtra",
    website: "https://www.dypatil.edu",
    admission_email: "admissions@dypatil.edu",
    contact_number: "022-39872999",
    affiliation: "UGC",
    naac_grade: "A",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 8,
    name: "Bennett University",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    website: "https://www.bennett.edu.in",
    admission_email: "admissions@bennett.edu.in",
    contact_number: "0120-7121021",
    affiliation: "UGC",
    naac_grade: "A+",
    created_at: "2024-01-01T00:00:00Z"
  },

  // Karnataka Private Colleges
  {
    id: 9,
    name: "Manipal Academy of Higher Education",
    city: "Manipal",
    state: "Karnataka",
    website: "https://www.manipal.edu",
    admission_email: "admissions@manipal.edu",
    contact_number: "0820-2925085",
    affiliation: "UGC",
    naac_grade: "A++",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 10,
    name: "RV University",
    city: "Bangalore",
    state: "Karnataka",
    website: "https://www.rvu.edu.in",
    admission_email: "admissions@rvu.edu.in",
    contact_number: "080-67178000",
    affiliation: "UGC",
    naac_grade: "A+",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 11,
    name: "REVA University",
    city: "Bangalore",
    state: "Karnataka",
    website: "https://www.reva.edu.in",
    admission_email: "admissions@reva.edu.in",
    contact_number: "080-44474747",
    affiliation: "UGC",
    naac_grade: "A+",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 12,
    name: "Presidency University",
    city: "Bangalore",
    state: "Karnataka",
    website: "https://presidencyuniversity.in",
    admission_email: "admissions@presidencyuniversity.in",
    contact_number: "080-46909090",
    affiliation: "UGC",
    naac_grade: "A",
    created_at: "2024-01-01T00:00:00Z"
  },

  // Tamil Nadu Private Colleges
  {
    id: 13,
    name: "Vellore Institute of Technology",
    city: "Vellore",
    state: "Tamil Nadu",
    website: "https://www.vit.ac.in",
    admission_email: "admissions@vit.ac.in",
    contact_number: "0416-2202020",
    affiliation: "UGC",
    naac_grade: "A++",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 14,
    name: "Kalinga Institute of Industrial Technology",
    city: "Bhubaneswar",
    state: "Odisha",
    website: "https://www.kiit.ac.in",
    admission_email: "admissions@kiit.ac.in",
    contact_number: "0674-2725466",
    affiliation: "UGC",
    naac_grade: "A",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 15,
    name: "Hindustan Institute of Technology and Science",
    city: "Chennai",
    state: "Tamil Nadu",
    website: "https://www.hindustanuniv.ac.in",
    admission_email: "admissions@hindustanuniv.ac.in",
    contact_number: "044-22203348",
    affiliation: "UGC",
    naac_grade: "A+",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 16,
    name: "Sathyabama Institute of Science and Technology",
    city: "Chennai",
    state: "Tamil Nadu",
    website: "https://www.sathyabama.ac.in",
    admission_email: "admissions@sathyabama.ac.in",
    contact_number: "044-24503121",
    affiliation: "UGC",
    naac_grade: "A",
    created_at: "2024-01-01T00:00:00Z"
  },

  // West Bengal Private Colleges
  {
    id: 17,
    name: "Sister Nivedita University",
    city: "Kolkata",
    state: "West Bengal",
    website: "https://www.snuniv.ac.in",
    admission_email: "admissions@snuniv.ac.in",
    contact_number: "033-25820690",
    affiliation: "UGC",
    naac_grade: "A",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 18,
    name: "Techno India University",
    city: "Kolkata",
    state: "West Bengal",
    website: "https://www.technoindiauniversity.ac.in",
    admission_email: "admissions@technoindiauniversity.ac.in",
    contact_number: "033-66808080",
    affiliation: "UGC",
    naac_grade: "A",
    created_at: "2024-01-01T00:00:00Z"
  },

  // Gujarat Private Colleges
  {
    id: 19,
    name: "Ahmedabad University",
    city: "Ahmedabad",
    state: "Gujarat",
    website: "https://www.ahduni.edu.in",
    admission_email: "admissions@ahduni.edu.in",
    contact_number: "079-61911000",
    affiliation: "UGC",
    naac_grade: "A+",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 20,
    name: "Karnavati University",
    city: "Gandhinagar",
    state: "Gujarat",
    website: "https://www.karnavatiuniversity.edu.in",
    admission_email: "admissions@karnavatiuniversity.edu.in",
    contact_number: "079-39875000",
    affiliation: "UGC",
    naac_grade: "A",
    created_at: "2024-01-01T00:00:00Z"
  }
];

// Convert PrivateCollege to College format
const convertToCollegeFormat = (privateCollege: PrivateCollege): College => ({
  id: privateCollege.id.toString(),
  name: privateCollege.name,
  city: privateCollege.city,
  state: privateCollege.state,
  type: 'Private',
  rating: 4.0, // Default rating
  students: 5000, // Default student count
  description: `Private university in ${privateCollege.city}, ${privateCollege.state}`,
  courses: ['B.Tech.', 'MBA', 'B.A.', 'M.A.'],
  email: privateCollege.admission_email,
  phone: privateCollege.contact_number,
  website: privateCollege.website,
  founded: 2000,
  status: 'approved'
});

export const useColleges = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [privateColleges, setPrivateColleges] = useState<PrivateCollege[]>(fallbackPrivateColleges);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      // Try to fetch from private_colleges table
      const { data: privateData, error: privateError } = await supabase
        .from('private_colleges')
        .select('*')
        .order('name');

      if (privateData && privateData.length > 0) {
        setPrivateColleges(privateData);
        // Convert private colleges to college format
        const convertedColleges = privateData.map(convertToCollegeFormat);
        setColleges(convertedColleges);
      } else {
        // Use fallback data
        const convertedColleges = fallbackPrivateColleges.map(convertToCollegeFormat);
        setColleges(convertedColleges);
      }

      // Also try to fetch from main colleges table if it exists
      const { data: mainData, error: mainError } = await supabase
        .from('colleges')
        .select('*')
        .eq('status', 'approved')
        .order('name');

      if (mainData && mainData.length > 0) {
        // Combine both datasets, avoiding duplicates
        const existingNames = new Set(colleges.map(c => c.name.toLowerCase()));
        const uniqueMainColleges = mainData.filter((college: College) => 
          !existingNames.has(college.name.toLowerCase())
        );
        setColleges(prev => [...prev, ...uniqueMainColleges]);
      }

    } catch (err: any) {
      console.error('Error fetching colleges:', err);
      setError(err.message);
      // Use fallback data on error
      const convertedColleges = fallbackPrivateColleges.map(convertToCollegeFormat);
      setColleges(convertedColleges);
    } finally {
      setLoading(false);
    }
  };

  return { 
    colleges, 
    privateColleges, 
    loading, 
    error, 
    refetch: fetchColleges 
  };
};
