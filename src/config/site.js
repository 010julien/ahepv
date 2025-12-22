export const CONTACT = {
  email: 'esthertred@yahoo.de',
  phone: '004915224384863',
  address: {
    fr: 'Bruno-körnerstr\n67059\nAllemagne',
    en: 'Bruno-körnerstr\n67059\nGermany',
    de: 'Bruno-körnerstr\n67059\nDeutschland'
  }
};

export const SITE = {
  name: 'AH2PV',
};

// Temporary site-wide announcement configuration
// Update dates, text and background to schedule a themed banner.
export const ANNOUNCEMENT = {
  id: 'noel-2025',
  enabled: true,
  // ISO dates; banner shows only within this window
  start: '2025-12-20T00:00:00Z',
  end: '2025-12-27T23:59:59Z',
  title: 'Joyeux Noël !',
  message: "Toute l'équipe AH2PV vous souhaite de merveilleuses fêtes.",
  backgroundImage: '/images/christmas-hero.jpg', // place your festive image under public/images/
  ctaText: 'Découvrir nos actions',
  ctaLink: '/events',
  ctaNewTab: false,
};
