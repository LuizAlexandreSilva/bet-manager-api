/*
  Warnings:

  - You are about to drop the column `bankrollId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `competitionId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the `Bankrolls` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Competitions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MultipleSelections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bankrolls" DROP CONSTRAINT "Bankrolls_userId_fkey";

-- DropForeignKey
ALTER TABLE "Competitions" DROP CONSTRAINT "Competitions_userId_fkey";

-- DropForeignKey
ALTER TABLE "MultipleSelections" DROP CONSTRAINT "MultipleSelections_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_bankrollId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_competitionId_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "bankrollId",
DROP COLUMN "competitionId";

-- DropTable
DROP TABLE "Bankrolls";

-- DropTable
DROP TABLE "Competitions";

-- DropTable
DROP TABLE "MultipleSelections";
