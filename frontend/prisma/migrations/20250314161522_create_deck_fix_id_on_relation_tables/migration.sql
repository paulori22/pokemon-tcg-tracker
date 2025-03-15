/*
  Warnings:

  - The primary key for the `DeckOnCards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DeckOnRates` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DeckOnCards" DROP CONSTRAINT "DeckOnCards_pkey",
ADD CONSTRAINT "DeckOnCards_pkey" PRIMARY KEY ("deckId", "cardId");

-- AlterTable
ALTER TABLE "DeckOnRates" DROP CONSTRAINT "DeckOnRates_pkey",
ADD CONSTRAINT "DeckOnRates_pkey" PRIMARY KEY ("deckId", "userId");
