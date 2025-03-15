-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('Public', 'Private');

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "strategy" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeckOnCards" (
    "deckId" INTEGER NOT NULL,
    "cardId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeckOnCards_pkey" PRIMARY KEY ("deckId")
);

-- CreateTable
CREATE TABLE "DeckOnRates" (
    "deckId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeckOnRates_pkey" PRIMARY KEY ("deckId")
);

-- AddForeignKey
ALTER TABLE "DeckOnCards" ADD CONSTRAINT "DeckOnCards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeckOnCards" ADD CONSTRAINT "DeckOnCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeckOnRates" ADD CONSTRAINT "DeckOnRates_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
