
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, User, GraduationCap, FileText, CheckCircle } from 'lucide-react';

const CreateProfile = () => {
  useEffect(() => {
    // Redirect to Google Form after a short delay
    const timer = setTimeout(() => {
      window.open('https://forms.gle/SBAQ5Ao8AvArV7XG7', '_blank');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      icon: User,
      title: "Personal Information",
      description: "Basic details like name, email, and contact information"
    },
    {
      icon: GraduationCap,
      title: "Educational Background",
      description: "Current academic status, grades, and interests"
    },
    {
      icon: FileText,
      title: "Preferences",
      description: "Course preferences, location choices, and budget"
    },
    {
      icon: CheckCircle,
      title: "Submit & Connect",
      description: "Complete your profile and start receiving college matches"
    }
  ];

  const benefits = [
    "Personalized college recommendations",
    "Direct connection with admission counselors",
    "Scholarship and financial aid information",
    "Application deadline reminders",
    "Campus visit scheduling assistance"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <Navigation />
      
      <main className="pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Create Your <span className="text-teal-600">Student Profile</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Build your personalized profile to receive tailored college recommendations and connect directly with institutions.
            </p>
            
            {/* Redirect Notice */}
            <div className="bg-teal-100 border border-teal-300 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-teal-800">
                🔄 Redirecting you to our secure profile form in a few seconds...
              </p>
            </div>

            <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => window.open('https://forms.gle/SBAQ5Ao8AvArV7XG7', '_blank')}
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Create Profile Now
            </Button>
          </div>

          {/* Process Steps */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-teal-100 rounded-full w-fit">
                      <step.icon className="h-8 w-8 text-teal-600" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                    <div className="mt-4 text-xs text-teal-600 font-semibold">
                      Step {index + 1}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Create a Profile?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="bg-gradient-to-br from-teal-500 to-blue-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Quick & Secure</h3>
                <ul className="space-y-3 text-teal-100">
                  <li>✓ Takes only 5-7 minutes to complete</li>
                  <li>✓ Your data is encrypted and secure</li>
                  <li>✓ No spam or unwanted communications</li>
                  <li>✓ Free to create and use</li>
                  <li>✓ Update anytime you want</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Form Preview */}
          <Card className="bg-white border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-center text-2xl">What You'll Fill Out</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="font-semibold mb-3 text-teal-600">Personal Details</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Phone Number</li>
                    <li>Date of Birth</li>
                    <li>City & State</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-teal-600">Academic Info</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Current Education Level</li>
                    <li>Academic Scores</li>
                    <li>Stream/Subject</li>
                    <li>Entrance Exam Scores</li>
                    <li>Future Goals</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-teal-600">Preferences</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Preferred Courses</li>
                    <li>Location Preference</li>
                    <li>Budget Range</li>
                    <li>College Type</li>
                    <li>Special Requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of students who have found their perfect college through Collzy.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-teal-600 hover:bg-gray-100"
                onClick={() => window.open('https://forms.gle/SBAQ5Ao8AvArV7XG7', '_blank')}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Create Your Profile
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateProfile;
