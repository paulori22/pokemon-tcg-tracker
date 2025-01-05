-- CreateTable
CREATE TABLE "CardOnCardExpansionSet" (
    "cardExpasionSetId" INTEGER NOT NULL,
    "cardId" TEXT NOT NULL,
    "numberInExpasionSet" INTEGER NOT NULL,

    CONSTRAINT "CardOnCardExpansionSet_pkey" PRIMARY KEY ("cardExpasionSetId","cardId")
);

-- AddForeignKey
ALTER TABLE "CardOnCardExpansionSet" ADD CONSTRAINT "CardOnCardExpansionSet_cardExpasionSetId_fkey" FOREIGN KEY ("cardExpasionSetId") REFERENCES "CardExpasionSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardOnCardExpansionSet" ADD CONSTRAINT "CardOnCardExpansionSet_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
