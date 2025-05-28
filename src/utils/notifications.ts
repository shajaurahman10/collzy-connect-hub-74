
interface StarCollegeNomination {
  id: number;
  collegeName: string;
  nominator: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

class NotificationService {
  private storageKey = 'starCollegeNominations';

  getNominations(): StarCollegeNomination[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  addNomination(nomination: Omit<StarCollegeNomination, 'id' | 'timestamp' | 'status'>): void {
    const nominations = this.getNominations();
    const newNomination: StarCollegeNomination = {
      ...nomination,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    nominations.push(newNomination);
    localStorage.setItem(this.storageKey, JSON.stringify(nominations));
  }

  updateNominationStatus(id: number, status: 'approved' | 'rejected'): void {
    const nominations = this.getNominations();
    const nomination = nominations.find(n => n.id === id);
    if (nomination) {
      nomination.status = status;
      localStorage.setItem(this.storageKey, JSON.stringify(nominations));
    }
  }

  removeNomination(id: number): void {
    const nominations = this.getNominations();
    const filtered = nominations.filter(n => n.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }

  getPendingCount(): number {
    return this.getNominations().filter(n => n.status === 'pending').length;
  }
}

export const notificationService = new NotificationService();
export type { StarCollegeNomination };
