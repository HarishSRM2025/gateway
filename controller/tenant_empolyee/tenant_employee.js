const { api_call } = require("../../hook/api_call");

exports.employee_create = async (req, res) => {
    try {
        const employee_detail = req.body;

        const response = await api_call(
            `${process.env.EMP_API}/api/tenant/employee_data/`,
            "POST",
            employee_detail
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Employee Creation failed",
            error: error.message
        });
    }
};

exports.employee_list = async (req, res) => {
    try {
        console.log(`${process.env.EMP_API}/api/tenant/employee_data/`);
        const response = await api_call(
            `${process.env.EMP_API}/api/tenant/employee_data/`,
            "GET"
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Employee List failed",
            error: error.message
        });
    }
}


exports.employee_edit = async (req, res) => {
    try {
        const id = req.params.id;
        const employee_data = req.body;

        const response = await api_call(
            `${process.env.EMP_API}/api/tenant/employee_data/${id}/`,
            "PUT",
            employee_data
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Employee Data Update failed",
            error: error.message
        });
    }
}

exports.employee_by_id = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await api_call(
            `${process.env.EMP_API}/api/tenant/employee_data/${id}/`,
            "GET"
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Employee Data Fetching failed",
            error: error.message
        });
    }
}

exports.employee_delete = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await api_call(
            `${process.env.EMP_API}/api/tenant/employee_data/${id}/`,
            "DELETE"
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Employee Data Delete failed",
            error: error.message
        });
    }
}