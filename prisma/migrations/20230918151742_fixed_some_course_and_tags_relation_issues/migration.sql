/*
  Warnings:

  - You are about to drop the `Courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "question_studentId_key";

-- DropIndex
DROP INDEX "studentBadges_studentId_key";

-- DropIndex
DROP INDEX "studentPoints_studentId_key";

-- DropIndex
DROP INDEX "stuuke_questionId_key";

-- DropIndex
DROP INDEX "stuuke_studentId_key";

-- DropIndex
DROP INDEX "stuukeReferences_stuukeId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Courses";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tags";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "studentCourses" (
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    PRIMARY KEY ("studentId", "courseId"),
    CONSTRAINT "studentCourses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "studentCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "course" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "coursesOnPosts" (
    "questionId" TEXT NOT NULL,
    "stuukenId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    PRIMARY KEY ("questionId", "stuukenId", "courseId"),
    CONSTRAINT "coursesOnPosts_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "coursesOnPosts_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "stuuke" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "coursesOnPosts_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tag" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tagsOnPosts" (
    "questionId" TEXT NOT NULL,
    "stuukeId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("questionId", "stuukeId", "tagId"),
    CONSTRAINT "tagsOnPosts_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tagsOnPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "stuuke" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tagsOnPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
