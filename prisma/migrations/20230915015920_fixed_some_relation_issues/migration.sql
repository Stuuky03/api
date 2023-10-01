/*
  Warnings:

  - The primary key for the `studentPoints` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `studentPoints` table. All the data in the column will be lost.
  - The primary key for the `studentBadges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `studentBadges` table. All the data in the column will be lost.
  - You are about to drop the column `studentBadgesId` on the `badge` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `stuuke` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[questionId]` on the table `stuuke` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stuukeId]` on the table `stuukeReferences` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_studentPoints" (
    "points" INTEGER NOT NULL DEFAULT 0,
    "semester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "studentPoints_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_studentPoints" ("points", "semester", "studentId", "year") SELECT "points", "semester", "studentId", "year" FROM "studentPoints";
DROP TABLE "studentPoints";
ALTER TABLE "new_studentPoints" RENAME TO "studentPoints";
CREATE UNIQUE INDEX "studentPoints_studentId_key" ON "studentPoints"("studentId");
CREATE INDEX "points_semester_year_idx" ON "studentPoints"("semester", "year", "studentId");
CREATE TABLE "new_studentBadges" (
    "earnedAt" DATETIME NOT NULL,
    "studentId" TEXT NOT NULL PRIMARY KEY,
    "badgeId" TEXT,
    CONSTRAINT "studentBadges_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "studentBadges_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badge" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_studentBadges" ("earnedAt", "studentId") SELECT "earnedAt", "studentId" FROM "studentBadges";
DROP TABLE "studentBadges";
ALTER TABLE "new_studentBadges" RENAME TO "studentBadges";
CREATE UNIQUE INDEX "studentBadges_studentId_key" ON "studentBadges"("studentId");
CREATE TABLE "new_badge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_badge" ("description", "id", "imageUrl", "name") SELECT "description", "id", "imageUrl", "name" FROM "badge";
DROP TABLE "badge";
ALTER TABLE "new_badge" RENAME TO "badge";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "question_studentId_key" ON "question"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "stuuke_studentId_key" ON "stuuke"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "stuuke_questionId_key" ON "stuuke"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "stuukeReferences_stuukeId_key" ON "stuukeReferences"("stuukeId");
