/*
  Warnings:

  - You are about to drop the column `studentBagdesId` on the `badge` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `studentBadges` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_badge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "studentBadgesId" TEXT,
    CONSTRAINT "badge_studentBadgesId_fkey" FOREIGN KEY ("studentBadgesId") REFERENCES "studentBadges" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_badge" ("description", "id", "imageUrl", "name") SELECT "description", "id", "imageUrl", "name" FROM "badge";
DROP TABLE "badge";
ALTER TABLE "new_badge" RENAME TO "badge";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "studentBadges_studentId_key" ON "studentBadges"("studentId");
