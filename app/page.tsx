import { HeroSection } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to TrackYourDev - The easiest way to track your developers',
  openGraph: {
    title: 'TrackYourDev - Developer Productivity Tracking Made Simple',
    description: 'Get started with TrackYourDev and gain insights into your team\'s productivity in minutes',
  }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <HowItWorks />
      {/* <TrustedBy /> */}
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
    </div>
  );
}