// Exam Resources Data - Courses, Exercises, and Past Exams with Corrections

export const examResources = {
  // Past Exams by Type
  pastExams: [
    // CEP (Certificat d'Études Primaires)
    {
      id: 'cep_math_2023',
      type: 'exam',
      examType: 'CEP',
      title: 'CEP Mathématiques 2023',
      subject: 'Mathématiques',
      level: 'college',
      grade: '6ème',
      year: 2023,
      program: 'national',
      duration: '2h',
      topics: ['Numération', 'Calcul', 'Géométrie', 'Problèmes'],
      pdfUrl: 'https://example.com/cep-math-2023.pdf',
      correctionUrl: 'https://example.com/cep-math-2023-correction.pdf',
      hasCorrection: true,
    },
    {
      id: 'cep_fr_2023',
      type: 'exam',
      examType: 'CEP',
      title: 'CEP Français 2023',
      subject: 'Français',
      level: 'college',
      grade: '6ème',
      year: 2023,
      program: 'national',
      duration: '2h',
      topics: ['Compréhension', 'Grammaire', 'Conjugaison', 'Rédaction'],
      pdfUrl: 'https://example.com/cep-fr-2023.pdf',
      correctionUrl: 'https://example.com/cep-fr-2023-correction.pdf',
      hasCorrection: true,
    },
    
    // BEPC (Brevet d'Études du Premier Cycle)
    {
      id: 'bepc_math_2023',
      type: 'exam',
      examType: 'BEPC',
      title: 'BEPC Mathématiques 2023',
      subject: 'Mathématiques',
      level: 'college',
      grade: '3ème',
      year: 2023,
      program: 'national',
      duration: '3h',
      topics: ['Algèbre', 'Géométrie', 'Statistiques', 'Probabilités'],
      pdfUrl: 'https://example.com/bepc-math-2023.pdf',
      correctionUrl: 'https://example.com/bepc-math-2023-correction.pdf',
      hasCorrection: true,
    },
    {
      id: 'bepc_phys_2023',
      type: 'exam',
      examType: 'BEPC',
      title: 'BEPC Physique-Chimie 2023',
      subject: 'Physique-Chimie',
      level: 'college',
      grade: '3ème',
      year: 2023,
      program: 'national',
      duration: '2h',
      topics: ['Mécanique', 'Électricité', 'Chimie des solutions'],
      pdfUrl: 'https://example.com/bepc-phys-2023.pdf',
      correctionUrl: 'https://example.com/bepc-phys-2023-correction.pdf',
      hasCorrection: true,
    },
    {
      id: 'bepc_svt_2023',
      type: 'exam',
      examType: 'BEPC',
      title: 'BEPC SVT 2023',
      subject: 'SVT',
      level: 'college',
      grade: '3ème',
      year: 2023,
      program: 'national',
      duration: '2h',
      topics: ['Biologie', 'Géologie', 'Écologie'],
      pdfUrl: 'https://example.com/bepc-svt-2023.pdf',
      correctionUrl: 'https://example.com/bepc-svt-2023-correction.pdf',
      hasCorrection: true,
    },
    
    // BAC (Baccalauréat) - Series A, C, D
    {
      id: 'bac_math_c_2023',
      type: 'exam',
      examType: 'BAC',
      title: 'BAC Mathématiques Série C 2023',
      subject: 'Mathématiques',
      level: 'lycee',
      grade: 'Terminale',
      series: 'C',
      year: 2023,
      program: 'national',
      duration: '4h',
      topics: ['Analyse', 'Algèbre', 'Géométrie', 'Probabilités'],
      pdfUrl: 'https://example.com/bac-math-c-2023.pdf',
      correctionUrl: 'https://example.com/bac-math-c-2023-correction.pdf',
      hasCorrection: true,
    },
    {
      id: 'bac_philo_a_2023',
      type: 'exam',
      examType: 'BAC',
      title: 'BAC Philosophie Série A 2023',
      subject: 'Philosophie',
      level: 'lycee',
      grade: 'Terminale',
      series: 'A',
      year: 2023,
      program: 'national',
      duration: '4h',
      topics: ['Métaphysique', 'Morale', 'Politique', 'Épistémologie'],
      pdfUrl: 'https://example.com/bac-philo-a-2023.pdf',
      correctionUrl: 'https://example.com/bac-philo-a-2023-correction.pdf',
      hasCorrection: true,
    },
    {
      id: 'bac_phys_d_2023',
      type: 'exam',
      examType: 'BAC',
      title: 'BAC Physique-Chimie Série D 2023',
      subject: 'Physique-Chimie',
      level: 'lycee',
      grade: 'Terminale',
      series: 'D',
      year: 2023,
      program: 'national',
      duration: '4h',
      topics: ['Mécanique', 'Électromagnétisme', 'Chimie organique', 'Thermodynamique'],
      pdfUrl: 'https://example.com/bac-phys-d-2023.pdf',
      correctionUrl: 'https://example.com/bac-phys-d-2023-correction.pdf',
      hasCorrection: true,
    },
  ],
  
  // Exercise Series
  exercises: [
    {
      id: 'math_3e_algebra_1',
      type: 'exercise',
      title: 'Algèbre - Équations du 1er degré',
      subject: 'Mathématiques',
      level: 'college',
      grade: '3ème',
      program: 'national',
      difficulty: 'medium',
      exerciseCount: 15,
      topics: ['Équations', 'Inéquations', 'Systèmes'],
      pdfUrl: 'https://example.com/math-3e-algebra-exercises.pdf',
      correctionUrl: 'https://example.com/math-3e-algebra-correction.pdf',
      hasCorrection: true,
    },
    {
      id: 'phys_1ere_mechanics',
      type: 'exercise',
      title: 'Mécanique - Cinématique et Dynamique',
      subject: 'Physique-Chimie',
      level: 'lycee',
      grade: '1ère',
      program: 'national',
      difficulty: 'hard',
      exerciseCount: 20,
      topics: ['Mouvement', 'Forces', 'Énergie'],
      pdfUrl: 'https://example.com/phys-1ere-mechanics.pdf',
      correctionUrl: 'https://example.com/phys-1ere-mechanics-correction.pdf',
      hasCorrection: true,
    },
    {
      id: 'fr_4e_grammar',
      type: 'exercise',
      title: 'Grammaire - Les propositions',
      subject: 'Français',
      level: 'college',
      grade: '4ème',
      program: 'national',
      difficulty: 'easy',
      exerciseCount: 12,
      topics: ['Propositions', 'Subordonnées', 'Coordination'],
      pdfUrl: 'https://example.com/fr-4e-grammar.pdf',
      correctionUrl: 'https://example.com/fr-4e-grammar-correction.pdf',
      hasCorrection: true,
    },
  ],
  
  // Course Content
  courses: [
    {
      id: 'math_term_c_analysis',
      type: 'course',
      title: 'Analyse - Fonctions et Limites',
      subject: 'Mathématiques',
      level: 'lycee',
      grade: 'Terminale',
      series: 'C',
      program: 'national',
      chapters: [
        'Limites de fonctions',
        'Continuité',
        'Dérivabilité',
        'Étude de fonctions',
      ],
      pdfUrl: 'https://example.com/math-term-analysis-course.pdf',
      duration: '8 semaines',
    },
    {
      id: 'svt_3e_genetics',
      type: 'course',
      title: 'Génétique et Hérédité',
      subject: 'SVT',
      level: 'college',
      grade: '3ème',
      program: 'national',
      chapters: [
        'ADN et gènes',
        'Division cellulaire',
        'Transmission des caractères',
        'Maladies génétiques',
      ],
      pdfUrl: 'https://example.com/svt-3e-genetics-course.pdf',
      duration: '4 semaines',
    },
  ],
};

// Filter functions
export const filterExamResources = (resources, filters) => {
  return resources.filter(resource => {
    if (filters.level && resource.level !== filters.level) return false;
    if (filters.subject && resource.subject !== filters.subject) return false;
    if (filters.year && resource.year !== filters.year) return false;
    if (filters.program && resource.program !== filters.program) return false;
    if (filters.examType && resource.examType !== filters.examType) return false;
    if (filters.grade && resource.grade !== filters.grade) return false;
    return true;
  });
};

export const getAvailableYears = (resources) => {
  const years = resources
    .filter(r => r.year)
    .map(r => r.year)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => b - a);
  return years;
};

export const getExamTypes = () => ['CEP', 'BEPC', 'BAC'];
