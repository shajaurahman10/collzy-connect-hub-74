
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, Calendar, Mail, Phone } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Application {
  id: string;
  collegeName: string;
  status: 'applied' | 'under_review' | 'shortlisted' | 'interview_scheduled' | 'accepted' | 'rejected';
  appliedDate: string;
  lastUpdate: string;
  nextStep?: string;
  interviewDate?: string;
  documents: {
    name: string;
    submitted: boolean;
    required: boolean;
  }[];
}

const AdmissionTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // Mock data - in real app, fetch from Supabase
    if (user) {
      setApplications([
        {
          id: '1',
          collegeName: 'Manipal Academy of Higher Education',
          status: 'interview_scheduled',
          appliedDate: '2024-01-15',
          lastUpdate: '2024-01-20',
          nextStep: 'Attend online interview',
          interviewDate: '2024-01-25',
          documents: [
            { name: '12th Marksheet', submitted: true, required: true },
            { name: 'ID Proof', submitted: true, required: true },
            { name: 'Passport Photo', submitted: true, required: true },
            { name: 'Character Certificate', submitted: false, required: false },
          ]
        },
        {
          id: '2',
          collegeName: 'VIT University',
          status: 'under_review',
          appliedDate: '2024-01-10',
          lastUpdate: '2024-01-18',
          nextStep: 'Wait for admission committee review',
          documents: [
            { name: '12th Marksheet', submitted: true, required: true },
            { name: 'ID Proof', submitted: true, required: true },
            { name: 'Passport Photo', submitted: true, required: true },
          ]
        },
        {
          id: '3',
          collegeName: 'Amity University Delhi',
          status: 'accepted',
          appliedDate: '2024-01-05',
          lastUpdate: '2024-01-22',
          nextStep: 'Complete fee payment and confirm admission',
          documents: [
            { name: '12th Marksheet', submitted: true, required: true },
            { name: 'ID Proof', submitted: true, required: true },
            { name: 'Passport Photo', submitted: true, required: true },
          ]
        }
      ]);
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-purple-100 text-purple-800';
      case 'interview_scheduled': return 'bg-orange-100 text-orange-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected': return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'interview_scheduled': return <Calendar className="h-5 w-5 text-orange-600" />;
      default: return <Clock className="h-5 w-5 text-blue-600" />;
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'applied': return 20;
      case 'under_review': return 40;
      case 'shortlisted': return 60;
      case 'interview_scheduled': return 80;
      case 'accepted': return 100;
      case 'rejected': return 100;
      default: return 0;
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Please log in</h3>
          <p className="text-gray-600 mb-4">You need to log in to track your admission applications</p>
          <Button onClick={() => window.location.href = '/auth'}>
            Log In
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Admission Tracker
        </h2>
        <p className="text-gray-600">Track the status of all your college applications in one place</p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
            <p className="text-gray-600 mb-4">Start applying to colleges to track your admission progress</p>
            <Button onClick={() => window.location.href = '/private-colleges'}>
              Browse Colleges
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {applications.length}
                </div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === 'accepted').length}
                </div>
                <div className="text-sm text-gray-600">Accepted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {applications.filter(app => app.status === 'interview_scheduled').length}
                </div>
                <div className="text-sm text-gray-600">Interviews</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {applications.filter(app => ['applied', 'under_review', 'shortlisted'].includes(app.status)).length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{application.collegeName}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(application.status)}
                      <Badge className={getStatusColor(application.status)}>
                        {formatStatus(application.status)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Application Progress</span>
                      <span>{getProgressValue(application.status)}%</span>
                    </div>
                    <Progress value={getProgressValue(application.status)} className="h-2" />
                  </div>

                  {/* Key Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Applied:</span>
                      <span className="ml-2">{new Date(application.appliedDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="font-medium">Last Update:</span>
                      <span className="ml-2">{new Date(application.lastUpdate).toLocaleDateString()}</span>
                    </div>
                    {application.interviewDate && (
                      <div>
                        <span className="font-medium">Interview:</span>
                        <span className="ml-2">{new Date(application.interviewDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Next Step */}
                  {application.nextStep && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-800">Next Step:</span>
                      </div>
                      <p className="text-blue-700 mt-1">{application.nextStep}</p>
                    </div>
                  )}

                  {/* Documents Checklist */}
                  <div>
                    <h4 className="font-medium mb-2">Document Checklist:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {application.documents.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          {doc.submitted ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                          )}
                          <span className={doc.submitted ? 'text-green-700' : 'text-orange-700'}>
                            {doc.name}
                            {doc.required && !doc.submitted && ' (Required)'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {application.status === 'interview_scheduled' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Join Interview
                      </Button>
                    )}
                    {application.status === 'accepted' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Confirm Admission
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionTracker;
