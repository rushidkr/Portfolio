// Mirrors the backend's seed data. Used only if the API call fails
// (e.g. a free-tier backend cold start) so the page still renders something
// useful instead of an empty section.

export const fallbackProjects = [
  {
    id: 1,
    title: 'VeriChain — Tamper-Evident Credential Verification',
    description:
      "A system for issuing and verifying academic/professional credentials that can't be silently altered. Each credential is linked into a private hash chain and signed with RSA digital signatures, so any tampering breaks the chain and is instantly detectable.",
    techStack: ['Spring Boot', 'Java', 'React', 'Vite', 'Tailwind CSS', 'FastAPI', 'Python', 'RSA'],
    githubUrl: 'https://github.com/rushidkr/VeriChain',
    liveUrl: '',
    featured: true,
  },
  {
    id: 2,
    title: 'CEMS — College Event Management System',
    description:
      'A six-entity Spring Boot REST backend with JWT authentication and role-based access control across Admin, Organizer, and Student roles, paired with a React 18 + Vite + Tailwind frontend.',
    techStack: ['Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'React', 'Tailwind CSS'],
    githubUrl: 'https://github.com/rushidkr/cems',
    liveUrl: '',
    featured: true,
  },
  {
    id: 3,
    title: 'DurgSetu AI',
    description:
      'A four-person academic ML/computer-vision project analyzing historical fort structures from imagery, combining OpenCV, TensorFlow, ResNet50, AKAZE, DBSCAN, and YOLO, served through Django REST Framework.',
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'ResNet50', 'YOLO', 'Django REST Framework'],
    githubUrl: 'https://github.com/mitpatil07/DurgSetu-AI',
    liveUrl: 'https://durgsetuai.vercel.app',
    featured: false,
  },
]

export const fallbackSkills = {
  Backend: [
    { id: 1, name: 'Java', proficiency: 5 },
    { id: 2, name: 'Spring Boot', proficiency: 5 },
    { id: 3, name: 'Spring Security', proficiency: 4 },
    { id: 4, name: 'Spring Data JPA / Hibernate', proficiency: 4 },
    { id: 5, name: 'REST API Design', proficiency: 5 },
  ],
  Frontend: [
    { id: 6, name: 'React', proficiency: 4 },
    { id: 7, name: 'JavaScript', proficiency: 4 },
    { id: 8, name: 'Tailwind CSS', proficiency: 4 },
    { id: 9, name: 'HTML / CSS', proficiency: 5 },
  ],
  Database: [
    { id: 10, name: 'MySQL', proficiency: 4 },
    { id: 11, name: 'PostgreSQL', proficiency: 3 },
    { id: 12, name: 'JDBC', proficiency: 4 },
  ],
  Tools: [
    { id: 13, name: 'Git & GitHub', proficiency: 5 },
    { id: 14, name: 'Maven', proficiency: 4 },
    { id: 15, name: 'Docker', proficiency: 3 },
    { id: 16, name: 'Postman', proficiency: 4 },
  ],
}
