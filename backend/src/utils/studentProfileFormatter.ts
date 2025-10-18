
export interface StudentDB {
  id: number;
  first_name: string;
  last_name: string;
  level: number;
  exp: number;
}

export function formatStudentProfile(student: StudentDB) {
  return {
    id: Number(student.id),
    firstName: student.first_name,
    lastName: student.last_name,
    level: student.level,
    exp: student.exp,
  };
}