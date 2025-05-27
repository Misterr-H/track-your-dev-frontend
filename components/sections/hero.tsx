"use client"

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useJoinWaitList } from "@/services/mutations";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const { mutate: joinWaitList } = useJoinWaitList();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinWaitList(email);
    setShowThankYou(true);
  };
  
  const scrollToNextSection = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95 z-10" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative z-20 text-center px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Track Your Developers, with minimum efforts
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            A simple tool with one click setup and deeper productivity insights, know what your devs are doing
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-11"
                required
              />
              <Button type="submit" size="lg" className="text-lg group">
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
          {showThankYou && (
            <div className="text-green-500 text-lg">
              Thank you for joining the waitlist! We will notify you when we launch.
            </div>
          )}
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute -bottom-48 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={scrollToNextSection}
        >
          <ChevronDown className="h-10 w-10 animate-bounce text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}