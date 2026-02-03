import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Destinations } from "@/components/Destinations";
import { About } from "@/components/About";
import { Quiz } from "@/components/Quiz";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

function App() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Destinations />
      <About />
      <Quiz />
      <BookingForm />
      <Footer />
      <Chatbot />
    </main>
  );
}

export default App;
