
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { notificationService } from '@/utils/notifications';

interface StarNominationFormProps {
  onNominate?: () => void;
}

const StarNominationForm = ({ onNominate }: StarNominationFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    collegeName: '',
    nominator: '',
    reason: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.collegeName || !formData.nominator || !formData.reason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Add nomination to the notification system
    notificationService.addNomination({
      collegeName: formData.collegeName,
      nominator: formData.nominator,
      reason: formData.reason
    });

    toast({
      title: "Nomination Submitted",
      description: `Thank you for nominating ${formData.collegeName}! Our admin team will review your submission.`,
    });

    // Reset form and close dialog
    setFormData({
      collegeName: '',
      nominator: '',
      reason: ''
    });
    setIsOpen(false);
    
    if (onNominate) {
      onNominate();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3"
          size="lg"
        >
          <Star className="h-5 w-5 mr-2" />
          Make Your College a Star College
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Nominate Star College
          </DialogTitle>
          <DialogDescription>
            Help us feature outstanding colleges by nominating an institution for star status.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="collegeName">College Name *</Label>
            <Input
              id="collegeName"
              value={formData.collegeName}
              onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
              placeholder="Enter college name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="nominator">Your Name/Email *</Label>
            <Input
              id="nominator"
              value={formData.nominator}
              onChange={(e) => setFormData({...formData, nominator: e.target.value})}
              placeholder="Enter your name or email"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="reason">Why should this college be a star college? *</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              placeholder="Tell us what makes this college special..."
              rows={4}
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-yellow-500 hover:bg-yellow-600">
              <Star className="h-4 w-4 mr-2" />
              Submit Nomination
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StarNominationForm;
