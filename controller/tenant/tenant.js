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

        if (req.user && req.user.user_role !== "SUPER_ADMIN") {
            const userId = req.user.id;
            if (response && response.success && Array.isArray(response.data)) {
                response.data = response.data.filter(t => t.tenant_owner_id === userId);
            }
        }

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

        if (req.user && req.user.user_role !== "SUPER_ADMIN") {
            const tenantRes = await api_call(
                `${process.env.AUTH_API}/api/v1/tenant/get/alltenant`
            );
            if (tenantRes && tenantRes.success && Array.isArray(tenantRes.data)) {
                const tenantObj = tenantRes.data.find(t => t.id === parseInt(id, 10));
                if (!tenantObj || tenantObj.tenant_owner_id !== req.user.id) {
                    return res.status(403).json({
                        success: false,
                        message: "Insufficient permissions to delete this tenant"
                    });
                }
            }
        }

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
    