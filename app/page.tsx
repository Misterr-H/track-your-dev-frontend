"use client"

import { HeroSection } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const response = await fetch('/api/auth/verify-github');
      const data = await response.json();
      console.log(data);
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        router.push('/dashboard');
      }
    };
    checkAuthentication();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <HowItWorks />
      {/* <TrustedBy /> */}
      {/* <Testimonials /> */}
      <Pricing />
    </div>
  );
}