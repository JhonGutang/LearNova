-- CreateTable
CREATE TABLE "public"."Lesson_Page" (
    "id" SERIAL NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "page_number" INTEGER NOT NULL,
    "content_json" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_Page_lesson_id_page_number_key" ON "public"."Lesson_Page"("lesson_id", "page_number");

-- AddForeignKey
ALTER TABLE "public"."Lesson_Page" ADD CONSTRAINT "Lesson_Page_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
