
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, FileText, ExternalLink, Clock } from 'lucide-react';

interface EntranceExam {
  id: string;
  name: string;
  full_name: string;
  conducting_body: string;
  exam_level: string;
  exam_type: string;
  exam_date?: string;
  application_start_date?: string;
  application_end_date?: string;
  registration_fee?: number;
  official_website: string;
  eligibility_criteria?: string;
  description?: string;
}

interface EntranceExamCardProps {
  exam: EntranceExam;
}

const EntranceExamCard = ({ exam }: EntranceExamCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'National': return 'bg-red-100 text-red-800 border-red-200';
      case 'State': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'University': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Engineering': return 'bg-purple-100 text-purple-800';
      case 'Medical': return 'bg-pink-100 text-pink-800';
      case 'Management': return 'bg-orange-100 text-orange-800';
      case 'Law': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isApplicationOpen = () => {
    if (!exam.application_start_date || !exam.application_end_date) return false;
    const now = new Date();
    const start = new Date(exam.application_start_date);
    const end = new Date(exam.application_end_date);
    return now >= start && now <= end;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-indigo-50/30">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900 mb-1">{exam.name}</CardTitle>
            <p className="text-sm text-gray-600 leading-tight">{exam.full_name}</p>
          </div>
          {isApplicationOpen() && (
            <Badge className="bg-green-100 text-green-800 animate-pulse">
              Open
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={getLevelColor(exam.exam_level)}>
            {exam.exam_level}
          </Badge>
          <Badge className={getTypeColor(exam.exam_type)}>
            {exam.exam_type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Conducting Body */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center text-gray-600 mb-1">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">Conducted by</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">{exam.conducting_body}</p>
        </div>

        {/* Important Dates */}
        <div className="grid grid-cols-1 gap-3">
          {exam.exam_date && (
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
              <div className="flex items-center text-blue-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-xs font-medium">Exam Date</span>
              </div>
              <span className="text-sm font-semibold text-blue-800">
                {formatDate(exam.exam_date)}
              </span>
            </div>
          )}
          
          {exam.application_end_date && (
            <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
              <div className="flex items-center text-orange-600">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-xs font-medium">Last Date</span>
              </div>
              <span className="text-sm font-semibold text-orange-800">
                {formatDate(exam.application_end_date)}
              </span>
            </div>
          )}
        </div>

        {/* Registration Fee */}
        {exam.registration_fee && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs text-green-600 font-medium mb-1">Registration Fee</p>
            <p className="text-lg font-bold text-green-800">₹{exam.registration_fee}</p>
          </div>
        )}

        {/* Eligibility */}
        {exam.eligibility_criteria && (
          <div>
            <div className="flex items-center text-gray-600 mb-2">
              <FileText className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Eligibility</span>
            </div>
            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
              {exam.eligibility_criteria}
            </p>
          </div>
        )}

        {/* Apply Button */}
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          onClick={() => window.open(exam.official_website, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Apply Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default EntranceExamCard;
