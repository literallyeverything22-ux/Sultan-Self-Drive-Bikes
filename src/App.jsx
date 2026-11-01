import React, { useState } from 'react';
import Navbar from './core/components/Navbar';
import BookingBar from './modules/bookings/components/BookingBar';
import FleetFilter from './modules/vehicles/components/FleetFilter';
import VehicleCard from './modules/vehicles/components/VehicleCard';
import VehicleDetailModal from './modules/vehicles/components/VehicleDetailModal';
import BookingSummaryModal from './modules/bookings/components/BookingSummaryModal';
import KycModal from './modules/kyc/components/KycModal';
import RazorpayModal from './modules/payments/components/RazorpayModal';
import BookingPassModal from './modules/bookings/components/BookingPassModal';
import StaffDashboardModal from './modules/operations/components/StaffDashboardModal';
import FranchiseModal from './modules/franchise/components/FranchiseModal';
import TrustBadges from './core/components/TrustBadges';
import TouristGuides from './core/components/TouristGuides';
import Footer from './core/components/Footer';
import { FLEET_VEHICLES, HUBS } from './modules/vehicles/data/fleetData';
import { getTodayDateString } from './core/lib/utils';
import { ShieldCheck, Sparkles, Phone, MapPin, ChevronRight, Zap, Check } from 'lucide-react';

