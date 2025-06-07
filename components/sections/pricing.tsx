"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

type PricingPlan = {
  title: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: Array<{
    text: string;
    included: boolean;
  }>;
  highlighted?: boolean;
  badge?: string;
};

const pricingPlans: PricingPlan[] = [
  {
    title: "Basic",
    price: {
      monthly: 29,
      yearly: 290,
    },
    description: "Perfect for small teams just getting started",
    features: [
      { text: "Up to 10 developers", included: true },
      { text: "Basic analytics", included: true },
      { text: "GitHub integration", included: true },
      { text: "Daily reports", included: true },
      { text: "API access", included: false },
      { text: "Team performance metrics", included: false },
      { text: "Custom reporting", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    title: "Pro",
    price: {
      monthly: 79,
      yearly: 790,
    },
    description: "For growing development teams",
    features: [
      { text: "Up to 25 developers", included: true },
      { text: "Advanced analytics", included: true },
      { text: "GitHub integration", included: true },
      { text: "Real-time reports", included: true },
      { text: "API access", included: true },
      { text: "Team performance metrics", included: true },
      { text: "Custom reporting", included: false },
      { text: "Priority support", included: false },
    ],
    highlighted: true,
    badge: "Popular",
  },
  {
    title: "Enterprise",
    price: {
      monthly: 199,
      yearly: 1990,
    },
    description: "For large organizations with advanced needs",
    features: [
      { text: "Unlimited developers", included: true },
      { text: "Full analytics suite", included: true },
      { text: "All integrations", included: true },
      { text: "Real-time reports", included: true },
      { text: "API access", included: true },
      { text: "Team performance metrics", included: true },
      { text: "Custom reporting", included: true },
      { text: "Priority support", included: true },
    ],
  },
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  
  return (
    <section id="pricing" className="py-20 flex flex-col items-center">
      <div className="container px-4 md:px-6 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your team. All plans include a 14-day free trial.
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center space-x-4">
              <Label htmlFor="billing-toggle" className={billingCycle === "monthly" ? "font-semibold" : ""}>Monthly</Label>
              <Switch
                id="billing-toggle"
                checked={billingCycle === "yearly"}
                onCheckedChange={() =>
                  setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
                }
              />
              <div className="flex items-center gap-2">
                <Label htmlFor="billing-toggle" className={billingCycle === "yearly" ? "font-semibold" : ""}>Yearly</Label>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Save 20%
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${plan.highlighted ? "md:-mt-8" : ""}`}
            >
              <Card className={`h-full flex flex-col ${
                plan.highlighted 
                  ? "border-2 border-primary shadow-lg" 
                  : "border border-border"
              }`}>
                {plan.badge && (
                  <Badge className="absolute -top-3 right-4 bg-primary">
                    {plan.badge}
                  </Badge>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.highlighted ? "" : "border-2"}`}
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* FAQ or additional info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Need a custom plan? <Button variant="link" className="p-0 h-auto font-semibold">Contact our sales team</Button>
          </p>
        </div>
      </div>
    </section>
  );
}