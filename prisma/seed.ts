import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const universities = [
  { name: "University of Zambia", abbreviation: "UNZA", location: "Lusaka" },
  { name: "Copperbelt University", abbreviation: "CBU", location: "Kitwe" },
  { name: "Copperbelt University", abbreviation: "CBU", location: "Kitwe" },
  { name: "ZCAS University", abbreviation: "ZCAS", location: "Lusaka" },
  {
    name: "Mulungushi University (Lusaka Campus)",
    abbreviation: "MU",
    location: "Lusaka",
  },
  {
    name: "Levy Mwanawasa Medical University",
    abbreviation: "LMMU",
    location: "Lusaka",
  },
  { name: "Cavendish University", abbreviation: "CU", location: "Lusaka" },
  { name: "Chalimbana University", abbreviation: "CHAU", location: "Lusaka" },
  { name: "Eden University", abbreviation: "EU", location: "Lusaka" },
  {
    name: "Information and Communication University (Chalala campus)",
    abbreviation: "ICU",
    location: "Lusaka",
  },
  {
    name: "DMI St. Eugene University",
    abbreviation: "DMI",
    location: "Lusaka",
  },
  {
    name: "Livingstone International University for Tourism Excellence and Business Management",
    abbreviation: "LIUTEBM",
    location: "Lusaka",
  },
  {
    name: "Zambia University College of Technology",
    abbreviation: "ZICT",
    location: "Ndola",
  },
  {
    name: "Lusaka Apex Medical University",
    abbreviation: "LAMU",
    location: "Lusaka",
  },
  { name: "Rockview University", abbreviation: "Rockview", location: "Lusaka" },
  {
    name: "Evelyn Hone College of Applied Arts and Commerce",
    abbreviation: "Evelyn Hone",
    location: "Lusaka",
  },
  { name: "Chreso University", abbreviation: "Chreso", location: "Lusaka" },
  {
    name: "Lusaka Business and Technical College",
    abbreviation: "LBTC",
    location: "Lusaka",
  },
  {
    name: "National Institute of Public Administration",
    abbreviation: "NIPA",
    location: "Lusaka",
  },
  {
    name: "Zambia Institute of Management",
    abbreviation: "ZAMIM",
    location: "Lusaka",
  },
  {
    name: "Lusaka Vocational Training Centre",
    abbreviation: "LVTC",
    location: "Lusaka",
  },
  { name: "Paglory University", abbreviation: "Paglory", location: "Lusaka" },
  {
    name: "Zambian Royal Medical University",
    abbreviation: "ZRMU",
    location: "Lusaka",
  },
  { name: "Zambian Open University", abbreviation: "ZAOU", location: "Lusaka" },
  { name: "Justo Mwale University", abbreviation: "JMU", location: "Lusaka" },
  {
    name: "Zambia Institute of Legal Studies",
    abbreviation: "ZILS",
    location: "Lusaka",
  },
  { name: "Rusangu University", abbreviation: "RU", location: "Lusaka" },
  { name: "Makeni College", abbreviation: "Makeni", location: "Lusaka" },
  { name: "Greenfield University", abbreviation: "GFU", location: "Lusaka" },
  {
    name: "City University of Science and Technology",
    abbreviation: "CUST",
    location: "Lusaka",
  },
  {
    name: "George Benson Christian College",
    abbreviation: "GBCC",
    location: "Lusaka",
  },
  {
    name: "Zambia Catholic University (Lusaka Campus)",
    abbreviation: "ZCU",
    location: "Lusaka",
  },
  {
    name: "Fairview College of Education",
    abbreviation: "Fairview",
    location: "Lusaka",
  },
  {
    name: "St. Bonaventure University",
    abbreviation: "SBU",
    location: "Lusaka",
  },
  { name: "University of Lusaka", abbreviation: "UNILUS", location: "Lusaka" },
  {
    name: "Chilubula College of Nursing",
    abbreviation: "CCN",
    location: "Lusaka",
  },
  { name: "Mwaleshi University", abbreviation: "MWU", location: "Lusaka" },
  {
    name: "Malcolm Moffat College of Education",
    abbreviation: "MMCE",
    location: "Lusaka",
  },
  {
    name: "Copperstone University",
    abbreviation: "Copperstone",
    location: "Lusaka",
  },
  {
    name: "African Christian University",
    abbreviation: "ACU",
    location: "Lusaka",
  },
  {
    name: "Institute of Health Sciences",
    abbreviation: "IHS",
    location: "Lusaka",
  },
  {
    name: "Mufulira Professional College",
    abbreviation: "MPC",
    location: "Lusaka",
  },
  { name: "Lusaka School of Nursing", abbreviation: "LSN", location: "Lusaka" },
  {
    name: "Technical University of Zambia",
    abbreviation: "TUZ",
    location: "Lusaka",
  },
  { name: "Valley View University", abbreviation: "VVU", location: "Lusaka" },
  {
    name: "St. Paul's School of Nursing",
    abbreviation: "St. Paul",
    location: "Lusaka",
  },
  {
    name: "Zambia College of Health Sciences",
    abbreviation: "ZCHS",
    location: "Lusaka",
  },
  { name: "Horizon University", abbreviation: "HU", location: "Lusaka" },
  {
    name: "Rusangu University (Lusaka Campus)",
    abbreviation: "RU-Lusaka",
    location: "Lusaka",
  },
  {
    name: "International School of Lusaka",
    abbreviation: "ISL",
    location: "Lusaka",
  },
  { name: "Olympia Park College", abbreviation: "OPC", location: "Lusaka" },
  {
    name: "Mulungushi University (Main Campus)",
    abbreviation: "MU-Main",
    location: "Kabwe",
  },
];

async function main() {
  console.log("Start seeding ...");

  for (const university of universities) {
    await prisma.university.create({
      data: university,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
