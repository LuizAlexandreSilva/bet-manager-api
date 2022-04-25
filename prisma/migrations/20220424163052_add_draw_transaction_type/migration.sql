/*
  Warnings:

  - Made the column `bankrollId` on table `Transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "TransactionStatus" ADD VALUE 'DRAW';

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_bankrollId_fkey";

-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "bankrollId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_bankrollId_fkey" FOREIGN KEY ("bankrollId") REFERENCES "Bankrolls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
