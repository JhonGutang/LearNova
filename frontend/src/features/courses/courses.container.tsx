 'use client';

import { useFetchCourses } from "./hooks/useFetchCourses";
import React from "react";
import CoursesPresentational from "./courses.presentational";

const CoursesContainer: React.FC = () => {
	const courses = useFetchCourses();
	return (
		<CoursesPresentational courses={courses}/>
	);
};

export default CoursesContainer;
