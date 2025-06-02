
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Award, Star, TrendingUp, MapPin } from 'lucide-react';

interface College {
  id: number;
  name: string;
  city: string;
  state: string;
  naac_grade: string;
  affiliation: string;
  website: string;
}

interface CollegeRankingsProps {
  colleges: College[];
}

const CollegeRankings = ({ colleges }: CollegeRankingsProps) => {
  const [rankedColleges, setRankedColleges] = useState<(College & { score: number; rank: number })[]>([]);

  useEffect(() => {
    // Calculate ranking based on NAAC grade and other factors
    const calculateScore = (college: College) => {
      const gradeScores = { 'A++': 100, 'A+': 90, 'A': 80, 'B++': 70, 'B+': 60, 'B': 50 };
      const affiliationBonus = college.affiliation === 'UGC' ? 10 : 5;
      const baseScore = gradeScores[college.naac_grade as keyof typeof gradeScores] || 30;
      
      return baseScore + affiliationBonus + Math.random() * 10; // Adding slight randomness for demo
    };

    const ranked = colleges
      .map(college => ({
        ...college,
        score: calculateScore(college)
      }))
      .sort((a, b) => b.score - a.score)
      .map((college, index) => ({
        ...college,
        rank: index + 1
      }));

    setRankedColleges(ranked);
  }, [colleges]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-blue-600">#{rank}</span>;
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A++': return 'bg-green-100 text-green-800';
      case 'A+': return 'bg-blue-100 text-blue-800';
      case 'A': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Collzy College Rankings 2024
        </h2>
        <p className="text-gray-600">Ranked based on NAAC grades, affiliation, and overall excellence</p>
      </div>

      {/* Top 3 Colleges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {rankedColleges.slice(0, 3).map((college) => (
          <Card key={college.id} className={`border-2 ${
            college.rank === 1 ? 'border-yellow-300 bg-yellow-50' :
            college.rank === 2 ? 'border-gray-300 bg-gray-50' :
            'border-amber-300 bg-amber-50'
          }`}>
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                {getRankIcon(college.rank)}
              </div>
              <CardTitle className="text-lg">{college.name}</CardTitle>
              <div className="flex items-center justify-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{college.city}, {college.state}</span>
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">{college.score.toFixed(1)}/100</span>
              </div>
              <Badge className={getGradeColor(college.naac_grade)}>
                NAAC {college.naac_grade}
              </Badge>
              <Button 
                size="sm" 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => window.open(college.website, '_blank')}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Complete Rankings List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Complete Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rankedColleges.map((college) => (
              <div key={college.id} 
                   className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 flex justify-center">
                    {getRankIcon(college.rank)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{college.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      {college.city}, {college.state}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Badge className={getGradeColor(college.naac_grade)}>
                    {college.naac_grade}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-semibold">{college.score.toFixed(1)}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegeRankings;
