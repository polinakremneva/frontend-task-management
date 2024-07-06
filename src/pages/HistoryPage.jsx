import React from "react";
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
    <div className="w-3xl px-[3em]  py-[3em]">
      <section className="mb-[5em] px-7 py-5  rounded-lg shadow-md  bg-slate-200 dark:text-gray-300 dark:bg-transparent">
        <div className="flex items-center mb-8 mt-4 justify-center">
          <hr className="w-[7em] mx-3 h-3 my-8 bg-blue-950 border-0 rounded md:my-12 dark:bg-gray-700" />
          <h1 className="text-6xl pt-2 dark:text-slate-300 text-zinc-800 font-bold mb-4 tracking-wider uppercase ">
            mission & history
          </h1>
          <hr className="w-[7em] mx-3 h-3 my-8 bg-blue-950 border-0 rounded md:my-12 dark:bg-gray-700" />
        </div>
        <div className="text-lg leading-relaxed mb-4">
          <p>
            Feeling overwhelmed by juggling countless tasks and deadlines? We
            were too. This daily struggle inspired us to create Taskify—a
            solution that goes beyond traditional task management.
          </p>
        </div>
        <div className="text-lg leading-relaxed mb-4">
          <p>
            Taskify is designed to not only organize tasks but also boost
            productivity and collaboration. We simplify complex workflows,
            foster teamwork, and adapt to each user's unique needs.
          </p>
        </div>
        <div className="text-lg leading-relaxed mb-4">
          <p>
            What sets us apart? Our relentless commitment to innovation and
            user-centric design. With intuitive interfaces and powerful
            integrations, Taskify empowers individuals and teams to achieve more
            effortlessly.
          </p>
        </div>
        <div className="text-lg leading-relaxed">
          <p>
            Join thousands of users who rely on Taskify to streamline tasks,
            boost efficiency, and achieve their goals. Experience the difference
            with our cutting-edge technology and dedication to excellence.
          </p>
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
