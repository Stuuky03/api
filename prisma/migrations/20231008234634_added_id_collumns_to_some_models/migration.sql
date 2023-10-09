/*
  Warnings:

  - The primary key for the `tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `tag` table. All the data in the column will be lost.
  - The primary key for the `course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `course` table. All the data in the column will be lost.
  - The primary key for the `tagsOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `tagsOnPosts` table without a default value. This is not possible if the table is not empty.

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
    "courseId" TEXT NOT NULL,
    CONSTRAINT "stuuke_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stuuke_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stuuke_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stuuke" ("content", "courseId", "createdAt", "id", "isDraft", "questionId", "studentId", "title") SELECT "content", "courseId", "createdAt", "id", "isDraft", "questionId", "studentId", "title" FROM "stuuke";
DROP TABLE "stuuke";
ALTER TABLE "new_stuuke" RENAME TO "stuuke";
CREATE TABLE "new_tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_tag" ("description") SELECT "description" FROM "tag";
DROP TABLE "tag";
ALTER TABLE "new_tag" RENAME TO "tag";
CREATE TABLE "new_question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "studentId" TEXT NOT NULL,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "courseId" TEXT NOT NULL,
    CONSTRAINT "question_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "question_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_question" ("content", "courseId", "createdAt", "id", "isDraft", "studentId", "title") SELECT "content", "courseId", "createdAt", "id", "isDraft", "studentId", "title" FROM "question";
DROP TABLE "question";
ALTER TABLE "new_question" RENAME TO "question";
CREATE TABLE "new_course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_course" ("description") SELECT "description" FROM "course";
DROP TABLE "course";
ALTER TABLE "new_course" RENAME TO "course";
CREATE TABLE "new_tagsOnPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "stuukeId" TEXT,
    "tagId" TEXT NOT NULL,
    CONSTRAINT "tagsOnPosts_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tagsOnPosts_stuukeId_fkey" FOREIGN KEY ("stuukeId") REFERENCES "stuuke" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "tagsOnPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tagsOnPosts" ("questionId", "stuukeId", "tagId") SELECT "questionId", "stuukeId", "tagId" FROM "tagsOnPosts";
DROP TABLE "tagsOnPosts";
ALTER TABLE "new_tagsOnPosts" RENAME TO "tagsOnPosts";
CREATE TABLE "new_StudentCourse" (
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    PRIMARY KEY ("studentId", "courseId"),
    CONSTRAINT "StudentCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentCourse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StudentCourse" ("courseId", "studentId") SELECT "courseId", "studentId" FROM "StudentCourse";
DROP TABLE "StudentCourse";
ALTER TABLE "new_StudentCourse" RENAME TO "StudentCourse";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
