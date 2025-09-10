/*
  Warnings:

  - You are about to drop the column `category` on the `Module` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Module" DROP COLUMN "category";

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Module_Category" (
    "module_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Module_Category_pkey" PRIMARY KEY ("module_id","category_id")
);

-- AddForeignKey
ALTER TABLE "public"."Module_Category" ADD CONSTRAINT "Module_Category_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Module_Category" ADD CONSTRAINT "Module_Category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
