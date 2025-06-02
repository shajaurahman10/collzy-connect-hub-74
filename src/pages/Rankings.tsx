
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CollegeRankings from '@/components/CollegeRankings';
import { useColleges } from '@/hooks/useColleges';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, TrendingUp, Award, Star } from 'lucide-react';

const Rankings = () => {
  const { colleges, loading } = useColleges();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-blue-600 font-medium">Loading rankings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            College Rankings & Analysis
          </h1>
          <p className="text-lg sm:text-xl text-blue-700 max-w-3xl mx-auto px-4 leading-relaxed">
            Discover top-ranked colleges across India based on comprehensive analysis of NAAC grades, placement records, and academic excellence.
          </p>
        </div>

        <Tabs defaultValue="overall" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/50 backdrop-blur">
            <TabsTrigger value="overall" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Overall</span>
            </TabsTrigger>
            <TabsTrigger value="state" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>By State</span>
            </TabsTrigger>
            <TabsTrigger value="category" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>By Category</span>
            </TabsTrigger>
            <TabsTrigger value="rising" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Rising Stars</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overall">
            <CollegeRankings colleges={colleges} />
          </TabsContent>

          <TabsContent value="state">
            <div className="text-center py-12 bg-white/50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">State-wise Rankings Coming Soon</h3>
              <p className="text-gray-600">We're working on detailed state-wise college rankings to help you find the best colleges in your region.</p>
            </div>
          </TabsContent>

          <TabsContent value="category">
            <div className="text-center py-12 bg-white/50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Category-wise Rankings Coming Soon</h3>
              <p className="text-gray-600">Rankings by engineering, medical, management, and other categories will be available soon.</p>
            </div>
          </TabsContent>

          <TabsContent value="rising">
            <div className="text-center py-12 bg-white/50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Rising Stars Coming Soon</h3>
              <p className="text-gray-600">Discover emerging colleges with rapid growth and innovation in education.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Rankings;
