-- CreateTable
CREATE TABLE "Tags" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "questionId" TEXT,
    "stuukeId" TEXT,
    CONSTRAINT "Tags_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tags_stuukeId_fkey" FOREIGN KEY ("stuukeId") REFERENCES "stuuke" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Courses" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "studentId" TEXT,
    "questionId" TEXT,
    CONSTRAINT "Courses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Courses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
