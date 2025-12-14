
export interface AuthorizedUser {
  email: string;
  code: string;
  name: string;
  company: string;
  role: 'admin' | 'user' | 'vip';
}

// --- 🔐 SECURITY CONFIGURATION 🔐 ---
// Centralized access control list. In a real production app, 
// this would be replaced by a backend database call.

const AUTHORIZED_USERS: AuthorizedUser[] = [
  { 
    email: "admin@wakeel.ai", 
    code: "admin123", 
    name: "System Admin", 
    company: "Wakeel HQ",
    role: 'admin'
  },
  { 
    email: "demo@wakeel.ai", 
    code: "demo2024", 
    name: "Demo User", 
    company: "Future Corp",
    role: 'user'
  },
  { 
    email: "client@vip.com", 
    code: "client2024", 
    name: "VIP Client", 
    company: "Golden Inc",
    role: 'vip'
  },
  { 
    email: "test@user.com", 
    code: "123456", 
    name: "Beta Tester", 
    company: "Testing LLC",
    role: 'user'
  }
];

export const authenticateUser = (email: string, code: string): AuthorizedUser | null => {
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedCode = code.trim();
  
  return AUTHORIZED_USERS.find(u => 
    u.email === normalizedEmail && u.code === normalizedCode
  ) || null;
};
