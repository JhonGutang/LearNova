/*
  Warnings:

  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Module_Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Module_Category" DROP CONSTRAINT "Module_Category_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Module_Category" DROP CONSTRAINT "Module_Category_module_id_fkey";

-- DropTable
DROP TABLE "public"."Module";

-- DropTable
DROP TABLE "public"."Module_Category";

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'DRAFT',
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Course_Category" (
    "course_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Course_Category_pkey" PRIMARY KEY ("course_id","category_id")
);

-- AddForeignKey
ALTER TABLE "public"."Course_Category" ADD CONSTRAINT "Course_Category_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Course_Category" ADD CONSTRAINT "Course_Category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
