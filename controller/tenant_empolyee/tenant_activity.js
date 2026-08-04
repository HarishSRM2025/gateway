const { api_call } = require('../../hook/api_call');

exports.activity_logs = async (req, res) => {
    try {
        const queryParams = new URLSearchParams(req.query).toString();
        const url = `${process.env.EMP_API}/api/activities/logs/${queryParams ? '?' + queryParams : ''}`;
        const response = await api_call(url, 'GET');

        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: 'Activity logs fetch failed',
            error: error.data?.message || error.message
        });
    }
};
