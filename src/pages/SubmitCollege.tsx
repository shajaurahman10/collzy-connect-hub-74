
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Building2, MapPin, Phone, Globe, Send } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

const SubmitCollege = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: '',
    website: '',
    phone: '',
    whatsapp: '',
    email: '',
    description: '',
    programs: '',
    tuitionFee: '',
    applicationFee: '',
    deadline: '',
    requirements: '',
    facilities: '',
    image: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "College Submitted Successfully!",
        description: "Your college submission has been sent for admin review. You'll be notified once it's approved.",
      });
      
      // Reset form
      setFormData({
        name: '',
        location: '',
        type: '',
        website: '',
        phone: '',
        whatsapp: '',
        email: '',
        description: '',
        programs: '',
        tuitionFee: '',
        applicationFee: '',
        deadline: '',
        requirements: '',
        facilities: '',
        image: null
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your College</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help students discover your institution by submitting your college information. 
            All submissions are reviewed by our admin team before publication.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Provide essential details about your college or university
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">College/University Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter the full name of the institution"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State/Province, Country"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Institution Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select institution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public University</SelectItem>
                      <SelectItem value="private">Private University</SelectItem>
                      <SelectItem value="community">Community College</SelectItem>
                      <SelectItem value="technical">Technical Institute</SelectItem>
                      <SelectItem value="liberal-arts">Liberal Arts College</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide a compelling description of your institution, its mission, and what makes it unique"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How can prospective students reach your admissions office?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.example.edu"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="+1234567890 (with country code)"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Admissions Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="admissions@example.edu"
                />
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>
                Details about programs, fees, and admission requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="programs">Programs Offered</Label>
                <Textarea
                  id="programs"
                  value={formData.programs}
                  onChange={(e) => handleInputChange('programs', e.target.value)}
                  placeholder="List the main programs and degrees offered (e.g., Computer Science, Business Administration, Engineering...)"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="tuitionFee">Annual Tuition Fee</Label>
                  <Input
                    id="tuitionFee"
                    value={formData.tuitionFee}
                    onChange={(e) => handleInputChange('tuitionFee', e.target.value)}
                    placeholder="$50,000"
                  />
                </div>
                <div>
                  <Label htmlFor="applicationFee">Application Fee</Label>
                  <Input
                    id="applicationFee"
                    value={formData.applicationFee}
                    onChange={(e) => handleInputChange('applicationFee', e.target.value)}
                    placeholder="$100"
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    placeholder="January 15, 2025"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">Admission Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="List admission requirements (e.g., GPA, SAT/ACT scores, essays, recommendations...)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="facilities">Campus Facilities</Label>
                <Textarea
                  id="facilities"
                  value={formData.facilities}
                  onChange={(e) => handleInputChange('facilities', e.target.value)}
                  placeholder="Describe campus facilities (e.g., libraries, labs, dormitories, sports facilities...)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>College Image</CardTitle>
              <CardDescription>
                Upload a representative image of your campus or logo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Click to upload or drag and drop
                  </Label>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              {formData.image && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ Image uploaded: {formData.image.name}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Submit for Review
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Info Box */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-900">Review Process</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Your submission will be reviewed by our admin team within 2-3 business days. 
                  We may contact you for additional information if needed. Once approved, 
                  your college will be visible to all students on our platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitCollege;
