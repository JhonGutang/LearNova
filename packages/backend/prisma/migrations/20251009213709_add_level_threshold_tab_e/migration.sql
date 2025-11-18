-- CreateTable
CREATE TABLE "public"."Level_Threshold" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "exp_required" INTEGER NOT NULL,

    CONSTRAINT "Level_Threshold_pkey" PRIMARY KEY ("id")
);
