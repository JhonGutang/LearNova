-- getCourseOrEnrolledCourse.sql

-- Exported Query
WITH course_data AS (
  SELECT 
    c.id AS course_id,
    c.title AS course_title,
    c.tagline,
    c.description,
    c.status,
    c.creator_id,
    c.created_at,
    c.updated_at,
    cr.first_name AS creator_first_name,
    cr.last_name AS creator_last_name
  FROM "Course" c
  INNER JOIN "Creator" cr ON c.creator_id = cr.id
  WHERE c.id = $1 -- courseId
    AND c.title = $2 -- course title
),
enrollment_check AS (
  SELECT 
    ec.id AS enrolled_course_id,
    ec.student_id,
    ec.course_id,
    ec.created_at AS enrolled_at
  FROM "Enrolled_Course" ec
  WHERE ec.course_id = $1 -- courseId
    AND ec.student_id = $3 -- studentId
),
lessons_data AS (
  SELECT 
    l.id AS lesson_id,
    l.course_id,
    l.title AS lesson_title,
    l.description AS lesson_description,
    l.exp AS lesson_exp,
    l.created_at AS lesson_created_at,
    l.updated_at AS lesson_updated_at
  FROM "Lesson" l
  WHERE l.course_id = $1 -- courseId
  ORDER BY l.id ASC
),
progress_data AS (
  SELECT 
    lp.id AS progress_id,
    lp.enrolled_course_id,
    lp.lesson_id,
    lp.status,
    lp.created_at AS progress_created_at,
    lp.updated_at AS progress_updated_at
  FROM "Lesson_Progress" lp
  WHERE lp.enrolled_course_id IN (SELECT enrolled_course_id FROM enrollment_check)
)
SELECT 
  cd.*,
  ec.enrolled_course_id,
  ec.enrolled_at,
  CASE 
    WHEN ec.enrolled_course_id IS NOT NULL THEN true 
    ELSE false 
  END AS is_enrolled,
  json_agg(
    json_build_object(
      'lesson_id', ld.lesson_id,
      'lesson_title', ld.lesson_title,
      'lesson_description', ld.lesson_description,
      'lesson_exp', ld.lesson_exp,
      'lesson_created_at', ld.lesson_created_at,
      'lesson_updated_at', ld.lesson_updated_at,
      'progress', CASE 
        WHEN pd.progress_id IS NOT NULL THEN 
          json_build_object(
            'progress_id', pd.progress_id,
            'status', pd.status,
            'progress_created_at', pd.progress_created_at,
            'progress_updated_at', pd.progress_updated_at
          )
        ELSE NULL
      END
    )
    ORDER BY ld.lesson_id ASC
  ) AS lessons
FROM course_data cd
LEFT JOIN enrollment_check ec ON ec.course_id = cd.course_id
LEFT JOIN lessons_data ld ON ld.course_id = cd.course_id
LEFT JOIN progress_data pd ON pd.lesson_id = ld.lesson_id 
  AND pd.enrolled_course_id = ec.enrolled_course_id
GROUP BY 
  cd.course_id,
  cd.course_title,
  cd.tagline,
  cd.description,
  cd.status,
  cd.creator_id,
  cd.created_at,
  cd.updated_at,
  cd.creator_first_name,
  cd.creator_last_name,
  ec.enrolled_course_id,
  ec.enrolled_at;