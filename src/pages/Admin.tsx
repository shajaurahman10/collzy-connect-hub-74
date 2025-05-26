
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Eye, Clock, Users, Building2, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { toast } = useToast();
  
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
    },
    {
      id: 3,
      name: "Community College of Denver",
      location: "Denver, CO",
      type: "Community",
      submittedBy: "info@ccd.edu",
      submittedDate: "2024-01-13",
      status: "pending",
      description: "Leading community college providing affordable education and career training.",
      whatsapp: "+15551234569",
      website: "https://ccd.edu"
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

  const handleApprove = (id: number) => {
    const college = pendingSubmissions.find(c => c.id === id);
    if (college) {
      // Move to approved list
      setApprovedColleges(prev => [...prev, {
        ...college,
        approvedDate: new Date().toISOString().split('T')[0],
        status: 'approved'
      }]);
      
      // Remove from pending
      setPendingSubmissions(prev => prev.filter(c => c.id !== id));
      
      toast({
        title: "College Approved",
        description: `${college.name} has been approved and is now live on the platform.`,
      });
    }
  };

  const handleReject = (id: number) => {
    const college = pendingSubmissions.find(c => c.id === id);
    if (college) {
      // Remove from pending (delete)
      setPendingSubmissions(prev => prev.filter(c => c.id !== id));
      
      toast({
        title: "College Rejected",
        description: `${college.name} submission has been rejected and removed.`,
        variant: "destructive",
      });
    }
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
      title: "Total Users",
      value: "1,234",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Applications",
      value: "5,678",
      icon: AlertCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage college submissions and platform content</p>
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Reviews ({pendingSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Approved Colleges ({approvedColleges.length})
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
                        <Button variant="outline" className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
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
                      <div className="text-right">
                        <Badge variant="default" className="bg-green-100 text-green-800 mb-2">
                          <Check className="h-3 w-3 mr-1" />
                          Approved
                        </Badge>
                        <p className="text-sm text-gray-500">Approved: {college.approvedDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
