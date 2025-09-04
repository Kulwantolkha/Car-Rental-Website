import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyCarData } from "../assets/assets";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    pickupTime: "",
    dropoffTime: "",
    totalDays: 0,
    totalAmount: 0,
  });
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  useEffect(() => {
    setCar(dummyCarData.find((car) => car._id === id));
  }, [id]);

  // Calculate total days and amount
  useEffect(() => {
    if (bookingData.startDate && bookingData.endDate && car) {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

      setBookingData((prev) => ({
        ...prev,
        totalDays: diffDays,
        totalAmount: diffDays * car.pricePerDay,
      }));
    }
  }, [bookingData.startDate, bookingData.endDate, car]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    // Add booking logic here
    console.log("Booking Data:", bookingData);
    alert("Booking confirmed!");
    setShowBookingForm(false);
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split("T")[0];

  return car ? (
    <>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer hover:text-primary transition-colors"
        >
          <img
            src={assets.arrow_icon}
            alt=""
            className="rotate-180 opacity-65"
          />
          Back to all cars
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Car Image */}
          <div>
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-auto max-h-96 object-cover rounded-xl shadow-lg"
            />

            {/* Car Specs below image */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text} 
                  className="flex flex-col items-center bg-gray-50 p-4 rounded-lg border"
                >
                  <img src={icon} alt="" className="h-6 w-6 mb-2 opacity-70" />
                  <span className="text-sm text-gray-600 text-center">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Car Details */}
          <div className="space-y-6">
            {/* Car Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {car.brand} {car.model}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {car.category} • {car.year}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">
                  {currency}
                  {car.pricePerDay}
                </span>
                <span className="text-gray-500">/day</span>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Features
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS Navigation",
                  "Heated Seats",
                  "Rear View Mirror",
                  "Air Conditioning",
                  "Power Steering",
                  "Airbags",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-600">
                    <img
                      src={assets.check_icon}
                      className="h-4 w-4 mr-3"
                      alt=""
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking Button */}
            <div className="pt-4">
              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Book Your Car
                </h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <img
                    src={assets.close_icon}
                    alt="Close"
                    className="h-6 w-6"
                  />
                </button>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                {/* Car Info */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-800">
                    {car.brand} {car.model}
                  </h4>
                  <p className="text-gray-600">
                    {currency}
                    {car.pricePerDay}
                    /day
                  </p>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={bookingData.startDate}
                      onChange={handleInputChange}
                      min={today}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dropoff Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={bookingData.endDate}
                      onChange={handleInputChange}
                      min={bookingData.startDate || today}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Time
                    </label>
                    <input
                      type="time"
                      name="pickupTime"
                      value={bookingData.pickupTime}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dropoff Time
                    </label>
                    <input
                      type="time"
                      name="dropoffTime"
                      value={bookingData.dropoffTime}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Booking Summary */}
                {bookingData.totalDays > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Booking Summary
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{bookingData.totalDays} day(s)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Rate:</span>
                        <span>
                          {currency}
                          {car.pricePerDay}
                        </span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount:</span>
                        <span className="text-primary">
                          {currency}
                          {bookingData.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default CarDetails;
