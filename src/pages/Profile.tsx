
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, GraduationCap, Edit, Save, X, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [favoriteColleges, setFavoriteColleges] = useState([]);
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate student seeking opportunities in Computer Science and Engineering. Interested in AI, machine learning, and software development.',
    education: 'High School Graduate',
    gpa: '3.8',
    interests: ['Computer Science', 'Mathematics', 'Physics', 'Engineering'],
    achievements: ['National Merit Scholar', 'AP Scholar', 'Science Fair Winner'],
  });

  // Sample college data for favorites
  const sampleColleges = [
    {
      id: 1,
      name: "Harvard University",
      location: "Cambridge, MA",
      type: "Private",
      rating: 4.9,
      students: 23000
    },
    {
      id: 2,
      name: "Stanford University", 
      location: "Stanford, CA",
      type: "Private",
      rating: 4.8,
      students: 17000
    },
    {
      id: 3,
      name: "MIT",
      location: "Cambridge, MA",
      type: "Private", 
      rating: 4.9,
      students: 11500
    }
  ];

  useEffect(() => {
    // Load favorite colleges from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteColleges') || '[]');
    const favoritedColleges = sampleColleges.filter(college => savedFavorites.includes(college.id));
    setFavoriteColleges(favoritedColleges);
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your academic profile and preferences</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="public-profile" className="text-sm font-medium">
                Public Profile
              </Label>
              <Switch
                id="public-profile"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">
                  {profileData.firstName} {profileData.lastName}
                </CardTitle>
                <CardDescription className="flex items-center justify-center mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profileData.location}
                </CardDescription>
                <div className="flex justify-center mt-2">
                  <Badge variant={isPublic ? "default" : "secondary"}>
                    {isPublic ? "Public Profile" : "Private Profile"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-gray-500" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-gray-500" />
                    <span className="text-sm">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-3 text-gray-500" />
                    <span className="text-sm">{profileData.education}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Favorite Colleges */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Favorite Colleges
                </CardTitle>
              </CardHeader>
              <CardContent>
                {favoriteColleges.length > 0 ? (
                  <div className="space-y-3">
                    {favoriteColleges.map((college) => (
                      <div key={college.id} className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900">{college.name}</h4>
                        <p className="text-sm text-gray-600">{college.location}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline">{college.type}</Badge>
                          <span className="text-sm text-gray-500">★ {college.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No favorite colleges yet. Start exploring to add some!</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
                <CardDescription>
                  Share your educational background and achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="education">Current Education</Label>
                    <Input
                      id="education"
                      value={profileData.education}
                      onChange={(e) => setProfileData({...profileData, education: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">GPA</Label>
                    <Input
                      id="gpa"
                      value={profileData.gpa}
                      onChange={(e) => setProfileData({...profileData, gpa: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>
                  Showcase your academic and extracurricular achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profileData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-blue-600 mr-3" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
