/*
  Warnings:

  - Added the required column `orderId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "orderId" INTEGER NOT NULL;
