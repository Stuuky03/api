/*
  Warnings:

  - You are about to drop the `badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studentBadges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "badge";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "studentBadges";
PRAGMA foreign_keys=on;
