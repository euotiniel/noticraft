import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import './globals.css'
import { GeistSans } from 'geist/font/sans';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"

const meta = {
  title: 'Noticraft',
  description:
    'The most elegant way to share your notifications with the world',
  image: `${WEBSITE_HOST_URL}/og-preview.jpg`,
}

export const metadata: Metadata = {
  title: meta.title,
  keywords: [
    "Otoniel Emanuel",
    "Otoniel",
    "Emanuel",
    "Noticraft",
    "Noti",
    "Fake",
    "Design",
    "Angola",
    "Luanda",
    "Vercel",
    "Next.js",
    "TailwindCSS",
    "Notification",
    "Noticraft",
    "Open source",
  ],
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: WEBSITE_HOST_URL,
    siteName: meta.title,
    locale: 'en-US',
    type: 'website',
      
  },
  alternates: {
    canonical: WEBSITE_HOST_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={GeistSans.className}>
          {children}
          <Analytics />
          <SpeedInsights />
      </body>
    </html>
  )
}