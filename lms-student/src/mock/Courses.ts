export const courses = [
  {
    id: 1,
    courseName: "Introduction to Programming",
    tagline: "Start your coding journey with the basics of programming.",
    author: "Alice Johnson",
  },
  {
    id: 2,
    courseName: "UI/UX Design Fundamentals",
    tagline: "Learn the essentials of user interface and experience design.",
    author: "Brian Lee",
  },
  {
    id: 3,
    courseName: "Business Management 101",
    tagline: "Master the basics of managing and growing a business.",
    author: "Catherine Smith",
  },
  {
    id: 4,
    courseName: "Digital Marketing",
    tagline: "Boost your brand with modern digital marketing strategies.",
    author: "David Kim",
  },
  {
    id: 5,
    courseName: "Spanish for Beginners",
    tagline: "Start speaking Spanish with practical lessons and exercises.",
    author: "Elena García",
  },
  {
    id: 6,
    courseName: "Data Science Essentials",
    tagline: "Analyze data and uncover insights using Python.",
    author: "Frank Miller",
  },
  {
    id: 7,
    courseName: "Creative Writing Workshop",
    tagline: "Unleash your creativity and write compelling stories.",
    author: "Grace Thompson",
  },
  {
    id: 8,
    courseName: "Web Development Bootcamp",
    tagline: "Build modern websites from scratch using HTML, CSS, and JavaScript.",
    author: "Henry Nguyen",
  },
  {
    id: 9,
    courseName: "Financial Literacy",
    tagline: "Understand personal finance and make smart money decisions.",
    author: "Isabella Patel",
  },
  {
    id: 10,
    courseName: "Photography Basics",
    tagline: "Capture stunning photos with your camera or smartphone.",
    author: "Jack Wilson",
  },
];


export const mockCourse = {
  title: "Modern Web Development",
  description:
    "Learn the latest in web technologies, frameworks, and best practices. This course covers everything from HTML/CSS to advanced React and backend integration.",
  teacher: {
    name: "Jane Doe",
    avatar: "/globe.svg",
    bio: "Senior Web Engineer & Instructor",
  },
  lessons: [
    { title: "Introduction & Setup", duration: "10 min", completed: true },
    { title: "HTML & CSS Basics", duration: "20 min", completed: true },
    { title: "JavaScript Essentials", duration: "30 min", completed: false },
    { title: "React Fundamentals", duration: "40 min", completed: false },
    { title: "Backend Integration", duration: "35 min", completed: false },
  ],
};


export const communityMessages = [
  {
    user: { name: "Alex", avatar: "/window.svg" },
    message: "Anyone stuck on the React lesson?",
    time: "2 min ago",
  },
  {
    user: { name: "Samira", avatar: "/file.svg" },
    message: "The teacher's explanation is super clear!",
    time: "5 min ago",
  },
  {
    user: { name: "Chris", avatar: "/vercel.svg" },
    message: "Can we have a group study session?",
    time: "10 min ago",
  },
];

export const suggestions = [
  { title: "Try the JavaScript Quiz!", description: "Test your JS basics with a quick quiz.", icon: "/file.svg" },
  { title: "Join Study Group", description: "Collaborate with peers for better learning.", icon: "/globe.svg" },
  { title: "Explore Extra Resources", description: "Check out recommended articles and videos.", icon: "/window.svg" },
  { title: "Ask a Mentor", description: "Get help from experienced mentors.", icon: "/vercel.svg" },
];