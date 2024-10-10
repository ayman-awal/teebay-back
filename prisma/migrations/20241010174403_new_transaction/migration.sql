/*
  Warnings:

  - You are about to drop the `Rental` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_lenderId_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_productId_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_renterId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_productId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_sellerId_fkey";

-- DropTable
DROP TABLE "Rental";

-- DropTable
DROP TABLE "Sales";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "transactionType" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "primaryUserId" INTEGER NOT NULL,
    "secondaryUserId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_primaryUserId_fkey" FOREIGN KEY ("primaryUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_secondaryUserId_fkey" FOREIGN KEY ("secondaryUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
