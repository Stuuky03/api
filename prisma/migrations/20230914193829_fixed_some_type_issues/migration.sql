/*
  Warnings:

  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentNotification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `badges_count` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `stuukes_count` on the `student` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leaderBoardPosition` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qustionsCount` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Badge";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StudentNotification";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "badge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "studentBagdesId" TEXT NOT NULL,
    CONSTRAINT "badge_studentBagdesId_fkey" FOREIGN KEY ("studentBagdesId") REFERENCES "studentBadges" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "studentNotification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    CONSTRAINT "studentNotification_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "badgesCount" INTEGER NOT NULL DEFAULT 0,
    "leaderBoardPosition" INTEGER NOT NULL,
    "stuukesCount" INTEGER NOT NULL DEFAULT 0,
    "qustionsCount" INTEGER NOT NULL
);
INSERT INTO "new_student" ("bio", "email", "id", "password", "username") SELECT "bio", "email", "id", "password", "username" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE UNIQUE INDEX "student_username_key" ON "student"("username");
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
