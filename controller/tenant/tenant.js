const { api_call_post, api_call } = require("../../hook/api_call");

exports.tenantCreation = async (req, res) => {
    try {
        const tenant_detail = req.body;

        const response = await api_call_post(
            `${process.env.AUTH_API}/api/v1/tenant/create`,
            tenant_detail
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Organiztion creation failed",
            error: error.message
        });
    }
};

exports.getAllTenants = async (req, res) => {
    try {
        const response = await api_call(
            `${process.env.AUTH_API}/api/v1/tenant/get/alltenant`
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tenants",
            error: error.message
        });
    }
};

exports.deleteTenant = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await api_call(
            `${process.env.AUTH_API}/api/v1/tenant/delete/${id}`,
            "DELETE"
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete tenant",
            error: error.message
        });
    }
};

exports.getTenantBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const response = await api_call(
            `${process.env.AUTH_API}/api/v1/tenant/get/${slug}`
        );
        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tenant",
            error: error.message
        });
    }
};
    