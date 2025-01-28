-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAGO', 'NAO_PAGO');

-- CreateTable
CREATE TABLE "Ait" (
    "id" TEXT NOT NULL,
    "placa_veiculo" TEXT NOT NULL,
    "data_infracao" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor_multa" DECIMAL(65,30) NOT NULL,
    "status" "Status" NOT NULL,
    "data_processamento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ait_pkey" PRIMARY KEY ("id")
);
