/*
  Warnings:

  - You are about to drop the `studentPoints` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "points_semester_year_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "studentPoints";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "badgesCount" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "stuukesCount" INTEGER NOT NULL DEFAULT 0,
    "questionsCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_student" ("badgesCount", "bio", "email", "firstName", "id", "lastName", "password", "questionsCount", "stuukesCount", "username") SELECT "badgesCount", "bio", "email", "firstName", "id", "lastName", "password", "questionsCount", "stuukesCount", "username" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE UNIQUE INDEX "student_username_key" ON "student"("username");
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
