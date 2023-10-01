/*
  Warnings:

  - The primary key for the `coursesOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stuukenId` on the `coursesOnPosts` table. All the data in the column will be lost.
  - The primary key for the `tagsOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_coursesOnPosts" (
    "questionId" TEXT NOT NULL,
    "stuukeId" TEXT,
    "courseId" TEXT NOT NULL,

    PRIMARY KEY ("questionId", "courseId"),
    CONSTRAINT "coursesOnPosts_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "coursesOnPosts_stuukeId_fkey" FOREIGN KEY ("stuukeId") REFERENCES "stuuke" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "coursesOnPosts_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_coursesOnPosts" ("courseId", "questionId") SELECT "courseId", "questionId" FROM "coursesOnPosts";
DROP TABLE "coursesOnPosts";
ALTER TABLE "new_coursesOnPosts" RENAME TO "coursesOnPosts";
CREATE TABLE "new_tagsOnPosts" (
    "questionId" TEXT NOT NULL,
    "stuukeId" TEXT,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("questionId", "tagId"),
    CONSTRAINT "tagsOnPosts_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tagsOnPosts_stuukeId_fkey" FOREIGN KEY ("stuukeId") REFERENCES "stuuke" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "tagsOnPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tagsOnPosts" ("questionId", "stuukeId", "tagId") SELECT "questionId", "stuukeId", "tagId" FROM "tagsOnPosts";
DROP TABLE "tagsOnPosts";
ALTER TABLE "new_tagsOnPosts" RENAME TO "tagsOnPosts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
