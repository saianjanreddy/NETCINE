export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  subscription_type: 'basic' | 'standard' | 'premium';
  created_at: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  poster_url: string;
  backdrop_url: string;
  video_url?: string;
  trailer_url?: string;
  genre: string[];
  rating: number;
  duration: number;
  release_year: number;
  uploaded_by?: string;
  upload_date?: string;
  download_count: number;
  share_count: number;
  is_featured: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface UploadProgress {
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  message?: string;
}