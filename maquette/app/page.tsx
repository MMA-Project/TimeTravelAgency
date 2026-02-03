import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Destinations } from '@/components/destinations'
import { About } from '@/components/about'
import { BookingForm } from '@/components/booking-form'
import { Footer } from '@/components/footer'
import { Chatbot } from '@/components/chatbot'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Destinations />
      <About />
      <BookingForm />
      <Footer />
      <Chatbot />
    </main>
  )
}
