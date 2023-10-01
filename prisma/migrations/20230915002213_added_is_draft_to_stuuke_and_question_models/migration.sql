/*
  Warnings:

  - You are about to drop the column `first_name` on the `student` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stuuke" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "studentId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "stuuke_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stuuke_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stuuke" ("content", "createdAt", "id", "questionId", "studentId", "title") SELECT "content", "createdAt", "id", "questionId", "studentId", "title" FROM "stuuke";
DROP TABLE "stuuke";
ALTER TABLE "new_stuuke" RENAME TO "stuuke";
CREATE TABLE "new_question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "studentId" TEXT NOT NULL,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "question_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_question" ("content", "createdAt", "id", "studentId", "title") SELECT "content", "createdAt", "id", "studentId", "title" FROM "question";
DROP TABLE "question";
ALTER TABLE "new_question" RENAME TO "question";
CREATE TABLE "new_student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "badgesCount" INTEGER NOT NULL DEFAULT 0,
    "leaderBoardPosition" INTEGER NOT NULL,
    "stuukesCount" INTEGER NOT NULL DEFAULT 0,
    "qustionsCount" INTEGER NOT NULL
);
INSERT INTO "new_student" ("badgesCount", "bio", "email", "id", "leaderBoardPosition", "password", "qustionsCount", "stuukesCount", "username") SELECT "badgesCount", "bio", "email", "id", "leaderBoardPosition", "password", "qustionsCount", "stuukesCount", "username" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE UNIQUE INDEX "student_username_key" ON "student"("username");
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
