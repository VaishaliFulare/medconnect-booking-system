
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate form submission
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Healthcare Avenue', 'Medical City, MC 12345', 'United States'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568 (Emergency)'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@medconnect.com', 'support@medconnect.com'],
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Monday - Friday: 8:00 AM - 8:00 PM', 'Saturday: 9:00 AM - 5:00 PM', 'Sunday: 10:00 AM - 4:00 PM'],
    },
  ];

  const faqData = [
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment by browsing our doctors page, selecting a doctor, and clicking 'Book Appointment'. Choose your preferred date and time from the available slots."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel your appointment from your profile page. For rescheduling, please cancel your current appointment and book a new one with your preferred time."
    },
    {
      question: "What if I'm running late for my appointment?",
      answer: "Please call us immediately if you're running late. We'll do our best to accommodate you, but appointments may need to be rescheduled if you're more than 15 minutes late."
    },
    {
      question: "Do you accept insurance?",
      answer: "We accept most major insurance plans. Please contact our office to verify if your specific insurance is accepted before your appointment."
    },
    {
      question: "What should I bring to my appointment?",
      answer: "Please bring a valid ID, your insurance card, a list of current medications, and any relevant medical records or test results."
    },
    {
      question: "Can I get prescription refills online?",
      answer: "Prescription refills require a consultation with your doctor. Please book a follow-up appointment or contact our office to discuss prescription renewals."
    },
    {
      question: "What are your emergency contact procedures?",
      answer: "For life-threatening emergencies, call 911 immediately. For urgent medical questions during business hours, call our main number. After hours, visit your nearest emergency room."
    },
    {
      question: "How do I access my medical records?",
      answer: "You can request your medical records by contacting our office. We provide records within 30 days of your request. Some records may be available through our patient portal."
    }
  ];

  const handleEmergencyCall = () => {
    if (confirm('This will dial emergency services (911). Continue?')) {
      window.location.href = 'tel:911';
      toast.error('Emergency call initiated. Stay on the line with the operator.');
    }
  };

  const handlePhoneCall = (number: string) => {
    window.location.href = `tel:${number}`;
    toast.success(`Calling ${number}...`);
  };

  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our services? Need help with booking an appointment?
            We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your inquiry..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Notice */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Medical Emergency?
                </h3>
                <p className="text-red-700 mb-4">
                  If you're experiencing a medical emergency, please call 911
                  immediately or visit your nearest emergency room.
                </p>
                <Button 
                  variant="destructive" 
                  className="w-full hover-scale"
                  onClick={handleEmergencyCall}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Call Emergency: 911
                </Button>
              </CardContent>
            </Card>

            {/* Quick Call Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover-scale"
                  onClick={() => handlePhoneCall('+15551234567')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Main Line: +1 (555) 123-4567
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover-scale"
                  onClick={() => handlePhoneCall('+15551234568')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Line: +1 (555) 123-4568
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <HelpCircle className="h-6 w-6" />
                Frequently Asked Questions
              </CardTitle>
              <p className="text-gray-600">
                Find quick answers to common questions about our services
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="animate-fade-in">
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Our Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive map would be integrated here</p>
                  <p className="text-sm">123 Healthcare Avenue, Medical City, MC 12345</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
