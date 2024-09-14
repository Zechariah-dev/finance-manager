/*
  Warnings:

  - Added the required column `accountId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Expense_userId_idx";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "accountId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Expense_userId_accountId_idx" ON "Expense"("userId", "accountId");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
