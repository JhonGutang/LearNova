import { Course, Status } from "@/src/types/backend-data";

export const dummyCourses: Course[] = [
  {
    title: "Introduction to Programming",
    tagline: "Start your coding journey here.",
    description: "Learn the basics of programming, including variables, loops, and functions.",
    totalNumberOfStudents: 120,
    status: Status.DRAFT,
    categories: [
      "Programming Fundamentals",
      "Beginner",
      "Computer Science",
      "Logic",
      "Problem Solving"
    ],
  },
  {
    title: "Web Development Fundamentals",
    tagline: "Build your first website from scratch.",
    description: "Explore HTML, CSS, and JavaScript to build interactive web pages.",
    totalNumberOfStudents: 95,
    status: Status.DRAFT,
    categories: [
      "Web Development",
      "Frontend",
      "Programming",
      "HTML",
      "CSS"
    ],
  },
  {
    title: "Data Structures",
    tagline: "Master the building blocks of efficient code.",
    description: "Understand arrays, linked lists, stacks, and queues for efficient data management.",
    totalNumberOfStudents: 80,
    status: Status.DRAFT,
    categories: [
      "Computer Science",
      "Data Structures",
      "Programming"
    ],
  },
  {
    title: "Database Management",
    tagline: "Unlock the power of data storage.",
    description: "Get started with relational databases and SQL queries.",
    totalNumberOfStudents: 70,
    status: Status.DRAFT,
    categories: [
      "Databases",
      "SQL",
      "Backend",
      "Data Modeling"
    ],
  },
  {
    title: "Software Engineering Principles",
    tagline: "Build robust and maintainable software.",
    description: "Discover best practices for designing, developing, and testing software.",
    totalNumberOfStudents: 60,
    status: Status.DRAFT,
    categories: [
      "Software Engineering",
      "Best Practices",
      "Project Management",
      "Testing",
      "Agile"
    ],
  },
  {
    title: "Object-Oriented Programming",
    tagline: "Think in objects, not just code.",
    description: "Dive into classes, objects, inheritance, and polymorphism.",
    totalNumberOfStudents: 110,
    status: Status.DRAFT,
    categories: [
      "Programming Paradigms",
      "OOP",
      "Computer Science",
      "Abstraction"
    ],
  },
  {
    title: "Algorithms and Complexity",
    tagline: "Solve problems efficiently.",
    description: "Analyze and implement classic algorithms and understand computational complexity.",
    totalNumberOfStudents: 75,
    status: Status.DRAFT,
    categories: [
      "Computer Science",
      "Algorithms",
      "Theory",
      "Complexity"
    ],
  },
  {
    title: "Operating Systems",
    tagline: "Understand the software behind the hardware.",
    description: "Learn about processes, memory management, and file systems.",
    totalNumberOfStudents: 65,
    status: Status.DRAFT,
    categories: [
      "Systems",
      "Operating Systems",
      "Computer Science"
    ],
  },
  {
    title: "Networks and Security",
    tagline: "Connect and protect digital worlds.",
    description: "Understand computer networks, protocols, and basic cybersecurity concepts.",
    totalNumberOfStudents: 85,
    status: Status.DRAFT,
    categories: [
      "Networking",
      "Security",
      "IT",
      "Protocols",
      "Cybersecurity"
    ],
  },
  {
    title: "Mobile App Development",
    tagline: "Create apps for the devices in your pocket.",
    description: "Build mobile applications for Android and iOS platforms.",
    totalNumberOfStudents: 50,
    status: Status.DRAFT,
    categories: [
      "Mobile Development",
      "App Development",
      "Programming"
    ],
  },
  {
    title: "Cloud Computing",
    tagline: "Scale your applications to the cloud.",
    description: "Explore cloud platforms, deployment models, and cloud-native development.",
    totalNumberOfStudents: 40,
    status: Status.DRAFT,
    categories: [
      "Cloud Computing",
      "DevOps",
      "IT",
      "Deployment"
    ],
  },
  {
    title: "Machine Learning Basics",
    tagline: "Teach computers to learn from data.",
    description: "Introduction to machine learning concepts, algorithms, and applications.",
    totalNumberOfStudents: 55,
    status: Status.DRAFT,
    categories: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "Statistics"
    ],
  },
  {
    title: "DevOps and CI/CD",
    tagline: "Automate and accelerate software delivery.",
    description: "Learn about continuous integration, continuous deployment, and automation tools.",
    totalNumberOfStudents: 45,
    status: Status.DRAFT,
    categories: [
      "DevOps",
      "Automation",
      "Software Engineering"
    ],
  },
  {
    title: "UI/UX Design",
    tagline: "Design delightful digital experiences.",
    description: "Principles of user interface and user experience design for digital products.",
    totalNumberOfStudents: 70,
    status: Status.DRAFT,
    categories: [
      "Design",
      "UI/UX",
      "Product Development",
      "User Research"
    ],
  },
  {
    title: "Game Development",
    tagline: "Bring your game ideas to life.",
    description: "Create interactive games using popular game engines and frameworks.",
    totalNumberOfStudents: 30,
    status: Status.DRAFT,
    categories: [
      "Game Development",
      "Programming",
      "Design",
      "Graphics",
      "Animation"
    ],
  },
];

export const CATEGORIES = [
  "Mathematics",
  "Science",
  "History",
  "Language",
  "Technology",
  "Other",
];