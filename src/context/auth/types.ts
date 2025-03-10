
// Types for authentication context

// Interface for the user profile
export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email: string;
  phone_number?: string;
  address?: string;
  avatar_url?: string;
  is_driver: boolean;
}

// Interface for the authentication context
export interface AuthContextType {
  user: any | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}
