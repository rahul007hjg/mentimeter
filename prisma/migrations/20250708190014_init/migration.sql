/*
  Warnings:

  - You are about to drop the column `optionid` on the `Option` table. All the data in the column will be lost.
  - Added the required column `questionid` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_optionid_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "optionid",
ADD COLUMN     "questionid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
