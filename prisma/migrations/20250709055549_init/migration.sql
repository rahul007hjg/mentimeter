/*
  Warnings:

  - You are about to drop the column `choices` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `questionid` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `answer` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `isCorrect` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionid_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "choices",
DROP COLUMN "options",
DROP COLUMN "questionid",
ADD COLUMN     "isCorrect" BOOLEAN NOT NULL,
ADD COLUMN     "questionId" INTEGER NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "answer";

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
