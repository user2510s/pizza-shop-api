/*
  Warnings:

  - Added the required column `closingTime` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingTime` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "closingTime" TEXT NOT NULL,
ADD COLUMN     "openingTime" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pricing" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_userId_key" ON "Products"("userId");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
