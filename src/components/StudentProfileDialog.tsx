
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, User, Phone, MapPin, GraduationCap, Calendar } from 'lucide-react';

interface StudentProfileDialogProps {
  children: React.ReactNode;
  onProfileSubmit: (profileData: any) => void;
}

const StudentProfileDialog = ({ children, onProfileSubmit }: StudentProfileDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    marks_percentage: '',
    state: '',
    course_interest: '',
  });
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
        .from('student_profiles')
        .insert([{
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          age: profileData.age ? parseInt(profileData.age) : null,
          marks_percentage: profileData.marks_percentage ? parseFloat(profileData.marks_percentage) : null,
          state: profileData.state,
          course_interest: profileData.course_interest,
        }]);

      if (error) throw error;

      // Store in localStorage for future use
      localStorage.setItem('student-profile', JSON.stringify(profileData));
      
      toast({
        title: "🎉 Profile Created Successfully!",
        description: "Your profile has been saved. Proceeding with application...",
      });

      onProfileSubmit(profileData);
      setOpen(false);
    } catch (error: any) {
      console.error('Error saving profile:', error);
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
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <User className="h-5 w-5" />
            Create Your Student Profile
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
            
            <div>
              <Label htmlFor="age" className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                Age
              </Label>
              <Input
                id="age"
                type="number"
                min="16"
                max="35"
                value={profileData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="18"
              />
            </div>
            
            <div>
              <Label htmlFor="marks" className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-4 w-4" />
                12th Grade Marks (%) *
              </Label>
              <Input
                id="marks"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={profileData.marks_percentage}
                onChange={(e) => handleInputChange('marks_percentage', e.target.value)}
                placeholder="85.5"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="state" className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                State *
              </Label>
              <Select value={profileData.state} onValueChange={(value) => handleInputChange('state', value)}>
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
          </div>
          
          <div>
            <Label htmlFor="course_interest" className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4" />
              Course Interest *
            </Label>
            <Select value={profileData.course_interest} onValueChange={(value) => handleInputChange('course_interest', value)}>
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
          
          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? 'Creating Profile...' : 'Create Profile & Apply'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileDialog;
