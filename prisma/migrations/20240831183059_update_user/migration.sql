-- AlterTable
ALTER TABLE "User" ADD COLUMN     "account_verify_expires" TIMESTAMP(3),
ADD COLUMN     "account_verify_token" TEXT,
ADD COLUMN     "email_verified_at" TIMESTAMP(3);
