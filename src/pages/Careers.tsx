
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, Globe, TrendingUp, Heart, Coffee } from 'lucide-react';

const Careers = () => {
  const jobOpenings = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / Bangalore",
      type: "Full-time",
      description: "Join our engineering team to build the next generation of our college discovery platform."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Mumbai / Remote",
      type: "Full-time",
      description: "Lead product strategy and roadmap for our core platform features."
    },
    {
      title: "College Partnership Manager",
      department: "Business Development",
      location: "Delhi / Pune",
      type: "Full-time",
      description: "Build and maintain relationships with colleges and educational institutions."
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Design intuitive and engaging user experiences for our platform."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: Globe,
      title: "Remote-First",
      description: "Work from anywhere with flexible working hours"
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Career development and learning opportunities"
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible PTO and work-life balance initiatives"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation />
      
      <main className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our <span className="text-purple-600">Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of a mission to transform how students discover and connect with colleges across India.
            </p>
          </div>

          {/* Culture Section */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                At Collzy, we believe in creating an environment where everyone can thrive, innovate, and make a meaningful impact on education.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <benefit.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Job Openings */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-lg text-gray-600">
                Explore exciting opportunities to grow your career with us.
              </p>
            </div>
            <div className="grid gap-6">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {job.department}
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {job.location}
                          </span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <Button className="mt-4 md:mt-0">
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for talented individuals who share our passion for education and technology.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
