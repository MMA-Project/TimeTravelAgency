import Link from 'next/link'
import { Clock, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    destinations: [
      { label: 'Paris 1889', href: '#destinations' },
      { label: 'Période Crétacé', href: '#destinations' },
      { label: 'Florence 1504', href: '#destinations' },
    ],
    company: [
      { label: 'Notre Histoire', href: '#about' },
      { label: 'Équipe', href: '#' },
      { label: 'Carrières', href: '#' },
      { label: 'Presse', href: '#' },
    ],
    legal: [
      { label: 'Conditions Générales', href: '#' },
      { label: 'Politique de Confidentialité', href: '#' },
      { label: 'Paradoxes Temporels', href: '#' },
    ],
  }

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-serif text-foreground">TimeTravel</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              La première agence de voyage temporel au monde. Explorez le passé en toute sécurité 
              avec nos experts chrononautes.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@timetravel.agency</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+33 1 00 00 00 00</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Paris, France (Siège Temporel)</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-foreground font-serif text-lg mb-6">Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-foreground font-serif text-lg mb-6">L'Agence</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-foreground font-serif text-lg mb-6">Informations</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} TimeTravel Agency. Tous droits réservés à travers le temps.</p>
            <p className="text-center md:text-right">
              Licence Chronologique N°42-TEMP-2026 - Autorisation Intertemporelle Valide
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
