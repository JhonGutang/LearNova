'use client';

import { useFetchCourses } from "./hooks/useFetchCourses";
import React from "react";
import CoursesPresentational from "./courses.presentational";

const CoursesContainer: React.FC = () => {
	const { courses, loading, error } = useFetchCourses();
	
	return (
		<CoursesPresentational 
			courses={courses} 
			loading={loading} 
			error={error}
		/>
	);
};

export default CoursesContainer;
