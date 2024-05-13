const prisma = require("../db");

const getData = async () => {
  const data = await prisma.category.findMany();
  return data;
};

const getCategoryById = async (id) => {
  const data = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  return data;
};

module.exports = { getData, getCategoryById };
