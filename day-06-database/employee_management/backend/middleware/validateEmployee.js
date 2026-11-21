function validateEmployee(req, res, next) {
     console.log("choltese thiktha")
    const {
        first_name,
        last_name,
        email,
        department_id
    } = req.body;

    

    if (!first_name || !last_name || !email || !department_id) {
        return res.status(400).json({
            message: 'Please provide all required fields'
        });
    }

    next();
}

module.exports = validateEmployee;

