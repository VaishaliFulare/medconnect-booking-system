
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Doctor } from '../types';
import { Calendar, Star, DollarSign } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="doctor-card">
      <div className="aspect-w-16 aspect-h-12">
        <img
          src={doctor.picture}
          alt={doctor.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">4.8</span>
          </div>
        </div>
        
        <Badge variant="secondary" className="mb-3">
          {doctor.specialization}
        </Badge>
        
        <p className="text-gray-600 text-sm mb-3">{doctor.graduation}</p>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {doctor.bio}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>${doctor.fees}</span>
          </div>
          <div className="text-sm text-gray-600">
            {doctor.experience} experience
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/doctors/${doctor._id}`)}
            className="flex-1"
          >
            View Profile
          </Button>
          <Button
            size="sm"
            onClick={() => navigate(`/doctors/${doctor._id}`)}
            className="flex-1"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
