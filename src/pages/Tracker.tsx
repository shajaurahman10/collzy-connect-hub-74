
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AdmissionTracker from '@/components/AdmissionTracker';

const Tracker = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdmissionTracker />
      </div>
      
      <Footer />
    </div>
  );
};

export default Tracker;
