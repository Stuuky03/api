/*
  Warnings:

  - You are about to drop the column `description` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `profileImgUrl` on the `student` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_student" ("email", "id", "password", "username") SELECT "email", "id", "password", "username" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE UNIQUE INDEX "student_username_key" ON "student"("username");
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
