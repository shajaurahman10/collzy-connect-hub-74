
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, Building2, GraduationCap } from 'lucide-react';
import Footer from './Footer';

const Hero = () => {
  const stats = [
    { icon: Building2, label: 'Universities', value: '10,000+' },
    { icon: Users, label: 'Students', value: '500K+' },
    { icon: GraduationCap, label: 'Success Rate', value: '95%' },
    { icon: Star, label: 'Rating', value: '4.9/5' },
  ];

  const handleCreateProfile = () => {
    // Store current URL for return redirect
    localStorage.setItem('collzy-return-url', window.location.origin);
    // Redirect to Google Form
    window.open('https://forms.gle/Cp2G5Lm5sNFe8eJu6', '_blank');
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/20 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-100 text-sm font-medium mb-6 animate-fade-in">
                <Star className="h-4 w-4 mr-2" />
                Trusted by 500,000+ students worldwide
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
                Your Dream
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  College Awaits
                </span>
              </h1>

              {/* Create Profile Button - Enhanced design */}
              <div className="mb-6 animate-fade-in">
                <Button 
                  onClick={handleCreateProfile}
                  size="lg" 
                  className="text-lg px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-2 border-white shadow-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                  🎓 Create Profile - Apply to Colleges
                </Button>
              </div>
              
              <p className="text-xl text-blue-100 mb-8 max-w-2xl animate-fade-in">
                Connect directly with college admissions offices via email. 
                Streamlined applications, instant responses, and personalized guidance for your academic journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
                <Button asChild size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
                  <Link to="/colleges">
                    Explore 300+ Colleges
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left animate-fade-in">
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <stat.icon className="h-5 w-5 text-blue-200" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative lg:ml-auto animate-fade-in">
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-1 transition-transform duration-500">
                  <div className="flex items-center mb-6">
                    <img 
                      src="/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png" 
                      alt="College" 
                      className="h-12 w-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">Stanford University</h3>
                      <p className="text-gray-600">Stanford, CA</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-900 font-medium">4.9</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">$55,473</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Leading university in technology and innovation, located in Silicon Valley.
                  </p>
                  <Button className="w-full">Apply Now</Button>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-3 shadow-lg animate-bounce">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-gray-900 rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Hero;
