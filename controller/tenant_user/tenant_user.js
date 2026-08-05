const { api_call } = require("../../hook/api_call");

exports.signup = async (req, res) => {
    try {
        const user_detail = req.body;

        const response = await api_call(
            `${process.env.AUTH_API}/api/v1/tenant/user/signup`,
            'POST',
            user_detail
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Signup failed",
            error: error.message
        });
    }
};

exports.signin = async (req ,res) => {
    try {
        const user_detail = req.body
        const response = await api_call(
            `${process.env.AUTH_API}/api/v1/tenant/user/signin`,
            'POST',
            user_detail
        );

      res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        const status = error.status || 500;
        const responseBody = error.data || {};
        res.status(status).json({
            success: false,
            message: "Signin failed",
            error: responseBody.message || responseBody.error || error.message,
        });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const body = req.body;
        const response = await api_call(
            `${process.env.AUTH_API}/api/v1/tenant/user/change-password`,
            'POST',
            body
        );
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        const status = error.status || 500;
        const responseBody = error.data || {};
        res.status(status).json({
            success: false,
            message: "Change password failed",
            error: responseBody.message || responseBody.error || error.message,
        });
    }
}

exports.getUsersByTenant = async (req, res) => {
    try {
        const { tenant_id } = req.params;
        const response = await api_call(
            `${process.env.AUTH_API}/api/v1/tenant/user/tenant/${tenant_id}`,
            'GET'
        );

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
}

exports.updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_role } = req.body;
        
        const response = await api_call(
            `${process.env.AUTH_API}/api/v1/tenant/user/role/${id}`,
            'PUT',
            { user_role }
        );

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update role",
            error: error.message
        });
    }
}