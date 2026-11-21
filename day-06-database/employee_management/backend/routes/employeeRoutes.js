const express = require('express');

const router = express.Router();

const {
    addEmployee,
    getEmployeesByDepartment,
    getAllDepartments,
    getEmployeeById,
    getImage
} = require('../controllers/employeeController');

const validateEmployee = require('../middleware/validateEmployee');


// API 1
router.post(
    '/employees',
    validateEmployee,
    addEmployee
);


// API 2
router.get(
    '/departments/:departmentId/employees',
    getEmployeesByDepartment
);

router.get(
    '/departments',
    getAllDepartments
);

router.get(
     '/employees/:employeeId',
     getEmployeeById
);

router.get('/images/:file', 
    getImage
);

module.exports = router;


