
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Collzy</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              India's leading college discovery platform helping students make informed decisions about their educational journey.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                <span>Kasargod, Kerala, India</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-blue-400" />
                <a href="mailto:collzy.info@gmail.com" className="hover:text-blue-400 transition-colors">
                  collzy.info@gmail.com
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <MessageCircle className="h-4 w-4 mr-2 text-blue-400" />
                <a href="https://wa.me/918129913205" className="hover:text-blue-400 transition-colors">
                  +91 8129913205
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/colleges" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">All Colleges</a></li>
              <li><a href="/private-colleges" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Private Colleges</a></li>
              <li><a href="/rankings" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">College Rankings</a></li>
              <li><a href="/submit-college" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Submit College</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Services</h4>
            <ul className="space-y-2">
              <li><a href="/tracker" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Admission Tracker</a></li>
              <li><a href="/create-profile" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Student Profile</a></li>
              <li><a href="/help-center" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Help Center</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">About Us</a></li>
              <li><a href="/careers" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Careers</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Collzy. All rights reserved. Making college selection stress-free for students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
