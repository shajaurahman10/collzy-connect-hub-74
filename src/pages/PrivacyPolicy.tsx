
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, UserCheck, AlertTriangle, Clock } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: UserCheck,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating a profile (name, email, phone number, educational background)",
        "Usage data about how you interact with our platform",
        "Device information and IP address for security purposes",
        "Communications between you and colleges through our platform"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To provide and improve our college discovery services",
        "To facilitate communication between students and educational institutions",
        "To send relevant college recommendations and updates",
        "To ensure platform security and prevent fraudulent activities",
        "To analyze usage patterns and improve user experience"
      ]
    },
    {
      icon: Lock,
      title: "Information Sharing",
      content: [
        "We share your profile information with colleges when you express interest or apply",
        "Aggregated, non-personal data may be shared for research and analytics",
        "We never sell your personal information to third parties",
        "Information may be disclosed if required by law or to protect our rights"
      ]
    },
    {
      icon: Shield,
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your data",
        "Regular security audits and updates to our systems",
        "Secure servers and data centers with 24/7 monitoring",
        "Limited access to personal data on a need-to-know basis"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Your Rights",
      content: [
        "Access, update, or delete your personal information",
        "Opt-out of marketing communications at any time",
        "Request a copy of all data we have about you",
        "Withdraw consent for data processing (where applicable)",
        "File complaints with data protection authorities"
      ]
    },
    {
      icon: Clock,
      title: "Data Retention",
      content: [
        "Profile information is retained while your account is active",
        "Communication logs are kept for 3 years for quality assurance",
        "Usage analytics are retained in aggregated form indefinitely",
        "You can request deletion of your data at any time"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      <main className="pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy <span className="text-blue-600">Policy</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: December 15, 2024
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                At Collzy, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy outlines our practices regarding the collection, use, and disclosure of information when 
                you use our college discovery platform. By using Collzy, you agree to the collection and use of information 
                in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <section.icon className="h-6 w-6 text-blue-600" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cookies Policy */}
          <Card className="mt-8 bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                Cookies and Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our platform:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li>• <strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                <li>• <strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li>• <strong>Marketing Cookies:</strong> Used to show relevant college recommendations</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can control cookie settings through your browser preferences.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-8 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-xl">Questions About This Policy?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@collzy.com</p>
                <p><strong>Phone:</strong> +91 9876543210</p>
                <p><strong>Address:</strong> 123 Education Hub, Bangalore, Karnataka 560001</p>
              </div>
            </CardContent>
          </Card>

          {/* Updates Notice */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Policy Updates</h3>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
