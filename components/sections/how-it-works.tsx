"use client"

import { motion } from "framer-motion";
import { Github, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Set up developer tracking in seconds, not hours. It&apos;s really that simple.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Step 1 */}
          <Card className="relative overflow-hidden border-2 border-primary/10 bg-background shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <motion.div 
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
              >
                <Github className="h-8 w-8 text-primary" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-2">Step 1</h3>
              <p className="text-xl mb-4">Install a github app to your org</p>
              <p className="text-muted-foreground">
                Simply add our app to your GitHub organization with a couple of clicks. 
                No complex configurations or integrations required.
              </p>
              
              <div className="absolute -right-12 -bottom-10 opacity-5">
                <Github className="h-40 w-40" />
              </div>
            </CardContent>
          </Card>
          
          {/* Step 2 */}
          <Card className="relative overflow-hidden border-2 border-primary/10 bg-background shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <motion.div 
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Check className="h-8 w-8 text-primary" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-2">Step 2</h3>
              <p className="text-xl mb-4">Done, Yeah 🎉</p>
              <p className="text-muted-foreground">
                That&apos;s it! Your developer productivity insights start flowing in immediately.
                No configuration, no setup, no hassle.
              </p>
              
              <div className="absolute -right-12 -bottom-10 opacity-5">
                <Check className="h-40 w-40" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional benefits */}
        <div className="mt-16 text-center">
          <motion.div 
            className="bg-muted/50 p-6 rounded-lg inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-lg font-medium">
              Yes, it&apos;s actually that simple. While other tools require hours of setup and training,
              KnowYourDev gets you up and running in seconds.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}