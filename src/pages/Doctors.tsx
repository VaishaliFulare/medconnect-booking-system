
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DoctorCard from '../components/DoctorCard';
import { useApp } from '../context/AppContext';
import { Search, Filter } from 'lucide-react';

const Doctors: React.FC = () => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');

  // Get unique specializations
  const specializations = useMemo(() => {
    const unique = [...new Set(state.doctors.map(doctor => doctor.specialization))];
    return unique.sort();
  }, [state.doctors]);

  // Filter doctors based on search and specialization
  const filteredDoctors = useMemo(() => {
    return state.doctors.filter(doctor => {
      const matchesSearch = doctor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        doctor.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const matchesSpecialization = selectedSpecialization === 'all' ||
        doctor.specialization === selectedSpecialization;

      return matchesSearch && matchesSpecialization;
    });
  }, [state.doctors, searchTerm, selectedSpecialization]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialization('all');
  };

  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Doctor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our network of qualified healthcare professionals and book
            appointments with ease.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Doctors
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="w-full lg:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} of {state.doctors.length} doctors
          </p>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or clearing the filters.
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
