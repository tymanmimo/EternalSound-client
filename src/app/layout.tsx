import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AudioProvider from './context/AudioContext'
import FavoriteProvider from './context/FavoriteContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EternalSound'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FavoriteProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </FavoriteProvider>
      </body>
    </html>
  )
}
