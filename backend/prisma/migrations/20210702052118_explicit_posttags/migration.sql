/*
  Warnings:

  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- DropTable
DROP TABLE "_PostToTag";

-- CreateTable
CREATE TABLE "PostTags" (
    "id" TEXT NOT NULL,
    "postId" TEXT,
    "tagId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag.name_unique" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "PostTags" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTags" ADD FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
