
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import {
  Star,
  MapPin,
  DollarSign,
  Clock,
  Calendar as CalendarIcon,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';
import { format } from 'date-fns';

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDoctorById, bookAppointment } = useApp();
  const { state: authState } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const doctor = id ? getDoctorById(id) : null;

  if (!doctor) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Doctor not found
          </h1>
          <Button onClick={() => navigate('/doctors')}>
            Back to Doctors
          </Button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    if (!authState.isAuthenticated) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }

    const appointmentData = {
      patientId: authState.user!._id,
      doctorId: doctor._id,
      patientName: authState.user!.name,
      doctorName: doctor.name,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      status: 'scheduled' as const,
    };

    bookAppointment(appointmentData);
    toast.success('Appointment booked successfully!');
    setIsBookingOpen(false);
    setSelectedDate(undefined);
    setSelectedTime('');
  };

  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Info Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={doctor.picture}
                    alt={doctor.name}
                    className="w-48 h-48 object-cover rounded-lg mx-auto md:mx-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {doctor.name}
                        </h1>
                        <Badge variant="secondary" className="text-sm">
                          {doctor.specialization}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">4.8</span>
                        <span className="text-gray-600 ml-1">(127 reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="h-5 w-5 mr-2" />
                        <span>{doctor.graduation}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>{doctor.experience} of experience</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-5 w-5 mr-2" />
                        <span>Consultation fee: ${doctor.fees}</span>
                      </div>
                    </div>

                    <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                      <DialogTrigger asChild>
                        <Button size="lg" className="w-full md:w-auto">
                          <CalendarIcon className="h-5 w-5 mr-2" />
                          Book Appointment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Book Appointment</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Select Date</h4>
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date()}
                              className="rounded-md border"
                            />
                          </div>
                          {selectedDate && (
                            <div>
                              <h4 className="font-medium mb-2">Available Times</h4>
                              <div className="grid grid-cols-3 gap-2">
                                {doctor.availableSlots.map((time) => (
                                  <Button
                                    key={time}
                                    variant={selectedTime === time ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedTime(time)}
                                  >
                                    {time}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                          <Button
                            onClick={handleBookAppointment}
                            className="w-full"
                            disabled={!selectedDate || !selectedTime}
                          >
                            Confirm Booking
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About Dr. {doctor.name.split(' ').pop()}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock reviews */}
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">Sarah M.</span>
                      <span className="ml-2 text-gray-500 text-sm">2 days ago</span>
                    </div>
                    <p className="text-gray-700">
                      Excellent doctor! Very professional and took time to explain everything clearly.
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">John D.</span>
                      <span className="ml-2 text-gray-500 text-sm">1 week ago</span>
                    </div>
                    <p className="text-gray-700">
                      Great experience. Dr. {doctor.name.split(' ').pop()} was very thorough and caring.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Verified Doctor</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Board Certified</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Online Consultation</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm">Medical Center, Downtown</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
