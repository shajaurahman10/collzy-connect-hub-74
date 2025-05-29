
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  fullContent: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const BlogSection = () => {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Top 10 Engineering Colleges in India 2024",
      excerpt: "Discover the best engineering institutions that offer world-class education and excellent placement opportunities...",
      fullContent: `
# Top 10 Engineering Colleges in India 2024

India's engineering education landscape continues to evolve, with institutions constantly improving their infrastructure, faculty, and industry connections. Here's our comprehensive guide to the top engineering colleges in India for 2024.

## 1. Indian Institute of Technology (IIT) Delhi
**Established:** 1961
**Key Programs:** Computer Science, Mechanical, Electrical Engineering
**Placement Rate:** 95%
**Average Package:** ₹15-20 LPA

IIT Delhi stands as one of India's premier engineering institutions, known for its cutting-edge research facilities and distinguished alumni network. The campus spans over 320 acres and hosts students from across the globe.

**Why Choose IIT Delhi:**
- World-class faculty with international experience
- State-of-the-art laboratories and research facilities
- Strong industry partnerships with top MNCs
- Excellent alumni network in Silicon Valley and beyond

## 2. Indian Institute of Technology (IIT) Bombay
**Established:** 1958
**Key Programs:** Aerospace, Chemical, Computer Science
**Placement Rate:** 94%
**Average Package:** ₹18-25 LPA

Located in Powai, Mumbai, IIT Bombay is renowned for its innovation and entrepreneurship culture. The institute has produced numerous successful entrepreneurs and industry leaders.

## 3. Indian Institute of Technology (IIT) Madras
**Established:** 1959
**Key Programs:** Ocean Engineering, Biotechnology, Computer Science
**Placement Rate:** 93%
**Average Package:** ₹16-22 LPA

IIT Madras is known for its research excellence and beautiful campus. It's the only IIT to be ranked among the top 300 universities globally.

## 4. Indian Institute of Technology (IIT) Kanpur
**Established:** 1959
**Key Programs:** Materials Science, Aerospace, Computer Science
**Placement Rate:** 92%
**Average Package:** ₹15-20 LPA

IIT Kanpur pioneered the computer science education in India and continues to be a leader in technology and innovation.

## 5. Indian Institute of Technology (IIT) Kharagpur
**Established:** 1951
**Key Programs:** Mining Engineering, Metallurgy, Computer Science
**Placement Rate:** 90%
**Average Package:** ₹14-18 LPA

The first IIT to be established, IIT Kharagpur has a rich legacy and the largest campus among all IITs.

## Admission Process
- **JEE Advanced:** Primary entrance exam for IITs
- **Cut-off Ranks:** Typically under 10,000 for core branches
- **Counseling:** Through JoSAA (Joint Seat Allocation Authority)

## Preparation Tips
1. **Start Early:** Begin JEE preparation in Class 11
2. **Focus on Concepts:** Build strong fundamentals in Physics, Chemistry, and Mathematics
3. **Practice Regularly:** Solve previous years' papers and mock tests
4. **Time Management:** Develop efficient problem-solving techniques

## Industry Connections
These institutions maintain strong relationships with:
- Google, Microsoft, Amazon
- Indian conglomerates like Tata, Reliance
- Startups and emerging tech companies
- International research organizations

## Conclusion
Choosing the right engineering college is crucial for your career. These top institutions offer not just quality education but also networking opportunities that can shape your professional journey.

*Remember: Success depends not just on the institution but also on your dedication and hard work.*
      `,
      author: "Dr. Rajesh Sharma",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Engineering",
      image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png"
    },
    {
      id: 2,
      title: "Complete Guide to Medical College Admissions",
      excerpt: "Everything you need to know about NEET, medical college selection, and building a successful medical career...",
      fullContent: `
# Complete Guide to Medical College Admissions

The medical field in India is highly competitive, with lakhs of students competing for limited seats. This comprehensive guide will help you navigate the complex admission process and make informed decisions.

## NEET: The Gateway to Medical Education
The National Eligibility cum Entrance Test (NEET) is the single entrance exam for medical courses in India.

**NEET Exam Pattern:**
- **Duration:** 3 hours
- **Questions:** 180 (Physics: 45, Chemistry: 45, Biology: 90)
- **Marking:** +4 for correct answers, -1 for incorrect answers
- **Language:** 13 languages including English and Hindi

## Top Medical Colleges in India

### Government Medical Colleges
1. **AIIMS Delhi** - All India Institute of Medical Sciences
2. **JIPMER Puducherry** - Jawaharlal Institute of Postgraduate Medical Education
3. **King George's Medical University, Lucknow**
4. **Government Medical College, Thiruvananthapuram**
5. **Madras Medical College, Chennai**

### Private Medical Colleges
1. **Christian Medical College, Vellore**
2. **St. John's Medical College, Bangalore**
3. **Armed Forces Medical College, Pune**
4. **Kasturba Medical College, Manipal**
5. **JSS Medical College, Mysore**

## Admission Process
1. **NEET Qualification:** Minimum 50th percentile for general category
2. **Counseling:** Through MCC (Medical Counseling Committee)
3. **State Quotas:** 85% seats reserved for state domicile
4. **All India Quota:** 15% seats for all India merit

## Fee Structure
- **Government Colleges:** ₹20,000 - ₹1,00,000 per year
- **Private Colleges:** ₹5,00,000 - ₹25,00,000 per year
- **Deemed Universities:** ₹8,00,000 - ₹35,00,000 per year

## Specialization Options
After MBBS, students can pursue:
- **MD/MS:** Postgraduate medical degrees
- **Diploma:** Shorter specialization courses
- **Super Speciality:** DM/MCh for advanced specialization

## Career Prospects
- **Clinical Practice:** Private practice or hospital employment
- **Academic Career:** Teaching and research in medical colleges
- **Civil Services:** IAS, IPS through UPSC
- **International Opportunities:** Practice abroad after clearing respective exams

## Preparation Strategy
1. **NCERT Mastery:** Focus on Class 11 and 12 NCERT books
2. **Reference Books:** Use standard books for deeper understanding
3. **Mock Tests:** Regular practice with online test series
4. **Revision:** Multiple revisions of important topics
5. **Previous Years:** Analyze last 10 years' NEET papers

## Important Dates (2024)
- **Application:** February - March
- **Exam Date:** First Sunday of May
- **Result:** Third week of June
- **Counseling:** July onwards

## Tips for Success
- **Consistent Study:** 8-10 hours daily with proper breaks
- **Healthy Lifestyle:** Balanced diet and adequate sleep
- **Stress Management:** Meditation and physical exercise
- **Mock Analysis:** Analyze performance and improve weak areas

*The medical profession is noble and rewarding but requires dedication and perseverance. Start your preparation early and stay committed to your goal.*
      `,
      author: "Dr. Priya Nair",
      date: "March 12, 2024",
      readTime: "10 min read",
      category: "Medical",
      image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png"
    },
    {
      id: 3,
      title: "Business Schools: MBA Admission Guide 2024",
      excerpt: "Navigate the world of MBA admissions with insights into top B-schools, CAT preparation, and career prospects...",
      fullContent: `
# Business Schools: MBA Admission Guide 2024

The MBA landscape in India has evolved significantly, with new programs, specializations, and admission criteria. This guide provides comprehensive information for aspiring management professionals.

## Understanding MBA Programs

### Types of MBA Programs
1. **Full-time MBA:** Traditional 2-year residential program
2. **Executive MBA:** For working professionals with experience
3. **Part-time MBA:** Weekend or evening classes
4. **Online MBA:** Distance learning with digital platforms
5. **Integrated MBA:** 5-year programs after Class 12

## Top Business Schools in India

### Indian Institutes of Management (IIMs)
1. **IIM Ahmedabad** - The flagship IIM, known for general management
2. **IIM Bangalore** - Strong in consulting and finance
3. **IIM Calcutta** - Excellence in analytics and finance
4. **IIM Lucknow** - Growing reputation in marketing
5. **IIM Kozhikode** - Known for rural management

### Other Premier Institutions
1. **Indian School of Business (ISB), Hyderabad**
2. **XLRI Xavier School of Management, Jamshedpur**
3. **SP Jain Institute of Management, Mumbai**
4. **Faculty of Management Studies (FMS), Delhi**
5. **NMIMS, Mumbai**

## Entrance Examinations

### CAT (Common Admission Test)
- **Conducting Body:** IIMs on rotation
- **Sections:** Verbal Ability, Data Interpretation, Quantitative Aptitude
- **Duration:** 2 hours (40 minutes per section)
- **Difficulty:** High, with negative marking

### Other Major Exams
- **XAT:** For XLRI and other Xavier institutions
- **SNAP:** For Symbiosis institutes
- **CMAT:** For AICTE-approved colleges
- **MAT:** For various private colleges
- **GMAT:** For international programs

## Admission Process

### Stage 1: Written Exam
- Score in entrance examination
- Minimum percentile cutoffs for shortlisting

### Stage 2: Group Discussion & Personal Interview
- **Group Discussion:** Test of communication and leadership skills
- **Personal Interview:** Assessment of personality, goals, and fit
- **Written Ability Test:** Some colleges conduct WAT

### Selection Criteria
- **Entrance Exam Score:** 60-70% weightage
- **Academic Record:** 10-15% weightage
- **Work Experience:** 5-10% weightage (varies by college)
- **GD-PI Performance:** 15-25% weightage

## Specialization Options

### Core Specializations
- **Finance:** Investment banking, corporate finance, financial services
- **Marketing:** Brand management, digital marketing, sales
- **Operations:** Supply chain, logistics, manufacturing
- **Human Resources:** Talent management, organizational behavior
- **Strategy:** Consulting, business development

### Emerging Specializations
- **Data Analytics:** Business intelligence, data science
- **Digital Marketing:** Social media, e-commerce
- **Fintech:** Financial technology, blockchain
- **Healthcare Management:** Hospital administration, pharma
- **Sustainability:** ESG, green business practices

## Career Prospects and Placements

### Top Recruiters
**Consulting:** McKinsey, BCG, Bain, Deloitte, PwC
**Banking:** Goldman Sachs, JP Morgan, Citi, HDFC Bank
**Technology:** Google, Microsoft, Amazon, IBM
**FMCG:** HUL, P&G, Nestle, ITC
**Startups:** Flipkart, Paytm, Ola, Swiggy

### Salary Packages (2024)
- **IIM A/B/C:** ₹25-35 LPA average
- **Other IIMs:** ₹15-25 LPA average
- **Tier 2 Colleges:** ₹8-15 LPA average
- **International Placements:** $80,000-150,000 annually

## Preparation Strategy

### For CAT Preparation
1. **Quantitative Aptitude:**
   - Focus on arithmetic, algebra, geometry
   - Practice mental calculations
   - Learn shortcut methods

2. **Verbal Ability:**
   - Read newspapers and magazines daily
   - Practice reading comprehension
   - Build vocabulary systematically

3. **Data Interpretation:**
   - Practice graphs, tables, charts
   - Improve calculation speed
   - Learn data analysis techniques

### Timeline (12-month preparation)
- **Months 1-6:** Concept building and basic practice
- **Months 7-9:** Advanced practice and mock tests
- **Months 10-12:** Intensive revision and final preparation

## Financial Planning

### Course Fees
- **IIMs:** ₹20-25 lakhs for 2 years
- **Private Colleges:** ₹10-20 lakhs for 2 years
- **Government Colleges:** ₹2-5 lakhs for 2 years

### Funding Options
- **Education Loans:** Available from all major banks
- **Scholarships:** Merit and need-based scholarships
- **Corporate Sponsorship:** For working professionals
- **Part-time Work:** During studies (limited scope)

## Return on Investment
The MBA degree typically pays for itself within 3-5 years through:
- Higher starting salaries
- Faster career progression
- Better networking opportunities
- Enhanced skill set

*An MBA is more than just a degree - it's a transformation that opens doors to leadership roles across industries. Choose your program wisely based on your career goals and interests.*
      `,
      author: "Prof. Amit Gupta",
      date: "March 8, 2024",
      readTime: "12 min read",
      category: "Management",
      image: "/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png"
    }
  ];

  const toggleExpanded = (postId: number) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Latest Insights & Guides
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice and comprehensive guides to help you make informed educational decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post) => (
            <Card 
              key={post.id} 
              className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                expandedPost === post.id ? 'md:col-span-2 lg:col-span-3' : ''
              }`}
            >
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-3">{post.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6 pt-0">
                {expandedPost === post.id ? (
                  <div className="prose prose-sm max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ 
                        __html: post.fullContent.replace(/\n/g, '<br/>').replace(/#{1,6} /g, '<strong>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm sm:text-base line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={() => toggleExpanded(post.id)}
                  className="w-full hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  {expandedPost === post.id ? (
                    'Show Less'
                  ) : (
                    <>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
