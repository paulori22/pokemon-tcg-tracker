/*
  Warnings:

  - You are about to drop the column `numberInExpasionSet` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `numberInExpasionSet` on the `CardOnCardBooster` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "numberInExpasionSet";

-- AlterTable
ALTER TABLE "CardOnCardBooster" DROP COLUMN "numberInExpasionSet";
