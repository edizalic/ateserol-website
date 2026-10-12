-- CreateTable
CREATE TABLE "EntityFile" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntityFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EntityFile_entityType_entityId_idx" ON "EntityFile"("entityType", "entityId");
