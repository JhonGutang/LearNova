/*
  Warnings:

  - Added the required column `description` to the `Level_Threshold` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Level_Threshold` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Level_Threshold" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
