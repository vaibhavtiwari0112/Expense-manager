/*
  Warnings:

  - You are about to drop the column `category` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Saving` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `currency` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Saving` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "category",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Investment" DROP COLUMN "type",
DROP COLUMN "updatedAt",
ADD COLUMN     "currency" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Saving" DROP COLUMN "updatedAt",
ADD COLUMN     "currency" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "token",
DROP COLUMN "updatedAt",
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT;
