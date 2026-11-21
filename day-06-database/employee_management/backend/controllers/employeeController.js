const path = require('path');

const pool = require('../db');

const addEmployee = async (req, res) => {

    try {
        const {
            first_name,
            last_name,
            email,
            job_title,
            department_id
        } = req.body;

        const query = `
            INSERT INTO employee_info.employees
            (
                first_name,
                last_name,
                email,
                job_title,
                department_id
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        const values = [
            first_name,
            last_name,
            email,
            job_title || null,
            department_id
        ];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Employee added successfully',
            employee: result.rows[0]
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Something went wrong'
        });
    }
};


const getEmployeesByDepartment = async (req, res) => {

    try {
        const departmentId = req.params.departmentId;

        const query = `
            SELECT *
            FROM employee_info.employees
            WHERE department_id = $1
            ORDER BY employee_id;
        `;

        console.log(departmentId);

        const result = await pool.query(query, [departmentId]);


        res.status(200).json({
            totalDepartments: result.rows.length,
            departments: result.rows
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

const getAllDepartments = async (req, res) => {

    try {

        const query = `SELECT * FROM employee_info.departments;`;


        const result = await pool.query(query);

        res.status(200).json({
            employee: result.rows
        });

     

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

const getEmployeeById = async (req, res) => {

    try {
        const employeeId = req.params.employeeId;

        const query = `
            SELECT *
            FROM employee_info.employees
            WHERE employee_id = $1
            ORDER BY employee_id;
        `;

        console.log(employeeId);

        const result = await pool.query(query, [employeeId]);

        res.status(200).json({
            employee: result.rows
        });

     

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Something went wrong'
        });
    }
};


const getImage = (req, res) => {
    // path.basename blocks requests for files outside the pictures folder
    const fileName = path.basename(req.params.file);
    const filePath = path.join(process.env.PICTURES_DIR, fileName);

    res.sendFile(filePath, (error) => {
        if (error) {
            console.log('Image error:', error.message);
            res.status(404).json({ message: 'Image not found' });
        }
    });
};

module.exports = {
    addEmployee,
    getEmployeesByDepartment,
    getAllDepartments,
    getEmployeeById,
    getImage
};