/*
  Warnings:

  - You are about to drop the column `progress_level` on the `Enrolled_Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Enrolled_Course" DROP COLUMN "progress_level";

-- CreateTable
CREATE TABLE "public"."Lesson_Progress" (
    "id" SERIAL NOT NULL,
    "enrolled_course_id" INTEGER NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_Progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Lesson_Progress" ADD CONSTRAINT "Lesson_Progress_enrolled_course_id_fkey" FOREIGN KEY ("enrolled_course_id") REFERENCES "public"."Enrolled_Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lesson_Progress" ADD CONSTRAINT "Lesson_Progress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
