export const blogPosts = [
  {
    id: 1,
    title: {
      fr: "L'impact de vos dons : Bilan de l'année 2023",
      en: "The impact of your donations: 2023 in review",
      de: "Die Wirkung Ihrer Spenden: Rückblick 2023"
    },
    excerpt: {
      fr: "Découvrez comment vos généreuses contributions ont transformé des vies et des communautés tout au long de l'année.",
      en: "Discover how your generous contributions transformed lives and communities throughout the year.",
      de: "Erfahren Sie, wie Ihre großzügigen Beiträge im Laufe des Jahres Leben und Gemeinschaften verändert haben."
    },
    readTime: { fr: "5 min de lecture", en: "5 min read", de: "5 Min. Lesezeit" },
    content: "Contenu complet de l'article ici...",
    image: "/images/education.jpg",
    author: "Sarah Johnson",
    date: "2023-12-28",
    category: "impact"
  },
  {
    id: 2,
    title: {
      fr: "5 façons de faire une différence dans votre communauté",
      en: "5 ways to make a difference in your community",
      de: "5 Wege, in Ihrer Gemeinschaft etwas zu bewirken"
    },
    excerpt: {
      fr: "Des actions simples mais puissantes que vous pouvez entreprendre dès aujourd'hui pour créer un changement positif dans votre région.",
      en: "Simple yet powerful actions you can start today to create positive change where you live.",
      de: "Einfache, aber wirkungsvolle Schritte, die Sie schon heute setzen können, um positive Veränderungen zu bewirken."
    },
    readTime: { fr: "4 min de lecture", en: "4 min read", de: "4 Min. Lesezeit" },
    content: "Contenu complet de l'article ici...",
    image: "/images/blog-community.jpg",
    author: "Michael Chen",
    date: "2023-12-22",
    category: "community"
  },
  {
    id: 3,
    title: {
      fr: "L'éducation change des vies : Rencontrez Sarah",
      en: "Education changes lives: meet Sarah",
      de: "Bildung verändert Leben: Lernen Sie Sarah kennen"
    },
    excerpt: {
      fr: "Lisez le parcours inspirant de Sarah, de bénéficiaire d'une bourse à leader communautaire et éducatrice.",
      en: "Read Sarah's inspiring journey from scholarship recipient to community leader and educator.",
      de: "Lesen Sie Sarahs inspirierenden Weg von der Stipendiatin zur Gemeindeführerin und Pädagogin."
    },
    readTime: { fr: "6 min de lecture", en: "6 min read", de: "6 Min. Lesezeit" },
    content: "Contenu complet de l'article ici...",
    image: "/images/blog-education.jpg",
    author: "Emma Davis",
    date: "2023-12-15",
    category: "success"
  },
  {
    id: 4,
    title: {
      fr: "Construire des solutions d'eau potable dans les villages ruraux",
      en: "Building clean water solutions in rural villages",
      de: "Sauberes Wasser für ländliche Dörfer"
    },
    excerpt: {
      fr: "Comment nos projets d'eau apportent de l'eau potable propre et sûre aux communautés dans le besoin.",
      en: "How our water projects bring safe, clean drinking water to communities in need.",
      de: "Wie unsere Wasserprojekte Gemeinden in Not mit sicherem, sauberem Trinkwasser versorgen."
    },
    readTime: { fr: "7 min de lecture", en: "7 min read", de: "7 Min. Lesezeit" },
    content: "Contenu complet de l'article ici...",
    image: "/images/blog-water.jpg",
    author: "David Wilson",
    date: "2023-12-08",
    category: "projects"
  },
  {
    id: 5,
    title: {
      fr: "Pleins feux sur les bénévoles : L'histoire de Maria",
      en: "Volunteer spotlight: Maria's story",
      de: "Ehrenamt im Fokus: Marias Geschichte"
    },
    excerpt: {
      fr: "Rencontrez Maria, une bénévole dévouée dont la compassion a touché d'innombrables vies dans notre organisation.",
      en: "Meet Maria, a dedicated volunteer whose compassion has touched countless lives in our organization.",
      de: "Lernen Sie Maria kennen, eine engagierte Freiwillige, deren Mitgefühl unzählige Leben in unserer Organisation berührt hat."
    },
    readTime: { fr: "5 min de lecture", en: "5 min read", de: "5 Min. Lesezeit" },
    content: "Contenu complet de l'article ici...",
    image: "/images/blog-volunteer.jpg",
    author: "Lisa Anderson",
    date: "2023-12-01",
    category: "volunteers"
  },
  {
    id: 6,
    title: {
      fr: "Le pouvoir du don mensuel",
      en: "The power of monthly giving",
      de: "Die Kraft des regelmäßigen Spendens"
    },
    excerpt: {
      fr: "Apprenez comment les dons récurrents créent un impact durable et un changement à long terme dans les communautés.",
      en: "Learn how recurring donations create lasting impact and long-term change in communities.",
      de: "Erfahren Sie, wie regelmäßige Spenden nachhaltige Wirkung und langfristige Veränderungen in Gemeinden bewirken."
    },
    readTime: { fr: "4 min de lecture", en: "4 min read", de: "4 Min. Lesezeit" },
    content: "Contenu complet de l'article ici...",
    image: "/images/blog-giving.jpg",
    author: "Robert Martinez",
    date: "2023-11-25",
    category: "giving"
  }
];

// Category slugs used in Blog.jsx; labels are provided by t('blog.categoryLabels.<slug>')
export const categories = [
  'all',
  'impact',
  'community',
  'success',
  'projects',
  'volunteers',
  'giving'
];
