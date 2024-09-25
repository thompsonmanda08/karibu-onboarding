-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "feedback" TEXT,
    "address" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyAddress" (
    "id" SERIAL NOT NULL,
    "plotNo" TEXT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT DEFAULT 'Zambia',
    "rentalType" TEXT NOT NULL,
    "propertyType" TEXT,
    "details" TEXT,
    "userId" INTEGER,

    CONSTRAINT "PropertyAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "abbreviation" TEXT,
    "propertyAddressId" INTEGER,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PropertyAddress" ADD CONSTRAINT "PropertyAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_propertyAddressId_fkey" FOREIGN KEY ("propertyAddressId") REFERENCES "PropertyAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
