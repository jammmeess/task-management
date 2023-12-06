import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task Management App',
  description: 'Simple Task Management App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <div className='navbar w-full bg-sky-300'>
          <Navbar />
        </div>

        <div className="pt-15">
            {children}
         </div>
       
        </body>
    </html>
  )
}
