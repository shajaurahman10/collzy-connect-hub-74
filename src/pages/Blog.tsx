
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: "Complete Guide to Engineering Admissions in India 2024",
      excerpt: "Everything you need to know about JEE Main, JEE Advanced, and state-level engineering entrance exams.",
      author: "Priya Sharma",
      date: "December 15, 2024",
      category: "Admissions",
      readTime: "8 min read",
      featured: true
    },
    {
      title: "Top 10 Medical Colleges in India: NEET Preparation Tips",
      excerpt: "Discover the best medical colleges and get expert tips for NEET preparation and admission process.",
      author: "Dr. Rajesh Kumar",
      date: "December 12, 2024",
      category: "Medical",
      readTime: "6 min read",
      featured: true
    },
    {
      title: "Choosing the Right College: A Student's Guide",
      excerpt: "Important factors to consider when selecting a college that aligns with your career goals.",
      author: "Anita Desai",
      date: "December 10, 2024",
      category: "Guidance",
      readTime: "5 min read",
      featured: false
    },
    {
      title: "Scholarship Opportunities for Indian Students",
      excerpt: "Comprehensive list of scholarships available for undergraduate and graduate students.",
      author: "Vikram Singh",
      date: "December 8, 2024",
      category: "Finance",
      readTime: "7 min read",
      featured: false
    },
    {
      title: "MBA Admissions: CAT vs Other Entrance Exams",
      excerpt: "Compare different MBA entrance exams and choose the right path for your business school journey.",
      author: "Kavya Reddy",
      date: "December 5, 2024",
      category: "MBA",
      readTime: "6 min read",
      featured: false
    },
    {
      title: "Life at Indian Universities: What to Expect",
      excerpt: "A comprehensive guide to campus life, hostel facilities, and student activities at Indian universities.",
      author: "Arjun Mehta",
      date: "December 3, 2024",
      category: "Campus Life",
      readTime: "9 min read",
      featured: false
    }
  ];

  const categories = [
    { name: "All", count: 24, icon: BookOpen },
    { name: "Admissions", count: 8, icon: GraduationCap },
    { name: "Medical", count: 4, icon: TrendingUp },
    { name: "Engineering", count: 6, icon: TrendingUp },
    { name: "MBA", count: 3, icon: TrendingUp },
    { name: "Campus Life", count: 3, icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <main className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Collzy <span className="text-green-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your go-to resource for college admissions, career guidance, and higher education insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Posts */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {blogPosts.filter(post => post.featured).map((post, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {post.category}
                          </span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <CardTitle className="text-lg leading-tight hover:text-green-600 transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Posts */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
                <div className="space-y-6">
                  {blogPosts.map((post, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                {post.category}
                              </span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 hover:text-green-600 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{post.date}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline">
                            Read More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button size="lg" variant="outline">
                  Load More Articles
                </Button>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center mt-16">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest college admission tips and education news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button className="bg-white text-green-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
