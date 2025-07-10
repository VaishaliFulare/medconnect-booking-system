
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Doctor, Appointment, AppState } from '../types';

interface AppContextType {
  state: AppState;
  addDoctor: (doctor: Omit<Doctor, '_id' | 'createdAt'>) => void;
  updateDoctor: (id: string, doctor: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  bookAppointment: (appointment: Omit<Appointment, '_id' | 'createdAt'>) => void;
  cancelAppointment: (id: string) => void;
  getDoctorById: (id: string) => Doctor | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: 'SET_DOCTORS'; payload: Doctor[] }
  | { type: 'ADD_DOCTOR'; payload: Doctor }
  | { type: 'UPDATE_DOCTOR'; payload: { id: string; doctor: Partial<Doctor> } }
  | { type: 'DELETE_DOCTOR'; payload: string }
  | { type: 'SET_APPOINTMENTS'; payload: Appointment[] }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'CANCEL_APPOINTMENT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  doctors: [],
  appointments: [],
  loading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_DOCTORS':
      return { ...state, doctors: action.payload };
    case 'ADD_DOCTOR':
      return { ...state, doctors: [...state.doctors, action.payload] };
    case 'UPDATE_DOCTOR':
      return {
        ...state,
        doctors: state.doctors.map(doctor =>
          doctor._id === action.payload.id
            ? { ...doctor, ...action.payload.doctor }
            : doctor
        ),
      };
    case 'DELETE_DOCTOR':
      return {
        ...state,
        doctors: state.doctors.filter(doctor => doctor._id !== action.payload),
      };
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload };
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] };
    case 'CANCEL_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(appointment =>
          appointment._id === action.payload
            ? { ...appointment, status: 'cancelled' as const }
            : appointment
        ),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// Mock data
const mockDoctors: Doctor[] = [
  {
    _id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    graduation: 'Harvard Medical School',
    picture: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions.',
    experience: '15 years',
    fees: 150,
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatology',
    graduation: 'Johns Hopkins University',
    picture: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Michael Chen specializes in dermatology and cosmetic procedures with a focus on patient care.',
    experience: '12 years',
    fees: 120,
    availableSlots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrics',
    graduation: 'Stanford University',
    picture: 'https://images.unsplash.com/photo-1594824292654-7ad6c3e2c9ea?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Emily Rodriguez is a pediatrician dedicated to providing comprehensive care for children.',
    experience: '10 years',
    fees: 100,
    availableSlots: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00'],
    createdAt: new Date().toISOString(),
  },
  {
    _id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    graduation: 'University of Pennsylvania',
    picture: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. James Wilson is an orthopedic surgeon specializing in sports medicine and joint replacement.',
    experience: '18 years',
    fees: 200,
    availableSlots: ['08:00', '09:00', '13:00', '14:00', '15:00'],
    createdAt: new Date().toISOString(),
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Initialize with mock data
    dispatch({ type: 'SET_DOCTORS', payload: mockDoctors });
    
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      try {
        const appointments = JSON.parse(savedAppointments);
        dispatch({ type: 'SET_APPOINTMENTS', payload: appointments });
      } catch (error) {
        console.error('Error loading appointments:', error);
      }
    }
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    if (state.appointments.length > 0) {
      localStorage.setItem('appointments', JSON.stringify(state.appointments));
    }
  }, [state.appointments]);

  const addDoctor = (doctorData: Omit<Doctor, '_id' | 'createdAt'>) => {
    const newDoctor: Doctor = {
      ...doctorData,
      _id: 'doctor-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_DOCTOR', payload: newDoctor });
  };

  const updateDoctor = (id: string, doctorData: Partial<Doctor>) => {
    dispatch({ type: 'UPDATE_DOCTOR', payload: { id, doctor: doctorData } });
  };

  const deleteDoctor = (id: string) => {
    dispatch({ type: 'DELETE_DOCTOR', payload: id });
  };

  const bookAppointment = (appointmentData: Omit<Appointment, '_id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      _id: 'appointment-' + Date.now(),
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_APPOINTMENT', payload: newAppointment });
  };

  const cancelAppointment = (id: string) => {
    dispatch({ type: 'CANCEL_APPOINTMENT', payload: id });
  };

  const getDoctorById = (id: string) => {
    return state.doctors.find(doctor => doctor._id === id);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        bookAppointment,
        cancelAppointment,
        getDoctorById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
