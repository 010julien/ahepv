export const curriculum = {
  levels: [
    {
      id: 'college',
      name: 'Collège',
      grades: ['6ème', '5ème', '4ème', '3ème'],
      subjects: [
        { id: 'math_col', name: 'Mathématiques', icon: 'calculator' },
        { id: 'fr_col', name: 'Français', icon: 'book' },
        { id: 'phys_col', name: 'Physique-Chimie', icon: 'flask' },
        { id: 'ang_col', name: 'Anglais', icon: 'language' },
        { id: 'svt_col', name: 'SVT', icon: 'leaf' },
        { id: 'hg_col', name: 'Histoire-Géo', icon: 'globe' },
      ],
    },
    {
      id: 'lycee',
      name: 'Lycée',
      grades: ['2nde', '1ère', 'Terminale'],
      series: ['A4', 'C', 'D', 'E', 'F', 'G'],
      subjects: [
        { id: 'math_lyc', name: 'Mathématiques', icon: 'calculator' },
        { id: 'fr_lyc', name: 'Français', icon: 'book' },
        { id: 'phys_lyc', name: 'Physique-Chimie', icon: 'flask' },
        { id: 'philo_lyc', name: 'Philosophie', icon: 'bulb' },
        { id: 'ang_lyc', name: 'Anglais', icon: 'language' },
        { id: 'svt_lyc', name: 'SVT', icon: 'leaf' },
        { id: 'hg_lyc', name: 'Histoire-Géo', icon: 'globe' },
      ],
    },
  ],
  courses: [
    // ================= 6ème =================
    {
      id: 'fr_6_1',
      title: 'Types de phrases',
      subjectId: 'fr_col',
      levelId: 'college',
      grade: '6ème',
      teacher: 'Mme. Lawson',
      color: '#8b5cf6',
      icon: 'book-outline',
      description: 'Déclarative, Interrogative, Exclamative, Impérative.',
      duration: '45 min',
      thumbnail: 'https://img.freepik.com/free-vector/english-grammar-concept-illustration_114360-1191.jpg',
      content: {
        course: {
          sections: [
            { title: 'Définition', content: 'La phrase est une suite de mots qui a un sens. Elle commence par une majuscule et se termine par un point.' },
            { title: 'Les 4 Types', content: '1. Déclarative: Raconte un fait (.).\n2. Interrogative: Pose une question (?).\n3. Exclamative: Exprime une émotion (!).\n4. Impérative: Donne un ordre (! ou .).' },
            { title: 'Exemples', content: '- Tu viens. (Déclarative)\n- Viens-tu ? (Interrogative)\n- Quelle belle journée ! (Exclamative)\n- Viens ici ! (Impérative)' }
          ]
        },
        exercises: [
          {
            level: 'Niveau 1',
            questions: [
              { q: 'Transforme en phrase interrogative: "Il fait beau."', a: 'Est-ce qu\'il fait beau ? / Fait-il beau ?' },
              { q: 'Quel est le type de: "Sortez immédiatement !"', a: 'Impérative' }
            ]
          }
        ],
        quiz: [
          { question: "Quel signe de ponctuation termine une phrase interrogative ?", options: [".", "!", "?"], correctAnswer: 2 },
          { question: "La phrase 'Mange ta soupe.' est :", options: ["Déclarative", "Impérative", "Exclamative"], correctAnswer: 1 }
        ]
      }
    },
    {
      id: 'math_6_1',
      title: 'Nombres entiers',
      subjectId: 'math_col',
      levelId: 'college',
      grade: '6ème',
      teacher: 'M. Koffi',
      color: '#3b82f6',
      icon: 'calculator-outline',
      description: 'Écriture, comparaison et opérations sur les entiers.',
      duration: '1h',
      thumbnail: 'https://img.freepik.com/free-vector/math-background_23-2148146270.jpg',
      content: {
        course: {
          sections: [
            { title: 'Écriture des nombres', content: 'Les nombres entiers s\'écrivent par classes de trois chiffres (unités, milliers, millions, milliards).' },
            { title: 'Comparaison', content: 'Pour comparer deux nombres entiers, on compare d\'abord leur nombre de chiffres.' }
          ]
        },
        exercises: [
           { level: 'Niveau 1', questions: [{ q: 'Écris en chiffres: Trois mille vingt.', a: '3020' }] }
        ],
        quiz: [
          { question: "Quel est le chiffre des centaines dans 12 345 ?", options: ["2", "3", "4"], correctAnswer: 1 }
        ]
      }
    },
    // ================= Terminale D =================
    {
      id: 'math_td_1',
      title: 'Fonctions Logarithmes',
      subjectId: 'math_lyc',
      levelId: 'lycee',
      grade: 'Terminale',
      series: 'D',
      teacher: 'M. Mensah',
      color: '#3b82f6',
      icon: 'calculator-outline',
      description: 'Étude de la fonction ln, limites, dérivées.',
      duration: '2h',
      thumbnail: 'https://img.freepik.com/free-vector/calculus-concept-illustration_114360-1234.jpg',
      content: {
        course: {
           sections: [
             { title: 'Définition', content: 'La fonction logarithme népérien, notée ln, est la primitive de la fonction inverse x -> 1/x sur ]0, +inf[ qui s\'annule en 1.' },
             { title: 'Propriétés', content: 'ln(ab) = ln(a) + ln(b)\nln(a/b) = ln(a) - ln(b)\nln(a^n) = n ln(a)' }
           ]
        },
        exercises: [
          { level: 'Bac', questions: [{ q: 'Dériver f(x) = x ln(x) - x', a: 'f\'(x) = ln(x)' }] }
        ],
        quiz: [
          { question: "Quelle est la limite de ln(x) en +inf ?", options: ["0", "1", "+inf"], correctAnswer: 2 }
        ]
      }
    },
    {
      id: 'phys_td_1',
      title: 'Radioactivité',
      subjectId: 'phys_lyc',
      levelId: 'lycee',
      grade: 'Terminale',
      series: 'D',
      teacher: 'Dr. Tounou',
      color: '#ef4444',
      icon: 'flask',
      description: 'Stabilité du noyau, types de désintégration, loi de décroissance.',
      duration: '1h 30min',
      thumbnail: 'https://img.freepik.com/free-vector/science-lab-objects_23-2148533026.jpg',
      content: {
        course: {
          sections: [
            { title: 'Noyau atomique', content: 'Constitué de protons (Z) et de neutrons (N). A = Z + N.' },
            { title: 'Radioactivité Alpha', content: 'Émission d\'un noyau d\'Hélium (4/2 He).' }
          ]
        },
        exercises: [],
        quiz: [
          { question: "La particule Alpha est un noyau de :", options: ["Hydrogène", "Hélium", "Lithium"], correctAnswer: 1 }
        ]
      }
    }
  ],
};
