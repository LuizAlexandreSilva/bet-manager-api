/*
  Warnings:

  - You are about to drop the column `sportId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the `Sports` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_sportId_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "sportId",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Sports";

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
