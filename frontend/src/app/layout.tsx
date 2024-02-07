import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Expense sheets',
  description: 'App to control your expenses',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
