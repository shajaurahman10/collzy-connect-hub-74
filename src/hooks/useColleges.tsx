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

// Fallback college data for immediate display
const fallbackColleges: College[] = [
  {
    id: '1',
    name: 'University of Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'Public',
    rating: 4.5,
    students: 132435,
    description: 'Premier central university offering diverse undergraduate and postgraduate programs',
    courses: ['B.A.', 'B.Sc.', 'B.Com.', 'M.A.', 'M.Sc.', 'Ph.D.'],
    email: 'admissions@du.ac.in',
    phone: '011-27666999',
    website: 'https://www.du.ac.in',
    founded: 1922,
    status: 'approved'
  },
  {
    id: '2',
    name: 'Indian Institute of Technology Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'Public',
    rating: 4.8,
    students: 8000,
    description: 'Premier engineering and technology institute',
    courses: ['B.Tech.', 'M.Tech.', 'Ph.D.'],
    email: 'admissions@iitd.ac.in',
    phone: '011-26591785',
    website: 'https://www.iitd.ac.in',
    founded: 1961,
    status: 'approved'
  },
  // Add more fallback colleges...
];

export const useColleges = () => {
  const [colleges, setColleges] = useState<College[]>(fallbackColleges);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .eq('status', 'approved')
        .order('name');

      if (error) throw error;
      
      if (data && data.length > 0) {
        setColleges(data);
      }
    } catch (err: any) {
      console.error('Error fetching colleges:', err);
      setError(err.message);
      // Keep fallback colleges on error
    } finally {
      setLoading(false);
    }
  };

  return { colleges, loading, error, refetch: fetchColleges };
};
