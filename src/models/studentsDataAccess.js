const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAll = async () => {
  try {
    return await prisma.student.findMany();
  } finally {
    await prisma.$disconnect();
  }
}

const getOne = async (studentId) => {
  try {
    return await prisma.student.findUniqueOrThrow({
      where: { id: studentId }
    })
  } finally {
    await prisma.$disconnect();
  }
}

const createOne = async (student) => {
  try {
    return await prisma.student.create({
      data: { ...student },
    })
  } finally {
    await prisma.$disconnect();
  }
}

const updateOne = async (studentId, student) => {
  try {
    return await prisma.student.update({
      where: { id: studentId },
      data: { ...student }
    })
  } finally {
    await prisma.$disconnect();
  }
}

const removeOne = async (studentId) => {
  try {
    return await prisma.student.delete({
      where: { id: studentId }
    })
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { 
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
