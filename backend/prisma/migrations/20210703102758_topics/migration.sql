/*
  Warnings:

  - You are about to drop the `_PostToTopic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostToTopic" DROP CONSTRAINT "_PostToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTopic" DROP CONSTRAINT "_PostToTopic_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "topicId" TEXT;

-- DropTable
DROP TABLE "_PostToTopic";

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
