import type { Metadata } from 'next'

const metadata: Metadata = {
  title: {
    default: 'TrackYourDev - Agile Project Management Without the Overhead',
    template: '%s | TrackYourDev'
  },
  description: 'Automatic agile tracking from GitHub commits. No daily standups, no manual updates, no Jira complexity. Real project visibility without developer friction.',
  keywords: [
    'agile project management', 
    'automatic sprint tracking', 
    'github project management',
    'developer productivity tracking',
    'agile without meetings',
    'automatic task tracking',
    'jira alternative',
    'scrum tool',
    'project management automation',
    'commit-based tracking',
    'developer workflow tracking',
    'agile dashboard',
    'sprint management tool',
    'project tracking software'
  ],
  authors: [{ name: 'TrackYourDev' }],
  openGraph: {
    title: 'TrackYourDev - Agile Project Management That Actually Works',
    description: 'Stop fighting with Jira. Get automatic project tracking from GitHub commits. No standups, no manual updates, just real progress visibility.',
    url: 'https://trackyour.dev',
    siteName: 'TrackYourDev',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'TrackYourDev - Automatic Agile Project Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finally, Agile Project Management Without the Pain',
    description: 'Automatic tracking from GitHub commits. Zero overhead for developers, complete visibility for managers. The Jira killer is here.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
}

export default metadata;