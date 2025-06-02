
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface StudentProfileFormProps {
  onSuccess?: () => void;
}

const StudentProfileForm = ({ onSuccess }: StudentProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    marks_percentage: '',
    course_interest: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const courses = [
    'Engineering (B.Tech/B.E.)', 'Medicine (MBBS)', 'Arts (B.A.)', 'Science (B.Sc.)',
    'Commerce (B.Com.)', 'Management (BBA/MBA)', 'Law (LLB)', 'Pharmacy (B.Pharm)',
    'Architecture', 'Design', 'Agriculture', 'Computer Applications (BCA/MCA)',
    'Mass Communication', 'Hotel Management', 'Fashion Design', 'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('student_profiles' as any)
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "🎉 Profile Submitted Successfully!",
        description: "Your profile has been saved. You can now apply to colleges!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        state: '',
        marks_percentage: '',
        course_interest: '',
      });

      onSuccess?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-700">
          Student Profile Form
        </CardTitle>
        <p className="text-gray-600">
          Fill in your details to apply to colleges
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                placeholder="+91 98765 43210"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">State *</label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">12th Grade Marks (%) *</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.marks_percentage}
                onChange={(e) => handleInputChange('marks_percentage', e.target.value)}
                placeholder="85"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Course Interest *</label>
              <Select value={formData.course_interest} onValueChange={(value) => handleInputChange('course_interest', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your interest" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? 'Saving Profile...' : 'Save Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentProfileForm;
