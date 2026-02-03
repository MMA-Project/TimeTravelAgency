'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, Sparkles } from 'lucide-react'

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-background">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        
        {/* Animated Stars/Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {mounted && [...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Time Vortex Effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-[600px] h-[600px] border border-primary/20 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute w-[500px] h-[500px] border border-primary/15 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
          <div className="absolute w-[400px] h-[400px] border border-primary/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary tracking-wider uppercase">Agence de Voyage Temporel Premium</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-foreground leading-tight text-balance">
            Voyagez à Travers
            <span className="block text-primary">le Temps</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Découvrez des époques légendaires. De la Tour Eiffel en construction au règne des dinosaures, 
            en passant par la Renaissance italienne.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-lg"
              onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explorer les Destinations
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/10 rounded-full px-8 text-lg bg-transparent"
            >
              En Savoir Plus
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to destinations"
          >
            <span className="text-xs uppercase tracking-widest">Découvrir</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  )
}
