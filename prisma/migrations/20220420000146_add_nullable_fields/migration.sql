-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_bankrollId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_competitionId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_marketId_fkey";

-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "bankrollId" DROP NOT NULL,
ALTER COLUMN "competitionId" DROP NOT NULL,
ALTER COLUMN "marketId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competitions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Markets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_bankrollId_fkey" FOREIGN KEY ("bankrollId") REFERENCES "Bankrolls"("id") ON DELETE SET NULL ON UPDATE CASCADE;
