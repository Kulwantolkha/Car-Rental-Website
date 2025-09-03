import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";

// Move testimonials array outside the component
const testimonials = [
  {
    id: 1,
    name: "Sanjay Sharma",
    role: "Content Creator",
    image: assets.testimonial_image_1,
    review:
      "The car rental service was superb! The vehicle was clean and well-maintained, and the booking process was seamless. I highly recommend it for stress-free travel.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Instagram Influencer",
    image: assets.testimonial_image_2,
    review:
      "I needed a reliable car for a photo shoot and this service delivered. The staff was very helpful, and the car was in excellent condition. Great experience!",
    rating: 4,
  },
  {
    id: 3,
    name: "Rahul Kumar",
    role: "Marketing Manager",
    image: assets.user_profile,
    review:
      "A fantastic experience from start to finish. The customer support was top-notch and they had a wide variety of cars to choose from. Will definitely use them again on my next trip.",
    rating: 5,
  },
];

const Testimonial = () => {
  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <svg
        key={index}
        width="18"
        height="18"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
          fill="#FF532E"
        />
      </svg>
    ));
  };

  return (
    <div className="flex-row py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What our Customer Say"
        subTitle="Discover why discerning traveler choose StayVenture for their luxury accommodations around the country."
      />
      <div className="flex justify-between gap-8 mt-16 pt-8">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex flex-col items-center px-5 py-4 relative">
              <img
                className="h-24 w-24 absolute -top-14 rounded-full"
                src={testimonial.image}
                alt={`${testimonial.name} profile`}
              />
              <div className="pt-8 text-center">
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-800/80">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-500 px-6 text-center">
              {testimonial.review}
            </p>
            <div className="flex justify-center pt-4">
              <div className="flex gap-0.5">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
