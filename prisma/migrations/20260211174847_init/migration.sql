-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'JURADO', 'VEEDOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'JURADO',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comparsa" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "bg" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comparsa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rubro" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guiaTecnica" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rubro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "noche" TEXT NOT NULL,
    "comparsaId" TEXT NOT NULL,
    "rubroId" TEXT NOT NULL,
    "judgeId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "justification" TEXT,
    "hash" TEXT NOT NULL,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sancion" (
    "id" TEXT NOT NULL,
    "comparsaId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "puntos" DOUBLE PRECISION NOT NULL,
    "motivo" TEXT NOT NULL,
    "noche" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sancion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Comparsa_name_key" ON "Comparsa"("name");

-- CreateIndex
CREATE INDEX "Comparsa_name_idx" ON "Comparsa"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rubro_name_key" ON "Rubro"("name");

-- CreateIndex
CREATE INDEX "Rubro_orden_idx" ON "Rubro"("orden");

-- CreateIndex
CREATE INDEX "Score_comparsaId_idx" ON "Score"("comparsaId");

-- CreateIndex
CREATE INDEX "Score_rubroId_idx" ON "Score"("rubroId");

-- CreateIndex
CREATE INDEX "Score_judgeId_idx" ON "Score"("judgeId");

-- CreateIndex
CREATE INDEX "Score_noche_idx" ON "Score"("noche");

-- CreateIndex
CREATE UNIQUE INDEX "Score_noche_comparsaId_rubroId_judgeId_key" ON "Score"("noche", "comparsaId", "rubroId", "judgeId");

-- CreateIndex
CREATE INDEX "Sancion_comparsaId_idx" ON "Sancion"("comparsaId");

-- CreateIndex
CREATE INDEX "Sancion_noche_idx" ON "Sancion"("noche");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_timestamp_idx" ON "AuditLog"("timestamp");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_comparsaId_fkey" FOREIGN KEY ("comparsaId") REFERENCES "Comparsa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_rubroId_fkey" FOREIGN KEY ("rubroId") REFERENCES "Rubro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sancion" ADD CONSTRAINT "Sancion_comparsaId_fkey" FOREIGN KEY ("comparsaId") REFERENCES "Comparsa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sancion" ADD CONSTRAINT "Sancion_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
