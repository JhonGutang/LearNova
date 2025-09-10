export type Lesson = {
  title: string;
  tagline: string;
  progress_level: number;
};

export const dummyLessons: Lesson[] = [
  {
    title: "Variables and Data Types",
    tagline: "Understand the building blocks of code.",
    progress_level: 80,
  },
  {
    title: "Control Flow",
    tagline: "Master if-else and loops.",
    progress_level: 60,
  },
  {
    title: "Functions",
    tagline: "Write reusable blocks of logic.",
    progress_level: 40,
  },
  {
    title: "Arrays and Lists",
    tagline: "Store and manage collections of data.",
    progress_level: 20,
  },
  {
    title: "Object-Oriented Basics",
    tagline: "Learn about classes and objects.",
    progress_level: 10,
  },
  {
    title: "Debugging Techniques",
    tagline: "Find and fix errors in your code.",
    progress_level: 0,
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