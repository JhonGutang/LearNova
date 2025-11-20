-- CreateTable
CREATE TABLE "public"."Reaction" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "liked" BOOLEAN NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_post_id_student_id_key" ON "public"."Reaction"("post_id", "student_id");

-- AddForeignKey
ALTER TABLE "public"."Reaction" ADD CONSTRAINT "Reaction_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reaction" ADD CONSTRAINT "Reaction_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
