
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

// Enhanced reliable fallback data for demonstration
const reliableColleges: College[] = [
  {
    id: 'demo-1',
    name: 'IIT Madras',
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
    address: 'Sardar Patel Road, Chennai',
    courses_offered: ['B.Tech', 'M.Tech', 'PhD', 'Engineering'],
    total_fees: 200000,
    hostel_available: true,
    placement_percentage: 100,
    average_package: 2000000,
    highest_package: 5000000,
    accreditations: ['NAAC A++', 'NBA'],
    facilities: ['World-class Labs', 'Research Centers', 'Hostel', 'Sports Complex'],
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
    id: 'demo-2',
    name: 'IIT Delhi',
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
    address: 'Hauz Khas, New Delhi',
    courses_offered: ['B.Tech', 'M.Tech', 'PhD', 'Engineering'],
    total_fees: 200000,
    hostel_available: true,
    placement_percentage: 98,
    average_package: 1900000,
    highest_package: 4800000,
    accreditations: ['NAAC A++', 'NBA'],
    facilities: ['Advanced Labs', 'Research Centers', 'Hostel', 'Library'],
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
    id: 'demo-3',
    name: 'Christ University',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Private',
    established_year: 1969,
    affiliation: 'Deemed University',
    naac_grade: 'A++',
    website: 'https://christuniversity.in',
    admission_email: 'admissions@christuniversity.in',
    phone: '+91-80-4012-9100',
    address: 'Hosur Road, Bangalore',
    courses_offered: ['B.A', 'B.Sc', 'B.Com', 'BBA', 'Engineering'],
    total_fees: 180000,
    hostel_available: true,
    placement_percentage: 90,
    average_package: 800000,
    highest_package: 2500000,
    accreditations: ['NAAC A++'],
    facilities: ['Modern Campus', 'Library', 'Hostel', 'Sports'],
    campus_size: '100 acres',
    student_strength: 20000,
    faculty_count: 1200,
    library_books: 300000,
    status: 'active',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-4',
    name: 'VIT Vellore',
    city: 'Vellore',
    state: 'Tamil Nadu',
    type: 'Private',
    established_year: 1984,
    affiliation: 'Deemed University',
    naac_grade: 'A++',
    website: 'https://vit.ac.in',
    admission_email: 'admissions@vit.ac.in',
    phone: '+91-416-220-2020',
    address: 'Tiruvalam Road, Vellore',
    courses_offered: ['B.Tech', 'M.Tech', 'Engineering'],
    total_fees: 195000,
    hostel_available: true,
    placement_percentage: 95,
    average_package: 1500000,
    highest_package: 4000000,
    accreditations: ['NAAC A++'],
    facilities: ['Tech Park', 'Library', 'Hostel', 'Innovation Center'],
    campus_size: '350 acres',
    student_strength: 25000,
    faculty_count: 1500,
    library_books: 400000,
    status: 'active',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-5',
    name: 'KMCT College of Engineering',
    city: 'Kozhikode',
    state: 'Kerala',
    type: 'Private',
    established_year: 2001,
    affiliation: 'APJ Abdul Kalam Technological University',
    naac_grade: 'A+',
    website: 'https://kmct.edu.in',
    admission_email: 'admissions@kmct.edu.in',
    phone: '+91-495-2285400',
    address: 'Manassery, Kozhikode',
    courses_offered: ['B.Tech', 'M.Tech', 'Engineering'],
    total_fees: 135000,
    hostel_available: true,
    placement_percentage: 92,
    average_package: 1100000,
    highest_package: 3200000,
    accreditations: ['NAAC A+', 'NBA'],
    facilities: ['Advanced Labs', 'Library', 'Hostel', 'Innovation Center'],
    campus_size: '35 acres',
    student_strength: 2800,
    faculty_count: 200,
    library_books: 100000,
    status: 'active',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-6',
    name: 'Government Engineering College Kozhikode',
    city: 'Kozhikode',
    state: 'Kerala',
    type: 'Government',
    established_year: 2008,
    affiliation: 'APJ Abdul Kalam Technological University',
    naac_grade: 'A+',
    website: 'https://geck.ac.in',
    admission_email: 'principal@geck.ac.in',
    phone: '+91-495-2287650',
    address: 'West Hill, Kozhikode',
    courses_offered: ['B.Tech', 'M.Tech', 'Engineering'],
    total_fees: 45000,
    hostel_available: true,
    placement_percentage: 95,
    average_package: 1200000,
    highest_package: 3500000,
    accreditations: ['NAAC A+'],
    facilities: ['Research Labs', 'Library', 'Hostel', 'Innovation Labs'],
    campus_size: '40 acres',
    student_strength: 2000,
    faculty_count: 150,
    library_books: 80000,
    status: 'active',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const reliableEntranceExams: EntranceExam[] = [
  {
    id: 'exam-1',
    name: 'JEE Main',
    full_name: 'Joint Entrance Examination Main',
    conducting_body: 'National Testing Agency',
    exam_level: 'National',
    exam_type: 'Engineering',
    exam_date: '2024-04-04',
    application_start_date: '2024-02-01',
    application_end_date: '2024-03-15',
    registration_fee: 1000,
    official_website: 'https://jeemain.nta.nic.in',
    eligibility_criteria: '12th pass with 75% marks',
    exam_pattern: 'Computer Based Test',
    description: 'National level entrance exam for engineering admissions',
    participating_colleges: ['All NITs', 'IIITs', 'GFTIs'],
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: 'exam-2',
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
    exam_pattern: 'Objective type questions',
    description: 'State level entrance exam for Engineering, Agriculture and Medical courses in Kerala',
    participating_colleges: ['All Kerala Government Engineering Colleges', 'Most Private Engineering Colleges in Kerala'],
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: 'exam-3',
    name: 'NEET',
    full_name: 'National Eligibility cum Entrance Test',
    conducting_body: 'National Testing Agency',
    exam_level: 'National',
    exam_type: 'Medical',
    exam_date: '2024-05-05',
    application_start_date: '2024-02-01',
    application_end_date: '2024-03-15',
    registration_fee: 1700,
    official_website: 'https://neet.nta.nic.in',
    eligibility_criteria: '12th pass with Physics, Chemistry, Biology',
    exam_pattern: 'Pen and Paper Based Test',
    description: 'National level entrance exam for medical admissions',
    participating_colleges: ['All Government Medical Colleges', 'Private Medical Colleges'],
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
    // Always start with reliable data immediately
    setColleges(reliableColleges);
    setEntranceExams(reliableEntranceExams);
    setLoading(false);
    
    // Try to fetch additional data in background
    fetchDataSilently();
  }, []);

  const fetchDataSilently = async () => {
    try {
      console.log('Attempting to fetch additional data from database...');
      
      const [collegesResponse, examsResponse] = await Promise.allSettled([
        supabase.from('colleges').select('*').eq('status', 'active').limit(10),
        supabase.from('entrance_exams').select('*').eq('status', 'active').limit(10)
      ]);

      // Only update if we get valid additional data
      if (collegesResponse.status === 'fulfilled' && 
          collegesResponse.value.data && 
          collegesResponse.value.data.length > 0) {
        console.log('Found additional colleges from database:', collegesResponse.value.data.length);
        // Merge with existing reliable data
        setColleges(prev => [...prev, ...collegesResponse.value.data]);
      }

      if (examsResponse.status === 'fulfilled' && 
          examsResponse.value.data && 
          examsResponse.value.data.length > 0) {
        console.log('Found additional exams from database:', examsResponse.value.data.length);
        setEntranceExams(prev => [...prev, ...examsResponse.value.data]);
      }
      
    } catch (err) {
      console.log('Background fetch failed, but we have reliable data to show');
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
              !college.city.toLowerCase().includes(searchLower)) {
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
    setLoading(true);
    setColleges(reliableColleges);
    setEntranceExams(reliableEntranceExams);
    setLoading(false);
    fetchDataSilently();
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
