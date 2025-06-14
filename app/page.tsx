"use client"

import { HeroSection } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { ProductVideo } from "@/components/sections/product-video";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppStore, setIsAuthenticated } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = AppStore.useState(s => s.isAuthenticated);

  useEffect(() => {
    const checkAuthentication = async () => {
      const response = await fetch('/api/auth/verify-github');
      const data = await response.json();
      console.log(data);
      setIsAuthenticated(data.authenticated);
    };
    checkAuthentication();
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ProductVideo />
      <HowItWorks />
      {/* <TrustedBy /> */}
      {/* <Testimonials /> */}
      <Pricing />
    </div>
  );
}