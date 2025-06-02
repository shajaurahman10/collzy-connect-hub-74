
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
      
      // Fetch colleges
      const { data: collegesData, error: collegesError } = await supabase
        .from('colleges')
        .select('*')
        .eq('status', 'active')
        .order('name');

      if (collegesError) throw collegesError;

      // Fetch entrance exams
      const { data: examsData, error: examsError } = await supabase
        .from('entrance_exams')
        .select('*')
        .eq('status', 'active')
        .order('name');

      if (examsError) throw examsError;

      setColleges(collegesData || []);
      setEntranceExams(examsData || []);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message);
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
      
      if (error) throw error;
      
      return data || [];
    } catch (err: any) {
      console.error('Error searching colleges:', err);
      return [];
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
