const { api_call } = require('../../hook/api_call');

exports.tenant_stats = async (req, res) => {
    try {
        const tenant_id = req.query.tenant_id;
        let tenantUserCount = 0;

        if (tenant_id) {
            try {
                const usersRes = await api_call(`${process.env.AUTH_API}/api/v1/tenant/user/tenant/${tenant_id}`, 'GET');
                if (usersRes?.data && Array.isArray(usersRes.data)) {
                    tenantUserCount = usersRes.data.length;
                }
            } catch (err) {
                console.error('Could not fetch tenant users count from AUTH_API:', err.message);
            }
        }

        const queryParams = new URLSearchParams(req.query);
        if (tenantUserCount > 0) {
            queryParams.append('user_count', tenantUserCount.toString());
        }

        const url = `${process.env.EMP_API}/api/tenant/stats/?${queryParams.toString()}`;
        const response = await api_call(url, 'GET');

        if (response) {
            response.total_employees = Math.max(response.total_employees || 0, tenantUserCount);
        }

        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: 'Tenant stats fetch failed',
            error: error.data?.message || error.message
        });
    }
};
