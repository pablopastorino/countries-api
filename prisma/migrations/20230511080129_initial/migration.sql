-- CreateTable
CREATE TABLE "countries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "population" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_country_key" ON "countries"("country");
