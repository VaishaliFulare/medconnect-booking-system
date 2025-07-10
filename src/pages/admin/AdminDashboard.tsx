
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import {
  Users,
  UserPlus,
  Calendar,
  Stethoscope,
  Edit,
  Trash2,
  Plus,
} from 'lucide-react';
import { format } from 'date-fns';

const AdminDashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: appState, addDoctor, deleteDoctor, cancelAppointment } = useApp();
  
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    specialization: '',
    graduation: '',
    picture: '',
    bio: '',
    experience: '',
    fees: '',
    availableSlots: '09:00,10:00,11:00,14:00,15:00,16:00',
  });

  // Redirect if not admin
  if (!authState.user || authState.user.role !== 'admin') {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!doctorForm.name || !doctorForm.specialization || !doctorForm.graduation) {
      toast.error('Please fill in all required fields');
      return;
    }

    const doctorData = {
      ...doctorForm,
      fees: parseInt(doctorForm.fees) || 100,
      availableSlots: doctorForm.availableSlots.split(',').map(slot => slot.trim()),
    };

    addDoctor(doctorData);
    toast.success('Doctor added successfully!');
    setIsAddDoctorOpen(false);
    setDoctorForm({
      name: '',
      specialization: '',
      graduation: '',
      picture: '',
      bio: '',
      experience: '',
      fees: '',
      availableSlots: '09:00,10:00,11:00,14:00,15:00,16:00',
    });
  };

  const handleDeleteDoctor = (doctorId: string, doctorName: string) => {
    if (window.confirm(`Are you sure you want to delete Dr. ${doctorName}?`)) {
      deleteDoctor(doctorId);
      toast.success('Doctor deleted successfully');
    }
  };

  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(appointmentId);
      toast.success('Appointment cancelled successfully');
    }
  };

  const stats = [
    {
      title: 'Total Doctors',
      value: appState.doctors.length,
      icon: Stethoscope,
      color: 'text-blue-600',
    },
    {
      title: 'Total Appointments',
      value: appState.appointments.length,
      icon: Calendar,
      color: 'text-green-600',
    },
    {
      title: 'Scheduled',
      value: appState.appointments.filter(a => a.status === 'scheduled').length,
      icon: Calendar,
      color: 'text-yellow-600',
    },
    {
      title: 'Completed',
      value: appState.appointments.filter(a => a.status === 'completed').length,
      icon: Users,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Dialog open={isAddDoctorOpen} onOpenChange={setIsAddDoctorOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Doctor</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddDoctor} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <Input
                      value={doctorForm.name}
                      onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                      placeholder="Dr. John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Specialization *</label>
                    <Input
                      value={doctorForm.specialization}
                      onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                      placeholder="Cardiology"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Graduation *</label>
                  <Input
                    value={doctorForm.graduation}
                    onChange={(e) => setDoctorForm({ ...doctorForm, graduation: e.target.value })}
                    placeholder="Harvard Medical School"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Experience</label>
                    <Input
                      value={doctorForm.experience}
                      onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                      placeholder="10 years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Consultation Fee</label>
                    <Input
                      type="number"
                      value={doctorForm.fees}
                      onChange={(e) => setDoctorForm({ ...doctorForm, fees: e.target.value })}
                      placeholder="150"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Picture URL</label>
                  <Input
                    value={doctorForm.picture}
                    onChange={(e) => setDoctorForm({ ...doctorForm, picture: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <Textarea
                    value={doctorForm.bio}
                    onChange={(e) => setDoctorForm({ ...doctorForm, bio: e.target.value })}
                    placeholder="Brief description about the doctor..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Available Time Slots</label>
                  <Input
                    value={doctorForm.availableSlots}
                    onChange={(e) => setDoctorForm({ ...doctorForm, availableSlots: e.target.value })}
                    placeholder="09:00,10:00,11:00,14:00,15:00,16:00"
                  />
                  <p className="text-xs text-gray-500 mt-1">Comma-separated time slots</p>
                </div>
                
                <Button type="submit" className="w-full">
                  Add Doctor
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Doctors Management */}
          <Card>
            <CardHeader>
              <CardTitle>Doctors Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appState.doctors.map((doctor) => (
                  <div key={doctor._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={doctor.picture}
                        alt={doctor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        <p className="text-sm text-gray-500">${doctor.fees}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteDoctor(doctor._id, doctor.name)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Appointments Management */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appState.appointments.slice(0, 10).map((appointment) => (
                  <div key={appointment._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-600">Dr. {appointment.doctorName}</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(appointment.date), 'MMM dd, yyyy')} at {appointment.time}
                      </p>
                      <Badge
                        variant={
                          appointment.status === 'scheduled'
                            ? 'default'
                            : appointment.status === 'completed'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className="mt-1"
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    {appointment.status === 'scheduled' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
