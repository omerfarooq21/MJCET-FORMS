const express = require('express')
const router = express.Router()
const studentsControllers = require('../controllers/studentsControllers')
router.route('/')
    .get(studentsControllers.getAllStudents)
    .post(studentsControllers.createNewStudents)
    .patch(studentsControllers.updateStudents)
    .delete(studentsControllers.deleteStudents)

module.exports = routes