export default function App() {
  // Booking Parameters (Location, Pick-up, Drop-off)
  const [bookingParams, setBookingParams] = useState({
    hubId: 'apsara',
    pickupDate: getTodayDateString(0),
    pickupTime: '10:00',
    dropDate: getTodayDateString(1),
    dropTime: '10:00',
  });

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTransmission, setSelectedTransmission] = useState('all');

  // Modal Triggers & Active Data
  const [activeDetailVehicle, setActiveDetailVehicle] = useState(null);
  const [activeBookingVehicle, setActiveBookingVehicle] = useState(null);
  const [currentBookingStepData, setCurrentBookingStepData] = useState(null);
  const [isKycOpen, setIsKycOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isFranchiseOpen, setIsFranchiseOpen] = useState(false);

  // Persistent list of confirmed bookings for the staff portal
  const [allBookings, setAllBookings] = useState([
    {
      bookingId: 'SLT-9821K',
      vehicle: FLEET_VEHICLES[0], // Burgman
      customer: { fullName: 'Mohammed Zubair', phone: '9848022338', dlNumber: 'AP04 20220045612' },
      paidAmount: 199,
      balanceAtPickup: 350,
      securityDeposit: 500,
      bookingParams: { pickupDate: getTodayDateString(0), pickupTime: '11:00', dropDate: getTodayDateString(1), dropTime: '11:00', hubId: 'apsara' },
      status: 'CONFIRMED'
    }
  ]);

  // Filter vehicles
  const filteredVehicles = FLEET_VEHICLES.filter(v => {
    if (selectedCategory !== 'all' && v.category !== selectedCategory) return false;
    if (selectedTransmission !== 'all' && v.transmission !== selectedTransmission) return false;
    return true;
  });

  // Booking Flow Steps
  const handleSelectVehicleToBook = (vehicle) => {
    setActiveBookingVehicle(vehicle);
  };

  const handleProceedToKyc = (summaryData) => {
    setCurrentBookingStepData(summaryData);
    setActiveBookingVehicle(null);
    setIsKycOpen(true);
  };

  const handleProceedToPayment = (kycData) => {
    setCurrentBookingStepData(kycData);
    setIsKycOpen(false);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (bookingPass) => {
    setIsPaymentOpen(false);
    setConfirmedBooking(bookingPass);
    setAllBookings(prev => [bookingPass, ...prev]);
  };

  return (
    <div className="min-h-screen bg-sultan-dark text-slate-100 flex flex-col selection:bg-sultan-orange selection:text-white">
      
      {/* 1. Global Navigation */}
      <Navbar
        onOpenStaff={() => setIsStaffOpen(true)}
        onOpenFranchise={() => setIsFranchiseOpen(true)}
      />

      {/* 2. Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden border-b border-slate-900 bg-gradient-to-b from-slate-950 via-sultan-dark to-slate-950">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sultan-orange/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-bold mb-6 backdrop-blur-md shadow-lg animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-sultan-orange animate-ping"></span>
            <span className="text-white">Kadapa's #1 Self Drive Bike Rental Hub</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400">Lock Any Bike for Just ₹199</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Ride Kadapa on Your Terms. <br />
            <span className="bg-gradient-to-r from-sultan-orange via-amber-400 to-amber-200 bg-clip-text text-transparent">
              Rent from ₹29/Hour.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Zero security hassle. Verified Suzuki Burgman, Honda Activa, Pulsar & Royal Enfield ready at Apsara Circle with sanitized ISI helmets.
          </p>

          {/* Trust Highlights */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> ₹199 Token Advance
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> 2-Min Paperless KYC
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> Free Sanitized Helmet
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> Instant Deposit Refund
            </span>
          </div>

        </div>
      </section>

      {/* 3. Booking Search Bar */}
      <BookingBar
        bookingParams={bookingParams}
        setBookingParams={setBookingParams}
        onSearch={() => {}}
      />

      {/* 4. Fleet Showcase Section */}
      <main id="fleet-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        
        {/* Section Title & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-sultan-orange/20 text-sultan-orange border border-sultan-orange/30">
              Verified Garage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Select Your Preferred Ride
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              All vehicles serviced, sanitized, and ready at Apsara Circle Hub, Kadapa.
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-xs text-slate-400 font-semibold">
              Showing <strong className="text-white">{filteredVehicles.length}</strong> available bikes
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <FleetFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTransmission={selectedTransmission}
          setSelectedTransmission={setSelectedTransmission}
        />

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              bookingParams={bookingParams}
              onSelectVehicle={handleSelectVehicleToBook}
              onViewDetails={setActiveDetailVehicle}
            />
          ))}
        </div>

        {/* 5. Trust & How It Works Badges */}
        <TrustBadges />

        {/* 6. Kadapa & Gandikota Tourist Guides */}
        <TouristGuides onSelectVehicleForTour={handleSelectVehicleToBook} />

      </main>

      {/* 7. Footer */}
      <Footer onOpenFranchise={() => setIsFranchiseOpen(true)} />

      {/* MODAL 1: Vehicle Details & Policy Modal */}
      {activeDetailVehicle && (
        <VehicleDetailModal
          vehicle={activeDetailVehicle}
          onClose={() => setActiveDetailVehicle(null)}
          onBook={handleSelectVehicleToBook}
        />
      )}

      {/* MODAL 2: Trip Customization & Add-ons Summary */}
      {activeBookingVehicle && (
        <BookingSummaryModal
          vehicle={activeBookingVehicle}
          bookingParams={bookingParams}
          onClose={() => setActiveBookingVehicle(null)}
          onProceedToKyc={handleProceedToKyc}
        />
      )}

      {/* MODAL 3: Instant Digital KYC Modal */}
      {isKycOpen && currentBookingStepData && (
        <KycModal
          bookingData={currentBookingStepData}
          onClose={() => setIsKycOpen(false)}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {/* MODAL 4: Razorpay ₹199 Advance Payment Simulation */}
      {isPaymentOpen && currentBookingStepData && (
        <RazorpayModal
          bookingData={currentBookingStepData}
          onClose={() => setIsPaymentOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* MODAL 5: Confirmed Booking Pass with QR & WhatsApp */}
      {confirmedBooking && (
        <BookingPassModal
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}

      {/* MODAL 6: Operations & Store Staff Portal */}
      {isStaffOpen && (
        <StaffDashboardModal
          onClose={() => setIsStaffOpen(false)}
          activeBookings={allBookings}
        />
      )}

      {/* MODAL 7: Franchise Opportunity & Connect Your Bike Modal */}
      {isFranchiseOpen && (
        <FranchiseModal
          onClose={() => setIsFranchiseOpen(false)}
        />
      )}

    </div>
  );
}
