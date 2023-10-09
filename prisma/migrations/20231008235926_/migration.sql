/*
  Warnings:

  - You are about to drop the `StudentCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StudentCourse";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "studentCourse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    CONSTRAINT "studentCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "studentCourse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
