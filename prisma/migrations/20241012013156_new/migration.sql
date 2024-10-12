/*
  Warnings:

  - You are about to drop the column `perDay` on the `Product` table. All the data in the column will be lost.
  - Added the required column `rentFrequency` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentFrom` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentTo` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `datePosted` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "perDay",
ADD COLUMN     "rentFrequency" TEXT NOT NULL,
ADD COLUMN     "rentFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rentTo" TIMESTAMP(3) NOT NULL,
DROP COLUMN "datePosted",
ADD COLUMN     "datePosted" TIMESTAMP(3) NOT NULL;
