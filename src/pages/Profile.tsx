
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  X,
} from 'lucide-react';
import { format } from 'date-fns';

const Profile: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: appState, cancelAppointment } = useApp();

  if (!authState.user) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please login to view your profile
          </h1>
        </div>
      </div>
    );
  }

  // Get user's appointments
  const userAppointments = appState.appointments.filter(
    appointment => appointment.patientId === authState.user!._id
  );

  const upcomingAppointments = userAppointments.filter(
    appointment => appointment.status === 'scheduled'
  );

  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(appointmentId);
      toast.success('Appointment cancelled successfully');
    }
  };

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {authState.user.name}
                  </h2>
                  <Badge variant="secondary" className="mt-2">
                    {authState.user.role === 'admin' ? 'Administrator' : 'Patient'}
                  </Badge>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm">{authState.user.email}</span>
                  </div>
                  {authState.user.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-sm">{authState.user.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm">
                      Member since {format(new Date(authState.user.createdAt), 'MMM yyyy')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No upcoming appointments
                    </h3>
                    <p className="text-gray-600 mb-4">
                      You don't have any scheduled appointments yet.
                    </p>
                    <Button onClick={() => window.location.href = '/doctors'}>
                      Book an Appointment
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment._id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">
                              Dr. {appointment.doctorName}
                            </h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{format(new Date(appointment.date), 'PPP')}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                            <Badge
                              variant={
                                appointment.status === 'scheduled'
                                  ? 'default'
                                  : appointment.status === 'completed'
                                  ? 'secondary'
                                  : 'destructive'
                              }
                              className="mt-2"
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </div>
                          {appointment.status === 'scheduled' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelAppointment(appointment._id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Appointment History */}
            {userAppointments.length > upcomingAppointments.length && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Appointment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userAppointments
                      .filter(appointment => appointment.status !== 'scheduled')
                      .map((appointment) => (
                        <div
                          key={appointment._id}
                          className="border rounded-lg p-4 opacity-75"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">
                                Dr. {appointment.doctorName}
                              </h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>{format(new Date(appointment.date), 'PPP')}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                              <Badge
                                variant={appointment.status === 'completed' ? 'secondary' : 'destructive'}
                                className="mt-2"
                              >
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
