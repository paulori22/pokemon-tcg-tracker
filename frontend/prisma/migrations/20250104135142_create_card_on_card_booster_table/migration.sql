/*
  Warnings:

  - You are about to drop the `_CardToCardBooster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CardToCardBooster" DROP CONSTRAINT "_CardToCardBooster_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToCardBooster" DROP CONSTRAINT "_CardToCardBooster_B_fkey";

-- DropTable
DROP TABLE "_CardToCardBooster";

-- CreateTable
CREATE TABLE "CardOnCardBooster" (
    "cardBoosterId" INTEGER NOT NULL,
    "cardId" TEXT NOT NULL,
    "numberInExpasionSet" INTEGER NOT NULL,

    CONSTRAINT "CardOnCardBooster_pkey" PRIMARY KEY ("cardBoosterId","cardId")
);

-- AddForeignKey
ALTER TABLE "CardOnCardBooster" ADD CONSTRAINT "CardOnCardBooster_cardBoosterId_fkey" FOREIGN KEY ("cardBoosterId") REFERENCES "CardBooster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardOnCardBooster" ADD CONSTRAINT "CardOnCardBooster_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
