
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

// Fallback data in case of database issues
const fallbackColleges: College[] = [
  {
    id: 'fallback-1',
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
    courses_offered: ['Engineering', 'Technology'],
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
    id: 'fallback-2',
    name: 'Lal Bahadur Shastri College of Arts & Science',
    city: 'Kasargod',
    state: 'Kerala',
    type: 'Government',
    established_year: 1975,
    affiliation: 'University of Calicut',
    naac_grade: 'A+',
    website: 'https://lbscollege.ac.in',
    admission_email: 'principal@lbscollege.ac.in',
    phone: '+91-4994-220789',
    address: 'Kasaragod',
    courses_offered: ['Arts', 'Science', 'Commerce'],
    total_fees: 25000,
    hostel_available: true,
    placement_percentage: 85,
    average_package: 500000,
    highest_package: 1200000,
    accreditations: ['NAAC A+'],
    facilities: ['Library', 'Labs', 'Hostel', 'Sports'],
    campus_size: '15 acres',
    student_strength: 2000,
    faculty_count: 120,
    library_books: 80000,
    status: 'active',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'fallback-3',
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
    courses_offered: ['Engineering', 'Technology'],
    total_fees: 45000,
    hostel_available: true,
    placement_percentage: 95,
    average_package: 1200000,
    highest_package: 3500000,
    accreditations: ['NAAC A+'],
    facilities: ['Research Labs', 'Library', 'Hostel'],
    campus_size: '40 acres',
    student_strength: 2000,
    faculty_count: 150,
    library_books: 80000,
    status: 'active',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const fallbackEntranceExams: EntranceExam[] = [
  {
    id: 'fallback-exam-1',
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
    id: 'fallback-exam-2',
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
  }
];

export const useColleges = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [entranceExams, setEntranceExams] = useState<EntranceExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to fetch colleges and entrance exams...');
      
      // Fetch colleges with error handling
      const { data: collegesData, error: collegesError } = await supabase
        .from('colleges')
        .select('*')
        .eq('status', 'active')
        .order('name');

      // Fetch entrance exams with error handling
      const { data: examsData, error: examsError } = await supabase
        .from('entrance_exams')
        .select('*')
        .eq('status', 'active')
        .order('name');

      // Handle colleges data
      if (collegesError) {
        console.error('Error fetching colleges:', collegesError);
        console.log('Using fallback colleges data');
        setColleges(fallbackColleges);
      } else {
        console.log('Successfully fetched colleges:', collegesData?.length || 0);
        setColleges(collegesData || fallbackColleges);
      }

      // Handle entrance exams data
      if (examsError) {
        console.error('Error fetching entrance exams:', examsError);
        console.log('Using fallback entrance exams data');
        setEntranceExams(fallbackEntranceExams);
      } else {
        console.log('Successfully fetched entrance exams:', examsData?.length || 0);
        setEntranceExams(examsData || fallbackEntranceExams);
      }

      // Set error only if both failed
      if (collegesError && examsError) {
        setError('Database connection issues. Showing sample data.');
      }
      
    } catch (err: any) {
      console.error('Critical error in fetchData:', err);
      setError('Connection failed. Showing sample data.');
      setColleges(fallbackColleges);
      setEntranceExams(fallbackEntranceExams);
    } finally {
      setLoading(false);
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
      
      let query = supabase
        .from('colleges')
        .select('*')
        .eq('status', 'active');

      if (filters.searchTerm) {
        query = query.or(`name.ilike.%${filters.searchTerm}%,city.ilike.%${filters.searchTerm}%`);
      }
      
      if (filters.state) {
        query = query.eq('state', filters.state);
      }
      
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      
      if (filters.naacGrade) {
        query = query.eq('naac_grade', filters.naacGrade);
      }
      
      if (filters.maxFees) {
        query = query.lte('total_fees', filters.maxFees);
      }

      if (filters.course) {
        query = query.contains('courses_offered', [filters.course]);
      }

      const { data, error } = await query.order('name');
      
      if (error) {
        console.error('Error searching colleges:', error);
        // Return filtered fallback data
        return fallbackColleges.filter(college => {
          if (filters.searchTerm && !college.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
          if (filters.state && college.state !== filters.state) return false;
          if (filters.type && college.type !== filters.type) return false;
          return true;
        });
      }
      
      return data || [];
    } catch (err: any) {
      console.error('Error searching colleges:', err);
      return fallbackColleges;
    }
  };

  return { 
    colleges, 
    entranceExams,
    loading, 
    error, 
    refetch: fetchData,
    searchColleges
  };
};
