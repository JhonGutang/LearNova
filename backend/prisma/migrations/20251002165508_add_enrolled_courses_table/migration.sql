-- CreateTable
CREATE TABLE "public"."Enrolled_Course" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "progress_level" INTEGER NOT NULL,

    CONSTRAINT "Enrolled_Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enrolled_Course_student_id_course_id_key" ON "public"."Enrolled_Course"("student_id", "course_id");

-- AddForeignKey
ALTER TABLE "public"."Enrolled_Course" ADD CONSTRAINT "Enrolled_Course_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Enrolled_Course" ADD CONSTRAINT "Enrolled_Course_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
