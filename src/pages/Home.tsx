
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DoctorCard from '../components/DoctorCard';
import { useApp } from '../context/AppContext';
import {
  Heart,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const featuredDoctors = state.doctors.slice(0, 3);

  const features = [
    {
      icon: Heart,
      title: 'Expert Care',
      description: 'Board-certified doctors with years of experience',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is protected with enterprise-grade security',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Book appointments anytime with our online system',
    },
    {
      icon: Users,
      title: 'Trusted by Thousands',
      description: 'Join over 10,000 satisfied patients',
    },
  ];

  const stats = [
    { number: '1000+', label: 'Happy Patients' },
    { number: '50+', label: 'Expert Doctors' },
    { number: '15+', label: 'Specializations' },
    { number: '24/7', label: 'Support' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Your Health,
                <br />
                Our Priority
              </h1>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Book appointments with qualified doctors, manage your health records,
                and get the care you deserve with MedConnect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/doctors')}
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Find a Doctor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/register')}
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face"
                alt="Healthcare Professional"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <div className="font-semibold text-gray-900">Verified Doctors</div>
                    <div className="text-sm text-gray-600">Board Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MedConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best healthcare experience
              through innovative technology and expert care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Doctors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our team of board-certified physicians is here to provide you with
              exceptional care across various specializations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => navigate('/doctors')}
              className="btn-primary"
            >
              View All Doctors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust MedConnect for their healthcare needs.
            Book your first appointment today.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/register')}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
