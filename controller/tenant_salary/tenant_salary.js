const { api_call } = require("../../hook/api_call");

exports.salary_calculate = async (req, res) => {
    try {
        const calc_detail = req.body;

        const response = await api_call(
            `${process.env.SALARY_API}/api/tenant/salary/calculate/`,
            "POST",
            calc_detail
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Salary calculation failed",
            error: error.message
        });
    }
};

exports.salary_list = async (req, res) => {
    try {
        // Construct query string from request query parameters
        const queryParams = new URLSearchParams(req.query).toString();
        const url = `${process.env.SALARY_API}/api/tenant/salary/${queryParams ? '?' + queryParams : ''}`;

        const response = await api_call(url, "GET");

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Fetching salary list failed",
            error: error.message
        });
    }
};

exports.salary_pay = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await api_call(
            `${process.env.SALARY_API}/api/tenant/salary/${id}/pay/`,
            "PUT"
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Marking salary as paid failed",
            error: error.message
        });
    }
};

exports.salary_delete = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await api_call(
            `${process.env.SALARY_API}/api/tenant/salary/${id}/`,
            "DELETE"
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Deleting salary record failed",
            error: error.message
        });
    }
};
