
interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

class AuthService {
  private currentUser: User | null = null;

  login(email: string, password: string): boolean {
    // Simple authentication for demo
    if (email === 'admin@collzy.com' && password === 'admin123') {
      this.currentUser = {
        id: '1',
        email: 'admin@collzy.com',
        name: 'Admin User',
        isAdmin: true
      };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return true;
    }
    
    if (email && password) {
      this.currentUser = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        isAdmin: false
      };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return true;
    }
    
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.isAdmin || false;
  }
}

export const authService = new AuthService();
export type { User };
