/*
  Warnings:

  - Added the required column `sportId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "sportId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Sports" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
