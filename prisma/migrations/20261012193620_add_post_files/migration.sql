-- CreateTable
CREATE TABLE "PostFile" (
    "id" TEXT NOT NULL,
    "reflectionId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostFile" ADD CONSTRAINT "PostFile_reflectionId_fkey" FOREIGN KEY ("reflectionId") REFERENCES "Reflection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
