
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle, MessageCircle, Book, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: "Getting Started",
      icon: Book,
      faqs: [
        {
          question: "How do I find colleges on Collzy?",
          answer: "You can browse colleges by visiting our Colleges page, use the search filters to narrow down by location, course, or fees."
        },
        {
          question: "Is Collzy free to use?",
          answer: "Yes, Collzy is completely free for students. You can browse colleges, get information, and connect with institutions at no cost."
        },
        {
          question: "How do I create a student profile?",
          answer: "Click on 'Create Profile' in the navigation menu, which will redirect you to our Google Form where you can fill in your details."
        }
      ]
    },
    {
      title: "College Applications",
      icon: MessageCircle,
      faqs: [
        {
          question: "How does the WhatsApp application feature work?",
          answer: "When you click 'Apply via WhatsApp', it opens WhatsApp with a pre-written message containing your inquiry about admission, fees, and facilities."
        },
        {
          question: "What information should I include in my application?",
          answer: "The pre-filled message includes questions about admission process, fee structure, hostel facilities, and course details. You can add any specific questions you have."
        },
        {
          question: "How long does it take for colleges to respond?",
          answer: "Response times vary by college, but most institutions respond within 24-48 hours during business days."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: HelpCircle,
      faqs: [
        {
          question: "The website is not loading properly. What should I do?",
          answer: "Try refreshing the page, clearing your browser cache, or using a different browser. If the issue persists, contact our support team."
        },
        {
          question: "WhatsApp is not opening when I click the apply button",
          answer: "Make sure you have WhatsApp installed on your device. If using a computer, ensure WhatsApp Web is properly set up."
        },
        {
          question: "I can't find a specific college. Can you add it?",
          answer: "You can submit college information through our 'Add Your College' page, or contact us to request addition of specific institutions."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 9 AM - 6 PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions anytime",
      action: "Send Email",
      available: "Response within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      action: "Call Now",
      available: "Mon-Fri 9 AM - 6 PM"
    }
  ];

  const quickLinks = [
    "How to apply to colleges",
    "Understanding fee structures",
    "Admission requirements",
    "Scholarship information",
    "Campus facilities",
    "Course details"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navigation />
      
      <main className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Help <span className="text-orange-600">Center</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to your questions about using Collzy and discovering your perfect college.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2 border-gray-200 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Popular Topics</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {quickLinks.map((link, index) => (
                <Button key={index} variant="outline" className="hover:bg-orange-50 hover:border-orange-300">
                  {link}
                </Button>
              ))}
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center gap-3 mb-6">
                    <category.icon className="h-6 w-6 text-orange-600" />
                    <h3 className="text-2xl font-semibold">{category.title}</h3>
                  </div>
                  <div className="grid gap-4">
                    {category.faqs.map((faq, faqIndex) => (
                      <Card key={faqIndex} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Need More Help?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <method.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <CardTitle>{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <p className="text-sm text-gray-500 mb-6">{method.available}</p>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl mb-8 opacity-90">
              Our support team is here to help you navigate your college discovery journey.
            </p>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Contact Support
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;
