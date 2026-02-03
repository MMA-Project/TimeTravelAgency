'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react'

interface DestinationCardProps {
  title: string
  era: string
  description: string
  image: string
  highlights: string[]
  duration: string
  danger: 'low' | 'medium' | 'high'
  onSelect: () => void
}

export function DestinationCard({
  title,
  era,
  description,
  image,
  highlights,
  duration,
  danger,
  onSelect,
}: DestinationCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const dangerColors = {
    low: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
  }

  const dangerLabels = {
    low: 'Risque Faible',
    medium: 'Risque Modéré',
    high: 'Risque Élevé',
  }

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 md:h-72 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Era Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border">
          <span className="text-xs font-medium text-primary tracking-wider uppercase">{era}</span>
        </div>

        {/* Danger Level */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border ${dangerColors[danger]}`}>
          <span className="text-xs font-medium tracking-wider uppercase">{dangerLabels[danger]}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-serif text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">{description}</p>

        {/* Info Row */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{title.split(' - ')[0]}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-6">
          {highlights.slice(0, 3).map((highlight, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group/btn"
          onClick={onSelect}
        >
          Découvrir
          <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}
