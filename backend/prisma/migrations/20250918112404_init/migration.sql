/*
  Warnings:

  - Added the required column `creator_id` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Course" ADD COLUMN     "creator_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Creator" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact_Information" (
    "id" SERIAL NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Contact_Information_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_Information_creator_id_key" ON "public"."Contact_Information"("creator_id");

-- AddForeignKey
ALTER TABLE "public"."Course" ADD CONSTRAINT "Course_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact_Information" ADD CONSTRAINT "Contact_Information_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
