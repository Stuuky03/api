/*
  Warnings:

  - You are about to drop the column `badgesCount` on the `student` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "stuukesCount" INTEGER NOT NULL DEFAULT 0,
    "questionsCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_student" ("bio", "email", "firstName", "id", "lastName", "password", "points", "questionsCount", "stuukesCount", "username") SELECT "bio", "email", "firstName", "id", "lastName", "password", "points", "questionsCount", "stuukesCount", "username" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE UNIQUE INDEX "student_username_key" ON "student"("username");
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
