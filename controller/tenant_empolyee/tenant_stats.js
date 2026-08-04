const { api_call } = require('../../hook/api_call');

exports.tenant_stats = async (req, res) => {
    try {
        const queryParams = new URLSearchParams(req.query).toString();
        const url = `${process.env.EMP_API}/api/tenant/stats/${queryParams ? '?' + queryParams : ''}`;
        const response = await api_call(url, 'GET');
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: 'Tenant stats fetch failed',
            error: error.data?.message || error.message
        });
    }
};
