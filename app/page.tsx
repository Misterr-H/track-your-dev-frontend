import { HeroSection } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";

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