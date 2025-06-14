'use client'
import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const metadata: Metadata = {
  title: 'TrackYourDev - Track Your Developers, with minimum efforts',
  description: 'A simple tool with one click setup and deeper productivity insights, know what your devs are doing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';
  const isDemo = pathname === '/demo';

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            {!isDashboard && !isDemo && <Header />}
            <main>{children}</main>
            {!isDashboard && !isDemo && <Footer />}
            <Toaster />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}