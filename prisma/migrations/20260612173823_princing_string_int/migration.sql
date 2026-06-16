/*
  Warnings:

  - Changed the type of `pricing` on the `Products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "pricing",
ADD COLUMN     "pricing" INTEGER NOT NULL;
