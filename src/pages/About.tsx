
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Heart,
  Shield,
  Users,
  Award,
  CheckCircle,
  Star,
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'We put our patients first, ensuring compassionate and personalized healthcare for everyone.',
    },
    {
      icon: Shield,
      title: 'Safety & Privacy',
      description: 'Your health information is protected with the highest levels of security and privacy.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards of medical care with board-certified professionals.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in building strong relationships with our patients and the community we serve.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Patients Served' },
    { number: '50+', label: 'Expert Doctors' },
    { number: '15+', label: 'Medical Specialties' },
    { number: '99%', label: 'Patient Satisfaction' },
  ];

  const team = [
    {
      name: 'Dr. Michael Thompson',
      role: 'Chief Medical Officer',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      credentials: 'MD, Harvard Medical School',
    },
    {
      name: 'Dr. Sarah Williams',
      role: 'Director of Patient Care',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      credentials: 'MD, Stanford University',
    },
    {
      name: 'Dr. James Rodriguez',
      role: 'Head of Emergency Medicine',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face',
      credentials: 'MD, Johns Hopkins',
    },
  ];

  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About MedConnect
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            MedConnect is your trusted healthcare partner, connecting patients with
            qualified medical professionals through our innovative platform. We're
            committed to making healthcare accessible, convenient, and personalized.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              To revolutionize healthcare delivery by providing a seamless, technology-driven
              platform that connects patients with the right medical professionals at the
              right time.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that everyone deserves access to quality healthcare, and we're
              working to break down barriers that prevent people from getting the care
              they need when they need it most.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
              alt="Healthcare professionals"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to
              providing exceptional healthcare services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary text-white rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90">
              Numbers that reflect our commitment to healthcare excellence
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the experienced medical professionals leading our mission to
              transform healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.credentials}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="bg-gray-50 rounded-2xl p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quality Assurance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards of healthcare quality through
              rigorous verification and continuous monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Board-Certified Doctors
                </h3>
                <p className="text-gray-600 text-sm">
                  All our doctors are board-certified and regularly verified
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  HIPAA Compliant
                </h3>
                <p className="text-gray-600 text-sm">
                  Full compliance with healthcare privacy regulations
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  24/7 Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Round-the-clock patient support and emergency assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
