const Student = require('../models/studentModel');
const InterestArea = require('../models/interestAreaModel');

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { student_level, user_fk, interest_areas } = req.body;
    const newStudent = new Student({ student_level, user_fk, interest_areas });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('user_fk').populate('interest_areas');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findById(id).populate('user_fk').populate('interest_areas');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student by ID
const updateStudentById = async (req, res) => {
  try {
    const { id, student_level, user_fk, interest_areas } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(id, { student_level, user_fk, interest_areas }, { new: true }).populate('user_fk').populate('interest_areas');
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a student by ID
const deleteStudentById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add interest areas to a student
const addInterestAreasToStudent = async (req, res) => {
  try {
    const { studentId, interest_areas } = req.body; // interest_areas es un array de IDs
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    student.interest_areas = [...new Set([...student.interest_areas, ...interest_areas])]; // Evita duplicados
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove an interest area from a student
const removeInterestAreaFromStudent = async (req, res) => {
  try {
    const { studentId, interestAreaId } = req.body;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    student.interest_areas = student.interest_areas.filter(area => area.toString() !== interestAreaId);
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addInterestAreasToStudent,
  removeInterestAreaFromStudent
};
