
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { privateColleges } from '@/data/privateColleges';

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  established_year: number;
  affiliation: string;
  naac_grade: string;
  nirf_ranking?: number;
  website?: string;
  admission_email?: string;
  phone?: string;
  address?: string;
  courses_offered: string[];
  total_fees: number;
  hostel_available: boolean;
  placement_percentage: number;
  average_package: number;
  highest_package: number;
  accreditations?: string[];
  facilities?: string[];
  campus_size?: string;
  student_strength?: number;
  faculty_count?: number;
  library_books?: number;
  image_url?: string;
  brochure_url?: string;
  virtual_tour_url?: string;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

interface EntranceExam {
  id: string;
  name: string;
  full_name: string;
  conducting_body: string;
  exam_level: string;
  exam_type: string;
  exam_date?: string;
  application_start_date?: string;
  application_end_date?: string;
  registration_fee?: number;
  official_website: string;
  eligibility_criteria?: string;
  exam_pattern?: string;
  syllabus_url?: string;
  description?: string;
  participating_colleges?: string[];
  logo_url?: string;
  status: string;
  created_at: string;
}

// Convert private college data to match College interface
const convertPrivateCollegeData = (privateCollegeData: any[]): College[] => {
  return privateCollegeData.map(college => ({
    id: college.id,
    name: college.name,
    city: college.city,
    state: college.state,
    type: college.type,
    established_year: college.established_year,
    affiliation: college.affiliation,
    naac_grade: college.naac_grade,
    website: college.website,
    admission_email: college.admission_email,
    phone: college.phone,
    courses_offered: college.courses_offered,
    total_fees: college.total_fees,
    hostel_available: college.hostel_available,
    placement_percentage: college.placement_percentage,
    average_package: college.average_package,
    highest_package: college.highest_package,
    student_strength: college.student_strength,
    status: 'active',
    featured: false,
    created_at: college.created_at,
    updated_at: college.created_at
  }));
};

// Convert all private colleges data
const allPrivateColleges = convertPrivateCollegeData(privateColleges);

