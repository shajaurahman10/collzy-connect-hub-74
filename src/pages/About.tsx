
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <main className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Collzy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to simplify college discovery and make higher education accessible to every student in India.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To bridge the gap between students and colleges by providing a seamless platform that eliminates the need for endless phone calls to admission agents.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To become India's most trusted college discovery platform, empowering students to make informed decisions about their higher education journey.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Collzy was born from a simple observation: students were spending countless hours calling admission agents, 
                waiting on hold, and struggling to get basic information about colleges. We realized there had to be a better way.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Founded by a team of education enthusiasts and technology experts, Collzy brings together comprehensive 
                college information, direct WhatsApp connectivity, and user-friendly design to create the ultimate 
                college discovery experience.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to serve thousands of students across India, helping them find their perfect 
                college match without the hassle of traditional admission processes.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Student-Centric</h3>
                <p className="text-gray-600">
                  Every decision we make is centered around improving the student experience and making education more accessible.
                </p>
              </div>
              <div className="text-center">
                <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-gray-600">
                  We believe in providing honest, accurate information to help students make the best decisions for their future.
                </p>
              </div>
              <div className="text-center">
                <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from our platform design to our customer support.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-8 opacity-90">
              Ready to discover your perfect college? Start your journey with Collzy today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/colleges" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Colleges
              </a>
              <a 
                href="https://forms.gle/SBAQ5Ao8AvArV7XG7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Create Profile
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
