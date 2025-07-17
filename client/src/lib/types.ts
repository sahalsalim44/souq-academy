export interface CourseData {
  id: string;
  title: string;
  description: string;
  duration: string;
  batchSize: string;
  certificate: string;
  image: string;
  curriculum: string[];
  projects: string[];
}

export const courseData: Record<string, CourseData> = {
  java: {
    id: 'java',
    title: 'Java Fullstack Development',
    description: 'Master Java backend development with Spring Boot, React frontend, and database integration',
    duration: '6 months',
    batchSize: '15 students',
    certificate: 'Industry Recognized',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300',
    curriculum: [
      'Core Java Fundamentals',
      'Spring Framework & Spring Boot',
      'RESTful Web Services',
      'Database Management (MySQL/PostgreSQL)',
      'Frontend Development with React',
      'Microservices Architecture',
      'DevOps & Deployment'
    ],
    projects: [
      'E-commerce Web Application',
      'Banking Management System',
      'Real-time Chat Application'
    ]
  },
  python: {
    id: 'python',
    title: 'Python Fullstack Development',
    description: 'Learn Python Django/Flask backend, modern frontend frameworks, and data science basics',
    duration: '4 months',
    batchSize: '15 students',
    certificate: 'Industry Recognized',
    image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300',
    curriculum: [
      'Python Fundamentals',
      'Django/Flask Framework',
      'REST API Development',
      'Database Integration',
      'Frontend with React/Vue',
      'Data Science Basics',
      'Cloud Deployment'
    ],
    projects: [
      'Social Media Platform',
      'Inventory Management System',
      'Data Analytics Dashboard'
    ]
  },
  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Master SEO, SEM, social media marketing, content strategy, and analytics',
    duration: '4 months',
    batchSize: '20 students',
    certificate: 'Google & Facebook Certified',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300',
    curriculum: [
      'SEO & SEM',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'Google Analytics',
      'PPC Advertising',
      'Marketing Strategy'
    ],
    projects: [
      'Complete Marketing Campaign',
      'SEO Optimization Project',
      'Social Media Strategy'
    ]
  }
};
