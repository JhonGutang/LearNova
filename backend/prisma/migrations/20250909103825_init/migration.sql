-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('PUBLISHED', 'DRAFT', 'UNLISTED');

-- CreateTable
CREATE TABLE "public"."Module" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'DRAFT',
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);
