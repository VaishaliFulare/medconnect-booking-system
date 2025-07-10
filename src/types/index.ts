
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'patient' | 'admin';
  createdAt: string;
}

export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  graduation: string;
  picture: string;
  bio: string;
  experience: string;
  fees: number;
  availableSlots: string[];
  createdAt: string;
}

export interface Appointment {
  _id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AppState {
  doctors: Doctor[];
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}
