-- CreateEnum
CREATE TYPE "CardRarity" AS ENUM ('Promo', 'OneDiamond', 'TwoDiamond', 'ThreeDiamond', 'FourDiamond', 'OneStar', 'TwoStar', 'ThreeStar', 'Crown');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('Colorless', 'Grass', 'Fire', 'Water', 'Psychic', 'Fighting', 'Lightning', 'Metal', 'Darkness', 'Dragon', 'Trainer');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "CardExpasionSet" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "totalCards" INTEGER NOT NULL,
    "releasedAt" TIMESTAMP(3),

    CONSTRAINT "CardExpasionSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardBooster" (
    "id" SERIAL NOT NULL,
    "cardExpasionSetId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "releasedAt" DATE,

    CONSTRAINT "CardBooster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "numberInExpasionSet" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CardType" NOT NULL,
    "rarity" "CardRarity" NOT NULL,
    "imagePath" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnCards" (
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnCards_pkey" PRIMARY KEY ("userId","cardId")
);

-- CreateTable
CREATE TABLE "_CardToCardBooster" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CardToCardBooster_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "CardExpasionSet_code_key" ON "CardExpasionSet"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CardExpasionSet_name_key" ON "CardExpasionSet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CardBooster_name_key" ON "CardBooster"("name");

-- CreateIndex
CREATE INDEX "_CardToCardBooster_B_index" ON "_CardToCardBooster"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardBooster" ADD CONSTRAINT "CardBooster_cardExpasionSetId_fkey" FOREIGN KEY ("cardExpasionSetId") REFERENCES "CardExpasionSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCards" ADD CONSTRAINT "UsersOnCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCards" ADD CONSTRAINT "UsersOnCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToCardBooster" ADD CONSTRAINT "_CardToCardBooster_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToCardBooster" ADD CONSTRAINT "_CardToCardBooster_B_fkey" FOREIGN KEY ("B") REFERENCES "CardBooster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
