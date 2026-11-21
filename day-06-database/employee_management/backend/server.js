require('dotenv').config();

const express = require('express');

const employeeRoutes = require('./routes/employeeRoutes');

const app = express();


// Middleware to read JSON request data
app.use(express.json());


// Connect employee routes
app.use('/api', employeeRoutes);

// app.use('/images', express.static('/home/mosheeur/robendevs/employee_management/storage/pictures'));


// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});