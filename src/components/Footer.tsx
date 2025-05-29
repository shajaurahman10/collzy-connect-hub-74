
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact Us', href: '/contact' }
    ],
    services: [
      { name: 'Browse Colleges', href: '/colleges' },
      { name: 'Create Profile', href: '/create-profile' },
      { name: 'Add Your College', href: '/submit-college' },
      { name: 'Help Center', href: '/help-center' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Disclaimer', href: '/disclaimer' }
    ]
  };

  const contactInfo = [
    { icon: Mail, text: 'info@collzy.com', href: 'mailto:info@collzy.com' },
    { icon: Phone, text: '+91 9876543210', href: 'tel:+919876543210' },
    { icon: MapPin, text: 'Bangalore, Karnataka', href: '#' }
  ];

  return (
    <footer className="bg-blue-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png" 
                alt="Collzy" 
                className="h-10 w-10 rounded-full object-cover border-2 border-blue-200"
              />
              <span className="text-2xl font-bold">Collzy</span>
            </div>
            <p className="text-blue-200 mb-6 leading-relaxed">
              Your trusted pathway to higher education. Discover colleges, connect with institutions, 
              and shape your academic future with ease and confidence.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors"
                >
                  <contact.icon className="h-4 w-4" />
                  <span className="text-sm">{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-blue-200 text-sm">
                Get the latest college admission tips and education news.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-gray-900 bg-white border-0 focus:ring-2 focus:ring-blue-400 outline-none min-w-64"
              />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-center gap-2 text-sm text-blue-300">
            <span>© 2024 Collzy. All rights reserved. Created with</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span>by <span className="font-semibold text-white">Shajau Rahman</span></span>
          </div>
          
          {/* Social Media Icons (placeholder) */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
