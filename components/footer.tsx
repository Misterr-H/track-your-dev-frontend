import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogoIcon } from "@/components/ui/logo";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Send 
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/40 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <LogoIcon className="h-6 w-6" />
              <span className="font-bold text-xl">KnowYourDev</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Track your developers with minimum efforts. One-click setup and deeper productivity insights.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm tracking-wider uppercase">Product</h3>
            <ul className="space-y-3">
              {["Features", "Integrations", "Pricing", "Changelog", "Roadmap"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm tracking-wider uppercase">Company</h3>
            <ul className="space-y-3">
              {["About Us", "Blog", "Careers", "Customers", "Press"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm tracking-wider uppercase">Subscribe</h3>
            <p className="text-muted-foreground">
              Get the latest news and articles to your inbox every month.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" type="email" className="max-w-[200px]" />
              <Button size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KnowYourDev. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}