// Additional guaranteed colleges for diversity
const additionalColleges: College[] = [
  {
    id: 'iit-madras-1',
    name: 'Indian Institute of Technology Madras',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Government',
    established_year: 1959,
    affiliation: 'Autonomous',
    naac_grade: 'A++',
    nirf_ranking: 1,
    website: 'https://iitm.ac.in',
    admission_email: 'admissions@iitm.ac.in',
    phone: '+91-44-2257-4802',
    address: 'Sardar Patel Road, Adyar, Chennai - 600036',
    courses_offered: ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech Electrical', 'M.Tech', 'PhD'],
    total_fees: 200000,
    hostel_available: true,
    placement_percentage: 100,
    average_package: 2000000,
    highest_package: 5000000,
    accreditations: ['NAAC A++', 'NBA Accredited'],
    facilities: ['World-class Research Labs', 'Central Library', 'Hostels', 'Sports Complex', 'Medical Center'],
    campus_size: '617 acres',
    student_strength: 10000,
    faculty_count: 600,
    library_books: 500000,
    status: 'active',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'iit-delhi-2',
    name: 'Indian Institute of Technology Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'Government',
    established_year: 1961,
    affiliation: 'Autonomous',
    naac_grade: 'A++',
    nirf_ranking: 2,
    website: 'https://iitd.ac.in',
    admission_email: 'admissions@iitd.ac.in',
    phone: '+91-11-2659-1606',
    address: 'Hauz Khas, New Delhi - 110016',
    courses_offered: ['B.Tech Computer Science', 'B.Tech Civil', 'B.Tech Chemical', 'M.Tech', 'PhD'],
    total_fees: 200000,
    hostel_available: true,
    placement_percentage: 98,
    average_package: 1900000,
    highest_package: 4800000,
    accreditations: ['NAAC A++', 'NBA Accredited'],
    facilities: ['Advanced Research Labs', 'Central Library', 'Hostels', 'Sports Facilities'],
    campus_size: '320 acres',
    student_strength: 8500,
    faculty_count: 550,
    library_books: 400000,
    status: 'active',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'nit-calicut-8',
    name: 'National Institute of Technology Calicut',
    city: 'Kozhikode',
    state: 'Kerala',
    type: 'Government',
    established_year: 1961,
    affiliation: 'NIT',
    naac_grade: 'A++',
    nirf_ranking: 23,
    website: 'https://nitc.ac.in',
    admission_email: 'admissions@nitc.ac.in',
    phone: '+91-495-228-6100',
    address: 'NIT Campus P.O, Kozhikode - 673601',
    courses_offered: ['B.Tech Computer Science', 'B.Tech Electronics', 'B.Tech Mechanical', 'B.Tech Civil', 'M.Tech', 'PhD'],
    total_fees: 150000,
    hostel_available: true,
    placement_percentage: 98,
    average_package: 1800000,
    highest_package: 4200000,
    accreditations: ['NAAC A++', 'NBA Accredited', 'MHRD Recognition'],
    facilities: ['Research Centers', 'Central Library', 'Hostels', 'Sports Complex', 'Health Center'],
    campus_size: '300 acres',
    student_strength: 6000,
    faculty_count: 300,
    library_books: 200000,
    status: 'active',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const guaranteedEntranceExams: EntranceExam[] = [
  {
    id: 'jee-main-2024',
    name: 'JEE Main',
    full_name: 'Joint Entrance Examination Main',
    conducting_body: 'National Testing Agency (NTA)',
    exam_level: 'National',
    exam_type: 'Engineering',
    exam_date: '2024-04-04',
    application_start_date: '2024-02-01',
    application_end_date: '2024-03-15',
    registration_fee: 1000,
    official_website: 'https://jeemain.nta.nic.in',
    eligibility_criteria: '12th pass with 75% marks in PCM',
    exam_pattern: 'Computer Based Test (CBT)',
    description: 'National level entrance examination for admission to NITs, IIITs, and other centrally funded technical institutions',
    participating_colleges: ['All NITs', 'All IIITs', 'All GFTIs', 'Selected State Engineering Colleges'],
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: 'keam-2024',
    name: 'KEAM',
    full_name: 'Kerala Engineering Agriculture Medical',
    conducting_body: 'Commissioner for Entrance Examinations, Kerala',
    exam_level: 'State',
    exam_type: 'Engineering',
    exam_date: '2024-06-05',
    application_start_date: '2024-03-15',
    application_end_date: '2024-04-15',
    registration_fee: 500,
    official_website: 'https://cee.kerala.gov.in',
    eligibility_criteria: '12th pass with Physics, Chemistry, Mathematics',
    exam_pattern: 'Objective type questions - Paper I & Paper II',
    description: 'State level entrance exam for Engineering, Agriculture and Medical courses in Kerala',
    participating_colleges: ['All Kerala Government Engineering Colleges', 'Most Private Engineering Colleges in Kerala', 'Medical Colleges in Kerala'],
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: 'neet-2024',
    name: 'NEET',
    full_name: 'National Eligibility cum Entrance Test',
    conducting_body: 'National Testing Agency (NTA)',
    exam_level: 'National',
    exam_type: 'Medical',
    exam_date: '2024-05-05',
    application_start_date: '2024-02-01',
    application_end_date: '2024-03-15',
    registration_fee: 1700,
    official_website: 'https://neet.nta.nic.in',
    eligibility_criteria: '12th pass with Physics, Chemistry, Biology',
    exam_pattern: 'Pen and Paper Based Test',
    description: 'National level entrance exam for MBBS, BDS, and other medical courses',
    participating_colleges: ['All Government Medical Colleges', 'All Private Medical Colleges', 'Deemed Medical Universities'],
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: 'gate-2024',
    name: 'GATE',
    full_name: 'Graduate Aptitude Test in Engineering',
    conducting_body: 'IIT Kharagpur (2024)',
    exam_level: 'National',
    exam_type: 'Engineering',
    exam_date: '2024-02-03',
    application_start_date: '2023-08-30',
    application_end_date: '2023-09-21',
    registration_fee: 1850,
    official_website: 'https://gate.iitkgp.ac.in',
    eligibility_criteria: 'Bachelor\'s degree in Engineering/Technology',
    exam_pattern: 'Computer Based Test (CBT)',
    description: 'Graduate level entrance exam for M.Tech admissions and PSU recruitments',
    participating_colleges: ['All IITs', 'All NITs', 'All IIITs', 'Central Universities'],
    status: 'active',
    created_at: new Date().toISOString()
  }
];

export const useColleges = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [entranceExams, setEntranceExams] = useState<EntranceExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useColleges hook initializing...');
    
    // Combine all private colleges with additional colleges
    const allColleges = [...allPrivateColleges, ...additionalColleges];
    
    setColleges(allColleges);
    setEntranceExams(guaranteedEntranceExams);
    setLoading(false);
    
    console.log('Set college data:', allColleges.length, 'colleges,', guaranteedEntranceExams.length, 'exams');
    
    // Try to fetch additional data in background without affecting the UI
    fetchAdditionalData();
  }, []);

  const fetchAdditionalData = async () => {
    try {
      console.log('Attempting to fetch additional data from Supabase...');
      
      const [collegesResponse, examsResponse] = await Promise.allSettled([
        supabase.from('colleges').select('*').eq('status', 'active').limit(20),
        supabase.from('entrance_exams').select('*').eq('status', 'active').limit(10)
      ]);

      // Only append additional data if we get valid responses
      if (collegesResponse.status === 'fulfilled' && 
          collegesResponse.value.data && 
          collegesResponse.value.data.length > 0) {
        console.log('Found additional colleges from database:', collegesResponse.value.data.length);
        // Merge unique colleges (avoid duplicates)
        setColleges(prev => {
          const existingIds = new Set(prev.map(c => c.id));
          const newColleges = collegesResponse.value.data.filter(c => !existingIds.has(c.id));
          return [...prev, ...newColleges];
        });
      }

      if (examsResponse.status === 'fulfilled' && 
          examsResponse.value.data && 
          examsResponse.value.data.length > 0) {
        console.log('Found additional exams from database:', examsResponse.value.data.length);
        setEntranceExams(prev => {
          const existingIds = new Set(prev.map(e => e.id));
          const newExams = examsResponse.value.data.filter(e => !existingIds.has(e.id));
          return [...prev, ...newExams];
        });
      }
      
    } catch (err) {
      console.log('Background fetch failed, but guaranteed data is already loaded:', err);
      // Don't set error state since we have working data
    }
  };

  const searchColleges = async (filters: {
    searchTerm?: string;
    state?: string;
    type?: string;
    course?: string;
    naacGrade?: string;
    maxFees?: number;
  }) => {
    try {
      console.log('Searching colleges with filters:', filters);
      
      // Search in current colleges data
      let results = colleges.filter(college => {
        if (filters.searchTerm) {
          const searchLower = filters.searchTerm.toLowerCase();
          if (!college.name.toLowerCase().includes(searchLower) && 
              !college.city.toLowerCase().includes(searchLower) &&
              !college.state.toLowerCase().includes(searchLower)) {
            return false;
          }
        }
        
        if (filters.state && college.state !== filters.state) return false;
        if (filters.type && college.type !== filters.type) return false;
        if (filters.naacGrade && college.naac_grade !== filters.naacGrade) return false;
        if (filters.maxFees && college.total_fees > filters.maxFees) return false;
        
        if (filters.course) {
          const courseMatch = college.courses_offered?.some(course => 
            course.toLowerCase().includes(filters.course!.toLowerCase())
          );
          if (!courseMatch) return false;
        }
        
        return true;
      });

      console.log('Search completed, found:', results.length, 'colleges');
      return results;
    } catch (err) {
      console.error('Error searching colleges:', err);
      return colleges;
    }
  };

  const refetch = () => {
    console.log('Refetching data...');
    setLoading(true);
    const allColleges = [...allPrivateColleges, ...additionalColleges];
    setColleges(allColleges);
    setEntranceExams(guaranteedEntranceExams);
    setLoading(false);
    fetchAdditionalData();
  };

  return { 
    colleges, 
    entranceExams,
    loading, 
    error, 
    refetch,
    searchColleges
  };
};
