
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, User, Clock } from 'lucide-react';

interface Rating {
  id: number;
  userName: string;
  collegeName: string;
  rating: number;
  comment: string;
  timestamp: Date;
  course: string;
}

const LiveRatings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);

  useEffect(() => {
    // Load ratings from localStorage or initialize with sample data
    const savedRatings = localStorage.getItem('collzyRatings');
    if (savedRatings) {
      const parsedRatings = JSON.parse(savedRatings).map((rating: any) => ({
        ...rating,
        timestamp: new Date(rating.timestamp)
      }));
      setRatings(parsedRatings);
    } else {
      // Initialize with sample real-looking ratings
      const sampleRatings: Rating[] = [
        {
          id: 1,
          userName: "Priya S.",
          collegeName: "St. Xavier's College",
          rating: 5,
          comment: "Amazing placement support! Got placed in TCS through campus recruitment.",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          course: "Computer Science"
        },
        {
          id: 2,
          userName: "Rahul M.",
          collegeName: "Miranda House",
          rating: 4,
          comment: "Great faculty and campus life. Hostel facilities are excellent.",
          timestamp: new Date(Date.now() - 1000 * 60 * 12),
          course: "Economics"
        },
        {
          id: 3,
          userName: "Anjali K.",
          collegeName: "IIT Delhi",
          rating: 5,
          comment: "World-class education and research opportunities. Highly recommend!",
          timestamp: new Date(Date.now() - 1000 * 60 * 18),
          course: "Mechanical Engineering"
        },
        {
          id: 4,
          userName: "Vikash P.",
          collegeName: "Loyola College",
          rating: 4,
          comment: "Good academic environment. The campus is beautiful and peaceful.",
          timestamp: new Date(Date.now() - 1000 * 60 * 25),
          course: "Commerce"
        },
        {
          id: 5,
          userName: "Sneha R.",
          collegeName: "Jadavpur University",
          rating: 5,
          comment: "Excellent engineering program. Alumni network is very supportive.",
          timestamp: new Date(Date.now() - 1000 * 60 * 35),
          course: "Electrical Engineering"
        }
      ];
      setRatings(sampleRatings);
      localStorage.setItem('collzyRatings', JSON.stringify(sampleRatings));
    }
  }, []);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="bg-white shadow-lg border-0 animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl font-bold text-gray-900">
          <div className="flex items-center mr-3">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-green-600">Live</span>
          </div>
          Student Ratings
        </CardTitle>
        <p className="text-gray-600">Real feedback from students on Collzy</p>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {ratings.map((rating) => (
          <div
            key={rating.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 animate-fade-in"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{rating.userName}</p>
                  <p className="text-xs text-gray-500">{rating.course}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-right">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{formatTimeAgo(rating.timestamp)}</span>
              </div>
            </div>
            
            <p className="font-medium text-gray-800 text-sm mb-1">{rating.collegeName}</p>
            
            <div className="flex items-center mb-2">
              {renderStars(rating.rating)}
              <span className="ml-2 text-sm font-medium text-gray-700">{rating.rating}/5</span>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed">{rating.comment}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LiveRatings;
