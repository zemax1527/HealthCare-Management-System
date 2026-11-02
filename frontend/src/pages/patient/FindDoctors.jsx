import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Video,
  Building,
} from 'lucide-react';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { useAuth } from '../../context/AuthContext';
import { UserAvatar } from '../../components/common/UserAvatar';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { FilterDropdown } from '../../components/common/FilterDropdown';
import { Modal } from '../../components/common/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';

export const FindDoctors = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  // Booking and Profile modals
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [profileDoctor, setProfileDoctor] = useState(null);
  const [bookingDate, setBookingDate] = useState('2026-11-05');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingType, setBookingType] = useState('In-Person');
  const [bookingReason, setBookingReason] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const list = await doctorService.getDoctors({
          search: searchTerm,
          specialty: specialtyFilter,
        });
        setDoctors(list || []);
      } catch {
        // Handled
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [searchTerm, specialtyFilter]);

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!bookingDoctor) return;

    await appointmentService.createAppointment({
      patientId: user?.id,
      patientName: user?.fullName || 'Eleanor Vance',
      doctorId: bookingDoctor.id,
      doctorName: bookingDoctor.name,
      doctorSpecialty: bookingDoctor.specialty,
      doctorAvatar: bookingDoctor.avatar,
      clinic: bookingDoctor.hospital,
      date: bookingDate,
      time: bookingTime,
      type: bookingType,
      reason: bookingReason || 'General consultation',
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingDoctor(null);
      setBookingReason('');
    }, 1500);
  };

  const specialties = [
    { label: 'All Specialties', value: 'All' },
    { label: 'Internal Medicine', value: 'Internal' },
    { label: 'Cardiology', value: 'Cardiovascular' },
    { label: 'Neurology', value: 'Neurology' },
    { label: 'Orthopedics', value: 'Orthopedics' },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by physician name, specialty, or clinic..."
            onClear={() => setSearchTerm('')}
          />
        </div>

        <div className="flex items-center gap-3">
          <FilterDropdown
            value={specialtyFilter}
            onChange={setSpecialtyFilter}
            options={specialties}
          />
        </div>
      </div>

      {/* Results Section */}
      {loading ? (
        <LoadingSpinner message="Finding accredited medical doctors..." />
      ) : doctors.length === 0 ? (
        <EmptyState
          title="No physicians found"
          description="Try broadening your search term or selecting 'All Specialties'."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setSpecialtyFilter('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <UserAvatar src={doc.avatar} alt={doc.name} size="lg" status="online" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-slate-900 truncate">{doc.name}</h3>
                    <p className="text-xs font-semibold text-blue-600">{doc.specialty}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal">({doc.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.hospital}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Next Open: <strong className="text-slate-800">{doc.availability}</strong></span>
                  </p>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {doc.bio}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Consult Fee</span>
                  <span className="text-sm font-extrabold text-slate-900">{doc.consultationFee}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setProfileDoctor(doc)}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setBookingDoctor(doc)}
                  >
                    Book Visit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Doctor Profile Modal */}
      {profileDoctor && (
        <Modal
          isOpen={!!profileDoctor}
          onClose={() => setProfileDoctor(null)}
          title={profileDoctor.name}
          description={`${profileDoctor.specialty} • ${profileDoctor.experience}`}
          maxWidth="md"
          footer={
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const target = profileDoctor;
                setProfileDoctor(null);
                setBookingDoctor(target);
              }}
            >
              Proceed to Book
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <UserAvatar src={profileDoctor.avatar} alt={profileDoctor.name} size="xl" />
              <div>
                <h4 className="text-base font-bold text-slate-900">{profileDoctor.name}</h4>
                <p className="text-xs text-blue-600 font-semibold">{profileDoctor.specialty}</p>
                <p className="text-slate-500 mt-1">{profileDoctor.hospital}</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <p><strong>Clinical Department:</strong> {profileDoctor.department}</p>
              <p><strong>Years of Practice:</strong> {profileDoctor.experience}</p>
              <p><strong>Patient Rating:</strong> ★ {profileDoctor.rating} ({profileDoctor.reviewsCount} reviews)</p>
            </div>
            <div>
              <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Physician Bio</h5>
              <p className="text-slate-600 leading-relaxed bg-blue-50/30 p-3 rounded-xl border border-blue-100">
                {profileDoctor.bio}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Book Appointment Modal */}
      {bookingDoctor && (
        <Modal
          isOpen={!!bookingDoctor}
          onClose={() => setBookingDoctor(null)}
          title={`Book Consultation with ${bookingDoctor.name}`}
          description={bookingDoctor.specialty}
          maxWidth="md"
          footer={
            !bookingSuccess ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setBookingDoctor(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleBookSubmit}>
                  Confirm Booking
                </Button>
              </>
            ) : undefined
          }
        >
          {bookingSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Appointment Scheduled!</h4>
              <p className="text-xs text-slate-600">
                Confirmation has been sent and added to your schedule.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-slate-600 mb-1">
                  Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingType('In-Person')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                      bookingType === 'In-Person'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    In-Person Clinic
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('Video Call')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                      bookingType === 'Video Call'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    Video Telehealth
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-600 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  min="2026-11-03"
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-600 mb-1">
                  Time Slot
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                >
                  <option value="09:00 AM">09:00 AM - 09:45 AM</option>
                  <option value="10:30 AM">10:30 AM - 11:15 AM</option>
                  <option value="02:00 PM">02:00 PM - 02:45 PM</option>
                  <option value="03:30 PM">03:30 PM - 04:15 PM</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-600 mb-1">
                  Chief Complaint / Reason
                </label>
                <textarea
                  rows={2}
                  value={bookingReason}
                  onChange={(e) => setBookingReason(e.target.value)}
                  placeholder="Describe your symptoms or consultation goals..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

