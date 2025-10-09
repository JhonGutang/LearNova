-- AlterTable
ALTER TABLE "public"."Lesson" ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 50;

-- AlterTable
ALTER TABLE "public"."Student" ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1;
