import React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel"; // Update path as per your project structure
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"; // Update path as per your project structure
import { FaStar } from "react-icons/fa";
import FactsSection from "@/components/FactSection";
import team from "../imgs/team.jpg";

function HistoryPage() {
  const customers = [
    {
      name: "John Doe",
      avatar: "/path/to/avatar1.jpg",
      rating: 5,
      review:
        "Excellent service! I'm very satisfied with the products and customer support.",
    },
    {
      name: "Jane Smith",
      avatar: "/path/to/avatar2.jpg",
      rating: 4,
      review: "Great experience. Fast delivery and high-quality products.",
    },
    {
      name: "Michael Johnson",
      avatar: "/path/to/avatar3.jpg",
      rating: 5,
      review: "Superb service. They exceeded my expectations.",
    },
    {
      name: "Emily Brown",
      avatar: "/path/to/avatar4.jpg",
      rating: 4,
      review: "Very reliable service. I appreciate their attention to detail.",
    },
    {
      name: "David Wilson",
      avatar: "/path/to/avatar5.jpg",
      rating: 5,
      review: "Exceptional quality and service. Highly recommended!",
    },
  ];

  return (
    <div className="w-3xl px-[6em]  py-[3em]">
      <section className="mb-[5em] px-7 py-5 rounded-lg shadow-md bg-slate-200 dark:text-gray-300 dark:bg-transparent">
        <div className="flex items-center mb-8 mt-4 justify-center">
          <hr className="w-[7em] mx-3 h-3 my-8 bg-purple-800 border-0 rounded md:my-12 dark:bg-gray-700" />
          <h1 className="text-5xl pt-2 dark:text-slate-300 text-zinc-800 font-bold mb-4 tracking-wider uppercase">
            Our Journey & Commitment
          </h1>
          <hr className="w-[7em] mx-3 h-3 my-8 bg-purple-800 border-0 rounded md:my-12 dark:bg-gray-700" />
        </div>
        <div className="flex justify-center mb-8">
          <img
            src={team}
            alt="Teamwork"
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 dark:text-gray-900">
          <div className="bg-white rounded-md shadow-md p-6 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <p className="text-lg leading-relaxed mb-4">
              At Taskify, we started with a simple yet powerful idea: to make
              task management easy and enjoyable. Our own struggles with
              productivity inspired us to create a platform that helps users
              organize tasks, collaborate effectively, and work efficiently.
            </p>
          </div>
          <div className="bg-white rounded-md shadow-md p-6 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <p className="text-lg leading-relaxed mb-4">
              Our dedication to innovation motivates us to continually improve
              our tools to meet the diverse needs of our users. Whether you're
              managing personal tasks or overseeing large projects, Taskify is
              designed to help teams achieve their goals together.
            </p>
          </div>
          <div className="bg-white rounded-md shadow-md p-6 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <p className="text-lg leading-relaxed mb-4">
              What makes Taskify unique? We're committed to user-friendly design
              and seamless functionality. With intuitive interfaces and powerful
              features, Taskify empowers individuals and teams to accomplish
              more with less effort.
            </p>
          </div>
        </div>
        {/* Call to Action */}
        <div className="flex justify-center items-center mt-8">
          <Link
            to="/auth/register"
            className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition duration-300 cursor-pointer"
          >
            Discover Taskify's Journey
          </Link>
        </div>
      </section>

      <section>
        <FactsSection />
      </section>
      <section className="mb-8 flex-col justify-center text-center">
        <h2 className="text-3xl font-bold mb-9">Customer Reviews</h2>
        <Carousel>
          <CarouselContent>
            {customers.map((customer, index) => (
              <CarouselItem
                key={index}
                className="flex flex-col items-center justify-center max-w-[20em]"
              >
                <Avatar className="mb-4">
                  <AvatarImage src={customer.avatar} />
                  <AvatarFallback>
                    {customer.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{customer.name}</h3>
                <div className="flex items-center mt-1">
                  {Array.from({ length: customer.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 pr-1" />
                  ))}
                </div>
                <p className="text-gray-400 mt-2">{customer.review}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-3em] dark:text-black bg-slate-300 hover:bg-slate-400" />
          <CarouselNext className="right-[-3em] dark:text-black bg-slate-300 hover:bg-slate-400" />
        </Carousel>
      </section>
    </div>
  );
}

export default HistoryPage;
