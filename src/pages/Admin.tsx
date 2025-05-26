
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Eye, Clock, Users, Building2, AlertCircle, LogIn, Star, Trash2, Plus } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import { googleSheetsService } from '@/utils/googleSheets';

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [starredCollegeForm, setStarredCollegeForm] = useState({
    name: '',
    location: '',
    type: '',
    description: '',
    rating: '',
    students: '',
    image: '',
    whatsapp: ''
  });
  
  // Sample pending submissions
  const [pendingSubmissions, setPendingSubmissions] = useState([
    {
      id: 1,
      name: "University of California, Berkeley",
      location: "Berkeley, CA",
      type: "Public",
      submittedBy: "admin@berkeley.edu",
      submittedDate: "2024-01-15",
      status: "pending",
      description: "Public research university known for academic excellence and research innovation.",
      whatsapp: "+15551234567",
      website: "https://berkeley.edu"
    },
    {
      id: 2,
      name: "New York Institute of Technology",
      location: "New York, NY",
      type: "Private",
      submittedBy: "admissions@nyit.edu",
      submittedDate: "2024-01-14",
      status: "pending",
      description: "Private technological university focusing on applied learning and research.",
      whatsapp: "+15551234568",
      website: "https://nyit.edu"
    }
  ]);

  const [approvedColleges, setApprovedColleges] = useState([
    {
      id: 10,
      name: "Harvard University",
      location: "Cambridge, MA",
      type: "Private",
      approvedDate: "2024-01-10",
      status: "approved"
    },
    {
      id: 11,
      name: "Stanford University",
      location: "Stanford, CA",
      type: "Private",
      approvedDate: "2024-01-09",
      status: "approved"
    }
  ]);

  const [starredColleges, setStarredColleges] = useState([
    {
      id: 100,
      name: "MIT",
      location: "Cambridge, MA",
      type: "Private",
      rating: 4.9,
      featured: true
    }
  ]);

  const handleLogin = () => {
    if (loginForm.username === 'collzy776' && loginForm.password === 'collzyceo776') {
      setIsAuthenticated(true);
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the Collzy Admin Panel.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (id: number) => {
    const college = pendingSubmissions.find(c => c.id === id);
    if (college) {
      // Save to Google Sheets
      const success = await googleSheetsService.submitCollege({
        name: college.name,
        location: college.location,
        type: college.type,
        description: college.description,
        website: college.website,
        whatsapp: college.whatsapp,
        email: college.submittedBy,
        submittedBy: college.submittedBy
      });

      if (success) {
        setApprovedColleges(prev => [...prev, {
          ...college,
          approvedDate: new Date().toISOString().split('T')[0],
          status: 'approved'
        }]);
        
        setPendingSubmissions(prev => prev.filter(c => c.id !== id));
        
        toast({
          title: "College Approved",
          description: `${college.name} has been approved and saved to Google Sheets.`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save college to Google Sheets.",
          variant: "destructive",
        });
      }
    }
  };

  const handleReject = (id: number) => {
    const college = pendingSubmissions.find(c => c.id === id);
    if (college) {
      setPendingSubmissions(prev => prev.filter(c => c.id !== id));
      
      toast({
        title: "College Rejected",
        description: `${college.name} submission has been rejected and removed.`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteCollege = (id: number) => {
    setApprovedColleges(prev => prev.filter(c => c.id !== id));
    toast({
      title: "College Deleted",
      description: "College has been removed from the platform.",
      variant: "destructive",
    });
  };

  const handleAddStarredCollege = () => {
    const newStarredCollege = {
      id: Date.now(),
      ...starredCollegeForm,
      rating: parseFloat(starredCollegeForm.rating),
      students: parseInt(starredCollegeForm.students),
      featured: true
    };

    setStarredColleges(prev => [...prev, newStarredCollege]);
    setStarredCollegeForm({
      name: '',
      location: '',
      type: '',
      description: '',
      rating: '',
      students: '',
      image: '',
      whatsapp: ''
    });

    toast({
      title: "Starred College Added",
      description: `${newStarredCollege.name} has been added to featured colleges.`,
    });
  };

  const stats = [
    {
      title: "Pending Reviews",
      value: pendingSubmissions.length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Approved Colleges",
      value: approvedColleges.length,
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Starred Colleges",
      value: starredColleges.length,
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  // If not authenticated, show sign-in interface
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navigation />
        
        <div className="max-w-md mx-auto px-4 py-16">
          <Card className="border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-blue-900">Admin Access</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="Enter password"
                />
              </div>
              <Button 
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage college submissions and platform content</p>
          </div>
          <Button 
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            Sign Out
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Approved ({approvedColleges.length})
            </TabsTrigger>
            <TabsTrigger value="starred" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Starred ({starredColleges.length})
            </TabsTrigger>
            <TabsTrigger value="add-starred" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Starred
            </TabsTrigger>
          </TabsList>

          {/* Pending Submissions */}
          <TabsContent value="pending" className="space-y-6">
            {pendingSubmissions.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Pending Submissions</h3>
                  <p className="text-gray-500">All college submissions have been reviewed.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {pendingSubmissions.map((college) => (
                  <Card key={college.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{college.name}</CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <span>📍 {college.location}</span>
                            <Badge variant="outline">{college.type}</Badge>
                            <span className="text-sm">Submitted: {college.submittedDate}</span>
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{college.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Submitted by:</strong> {college.submittedBy}
                        </div>
                        <div>
                          <strong>WhatsApp:</strong> {college.whatsapp}
                        </div>
                        <div>
                          <strong>Website:</strong> 
                          <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                            {college.website}
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => handleApprove(college.id)}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(college.id)}
                          variant="destructive"
                          className="flex items-center gap-2"
                        >
                          <X className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Approved Colleges */}
          <TabsContent value="approved" className="space-y-6">
            <div className="space-y-4">
              {approvedColleges.map((college) => (
                <Card key={college.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{college.name}</h3>
                        <p className="text-gray-600">{college.location}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge variant="default" className="bg-green-100 text-green-800 mb-2">
                            <Check className="h-3 w-3 mr-1" />
                            Approved
                          </Badge>
                          <p className="text-sm text-gray-500">Approved: {college.approvedDate}</p>
                        </div>
                        <Button
                          onClick={() => handleDeleteCollege(college.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Starred Colleges */}
          <TabsContent value="starred" className="space-y-6">
            <div className="space-y-4">
              {starredColleges.map((college) => (
                <Card key={college.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          {college.name}
                        </h3>
                        <p className="text-gray-600">{college.location}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="default" className="bg-blue-100 text-blue-800">
                          Featured
                        </Badge>
                        <Button
                          onClick={() => setStarredColleges(prev => prev.filter(c => c.id !== college.id))}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add Starred College */}
          <TabsContent value="add-starred" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Starred College</CardTitle>
                <CardDescription>Create a featured college to display on the home page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">College Name</Label>
                    <Input
                      id="name"
                      value={starredCollegeForm.name}
                      onChange={(e) => setStarredCollegeForm({...starredCollegeForm, name: e.target.value})}
                      placeholder="Enter college name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={starredCollegeForm.location}
                      onChange={(e) => setStarredCollegeForm({...starredCollegeForm, location: e.target.value})}
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      value={starredCollegeForm.type}
                      onChange={(e) => setStarredCollegeForm({...starredCollegeForm, type: e.target.value})}
                      placeholder="Private/Public/Community"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      max="5"
                      value={starredCollegeForm.rating}
                      onChange={(e) => setStarredCollegeForm({...starredCollegeForm, rating: e.target.value})}
                      placeholder="4.9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="students">Number of Students</Label>
                    <Input
                      id="students"
                      type="number"
                      value={starredCollegeForm.students}
                      onChange={(e) => setStarredCollegeForm({...starredCollegeForm, students: e.target.value})}
                      placeholder="23000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      value={starredCollegeForm.whatsapp}
                      onChange={(e) => setStarredCollegeForm({...starredCollegeForm, whatsapp: e.target.value})}
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={starredCollegeForm.description}
                    onChange={(e) => setStarredCollegeForm({...starredCollegeForm, description: e.target.value})}
                    placeholder="Enter college description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={starredCollegeForm.image}
                    onChange={(e) => setStarredCollegeForm({...starredCollegeForm, image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <Button onClick={handleAddStarredCollege} className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  Add Starred College
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
