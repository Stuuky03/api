/*
  Warnings:

  - You are about to drop the `coursesOnPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studentCourses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `qustionsCount` on the `student` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `stuuke` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "coursesOnPosts_stuukeId_key";

-- DropIndex
DROP INDEX "coursesOnPosts_questionId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "coursesOnPosts";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "studentCourses";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "StudentCourse" (
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    PRIMARY KEY ("studentId", "courseId"),
    CONSTRAINT "StudentCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentCourse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "badgesCount" INTEGER NOT NULL DEFAULT 0,
    "leaderBoardPosition" INTEGER NOT NULL,
    "stuukesCount" INTEGER NOT NULL DEFAULT 0,
    "questionsCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_student" ("badgesCount", "bio", "email", "firstName", "id", "lastName", "leaderBoardPosition", "password", "stuukesCount", "username") SELECT "badgesCount", "bio", "email", "firstName", "id", "lastName", "leaderBoardPosition", "password", "stuukesCount", "username" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE UNIQUE INDEX "student_username_key" ON "student"("username");
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");
CREATE TABLE "new_question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "studentId" TEXT NOT NULL,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "courseId" TEXT NOT NULL,
    CONSTRAINT "question_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "question_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_question" ("content", "createdAt", "id", "isDraft", "studentId", "title") SELECT "content", "createdAt", "id", "isDraft", "studentId", "title" FROM "question";
DROP TABLE "question";
ALTER TABLE "new_question" RENAME TO "question";
CREATE TABLE "new_stuuke" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "studentId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "courseId" TEXT NOT NULL,
    CONSTRAINT "stuuke_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stuuke_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stuuke_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stuuke" ("content", "createdAt", "id", "isDraft", "questionId", "studentId", "title") SELECT "content", "createdAt", "id", "isDraft", "questionId", "studentId", "title" FROM "stuuke";
DROP TABLE "stuuke";
ALTER TABLE "new_stuuke" RENAME TO "stuuke";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
