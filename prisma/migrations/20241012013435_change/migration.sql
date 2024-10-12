/*
  Warnings:

  - You are about to drop the column `rentFrom` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rentTo` on the `Product` table. All the data in the column will be lost.
  - Added the required column `rentFrom` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentTo` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "rentFrom",
DROP COLUMN "rentTo";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "rentFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rentTo" TIMESTAMP(3) NOT NULL;
