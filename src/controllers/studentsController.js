const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../models/studentsDataAccess");

const { Prisma } = require("@prisma/client");

exports.getAll = async (req, res) => {
  try {
    const students = await getAll();

    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getOne = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    const student = await getOne(studentId);

    res.status(200).json(student);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      console.error(err);
      res.sendStatus(404);
    } else {
      console.error(err);
      res.sendStatus(500);
    }
  }
};

exports.createOne = async (req, res) => {
  try {
    const { firstname, lastname, age, campId, remote } = req.body;
    const newStudent = await createOne({
      firstname,
      lastname,
      age,
      campId,
      remote,
    });

    res.status(201).json(newStudent);
  } catch (err) {
    console.error(err);
    res.sendStatus(500)
  };
};

exports.updateOne = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    const updatedStudent = await updateOne(studentId, req.body);

    res.status(200).json(updatedStudent);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      console.error(err);
      res.sendStatus(404);
    } else {
      console.error(err);
      res.sendStatus(500);
    }
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    const deletedStudent = await deleteOne(studentId);

    res.status(200).json(deletedStudent);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      console.error(err);
      res.sendStatus(404);
    } else {
      console.error(err);
      res.sendStatus(500);
    }
  }
};
