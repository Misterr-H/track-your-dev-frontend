"use client"

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  "Track developer productivity",
  "GitHub integration",
  "Real-time analytics",
  "Team performance metrics",
  "Custom reporting",
  "Priority support",
  "API access",
  "Unlimited developers"
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 flex flex-col items-center">
      <div className="container px-4 md:px-6 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get access to all TrackYourDev features with our straightforward pricing.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-primary shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">TrackYourDev Pro</CardTitle>
                <CardDescription>Complete access to all features</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$10</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    window.open('https://checkout.dodopayments.com/buy/pdt_tWWK1EU7qQbAg9WjO1PK1?quantity=1', '_blank');
                  }}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Questions? <Button 
            variant="link" className="p-0 h-auto font-semibold" onClick={() => window.open('mailto:himanshu@trackyour.dev', '_blank')}>Contact us</Button>
          </p>
        </div>
      </div>
    </section>
  );
}