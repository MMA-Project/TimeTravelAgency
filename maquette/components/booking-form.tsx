'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, Users, MapPin, Check, Loader2 } from 'lucide-react'

const destinations = [
  { id: 'paris-1889', name: 'Paris - 1889', era: 'Belle Époque' },
  { id: 'cretaceous', name: 'Période Crétacé', era: '-66 millions d\'années' },
  { id: 'florence-1504', name: 'Florence - 1504', era: 'Renaissance' },
]

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
    travelers: '1',
    departureDate: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section id="booking" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Demande Envoyée !
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Notre équipe de chrononautes vous contactera dans les 24 heures terrestres 
              pour finaliser votre voyage temporel.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: '',
                  email: '',
                  destination: '',
                  travelers: '1',
                  departureDate: '',
                  message: '',
                })
              }}
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/10 rounded-full px-8"
            >
              Nouvelle Demande
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm tracking-widest uppercase mb-4 block">Réservation</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
            Planifiez Votre Voyage
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Remplissez ce formulaire et notre équipe de spécialistes temporels 
            vous contactera pour créer votre voyage sur mesure.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Votre nom"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label htmlFor="destination" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Destination
                </label>
                <select
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                >
                  <option value="">Sélectionnez une destination</option>
                  {destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name} ({dest.era})
                    </option>
                  ))}
                </select>
              </div>

              {/* Travelers */}
              <div className="space-y-2">
                <label htmlFor="travelers" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Nombre de voyageurs
                </label>
                <select
                  id="travelers"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'voyageur' : 'voyageurs'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Departure Date */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="departureDate" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Date de départ souhaitée
                </label>
                <input
                  type="date"
                  id="departureDate"
                  value={formData.departureDate}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Des demandes spéciales ou des questions ?"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8">
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer ma Demande'
                )}
              </Button>
            </div>

            <p className="text-center text-muted-foreground text-sm mt-6">
              En soumettant ce formulaire, vous acceptez nos conditions de voyage temporel.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
