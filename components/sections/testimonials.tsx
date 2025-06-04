"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "TrackYourDev has revolutionized how we track developer productivity. The insights are invaluable for our team planning.",
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechNova Inc.",
    avatar: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    quote: "The simplicity of setup was a game-changer for us. One click and we had visibility into our development process like never before.",
    name: "Michael Chen",
    role: "Engineering Manager",
    company: "Quantum Systems",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    quote: "We've been able to identify bottlenecks and optimize workflows thanks to TrackYourDev's insightful analytics.",
    name: "Emily Rodriguez",
    role: "VP of Engineering",
    company: "Elevate Solutions",
    avatar: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    quote: "The ROI was immediate. Within weeks of implementing TrackYourDev, we saw a 20% increase in developer productivity.",
    name: "David Lee",
    role: "Director of Engineering",
    company: "FutureTech",
    avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  return (
    <section id="testimonials" className="py-20 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how TrackYourDev is transforming development teams around the world
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto overflow-hidden">
          <div
            ref={testimonialsRef}
            className="flex flex-no-wrap transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${-activeIndex * 100}%)` }}
            onTransitionEnd={() => setIsAnimating(false)}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <Card className="border-0 shadow-lg bg-background">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <Quote className="h-8 w-8 text-primary/20 mx-auto md:mx-0 mb-4" />
                        <p className="text-lg mb-4 italic">{testimonial.quote}</p>
                        <div>
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prevTestimonial}
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`w-2 h-2 rounded-full p-0 m-1 ${
                  activeIndex === index ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={nextTestimonial}
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}