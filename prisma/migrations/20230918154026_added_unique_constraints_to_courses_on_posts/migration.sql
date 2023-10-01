/*
  Warnings:

  - A unique constraint covering the columns `[questionId]` on the table `coursesOnPosts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stuukeId]` on the table `coursesOnPosts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "coursesOnPosts_questionId_key" ON "coursesOnPosts"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "coursesOnPosts_stuukeId_key" ON "coursesOnPosts"("stuukeId");
