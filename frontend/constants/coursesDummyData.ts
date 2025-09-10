import { Lesson } from "@/src/types/backend-data";

export const dummyLessons: Lesson[] = [
  {
    title: "Variables and Data Types",
    description: "Understand the building blocks of code.",
    progressLevel: 80,
  },
  {
    title: "Control Flow",
    description: "Master if-else and loops.",
    progressLevel: 60,
  },
  {
    title: "Functions",
    description: "Write reusable blocks of logic.",
    progressLevel: 40,
  },
  {
    title: "Arrays and Lists",
    description: "Store and manage collections of data.",
    progressLevel: 20,
  },
  {
    title: "Object-Oriented Basics",
    description: "Learn about classes and objects.",
    progressLevel: 10,
  },
  {
    title: "Debugging Techniques",
    description: "Find and fix errors in your code.",
    progressLevel: 0,
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