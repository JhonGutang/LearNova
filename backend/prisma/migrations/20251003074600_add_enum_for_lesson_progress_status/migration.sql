/*
  Warnings:

  - The `status` column on the `Lesson_Progress` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."LessonProgressStatus" AS ENUM ('IN_PROGRESS', 'FINISHED');

-- AlterTable
ALTER TABLE "public"."Lesson_Progress" DROP COLUMN "status",
ADD COLUMN     "status" "public"."LessonProgressStatus" NOT NULL DEFAULT 'IN_PROGRESS';
