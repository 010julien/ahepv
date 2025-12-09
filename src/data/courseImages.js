// Course hero images mapping
// For production, these should be hosted on a CDN or stored in assets
export const courseImages = {
  // Math - blue/purple theme
  mathematics: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', // Math formulas
  
  // French - warm orange/pink theme  
  french: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', // Books and writing
  
  // Physics - teal/blue theme
  physics: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80', // Physics lab
  
  // Chemistry - purple/pink theme
 chemistry: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&q=80', // Chemistry beakers
  
  // Biology/SVT - green/cyan theme
  biology: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80', // Microscope/cells
  
  // History - brown/gold theme
  history: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=800&q=80', // Old maps
  
  // Geography - blue/green theme
  geography: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80', // Globe/maps
  
  // English - blue theme
  english: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80', // English books
  
  // Philosophy - purple theme
  philosophy: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80', // Thinking/philosophy
  
  // Default fallback
  default: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80', // Education general
};

// Helper function to get hero image for a course
export const getCourseHeroImage = (subjectId) => {
  // Map subject IDs to image categories
  const subjectToImage = {
    'math_col': courseImages.mathematics,
    'math_lyc': courseImages.mathematics,
    'fr_col': courseImages.french,
    'fr_lyc': courseImages.french,
    'phys_col': courseImages.physics,
    'phys_lyc': courseImages.physics,
    'ang_col': courseImages.english,
    'ang_lyc': courseImages.english,
    'svt_col': courseImages.biology,
    'svt_lyc': courseImages.biology,
    'hg_col': courseImages.geography,
    'hg_lyc': courseImages.history,
    'philo_lyc': courseImages.philosophy,
  };
  
  return subjectToImage[subjectId] || courseImages.default;
};
