const { api_call } = require('../../hook/api_call');

exports.attendance_list = async (req, res) => {
    try {
        const queryParams = new URLSearchParams(req.query).toString();
        const url = `${process.env.EMP_API}/api/tenant/attendance/${queryParams ? '?' + queryParams : ''}`;
        const response = await api_call(url, 'GET');

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: 'Attendance list fetch failed',
            error: error.data?.message || error.message
        });
    }
};

exports.attendance_detail = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await api_call(
            `${process.env.EMP_API}/api/tenant/attendance/${id}/`,
            'GET'
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Attendance detail fetch failed',
            error: error.message
        });
    }
};

exports.attendance_checkin = async (req, res) => {
    try {
        const attendanceData = req.body;

        const response = await api_call(
            `${process.env.EMP_API}/api/tenant/attendance/checkin/`,
            'POST',
            attendanceData
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: 'Attendance check-in failed',
            error: error.data?.message || error.message
        });
    }
};

exports.attendance_checkout = async (req, res) => {
    try {
        const attendanceData = req.body;

        const response = await api_call(
            `${process.env.EMP_API}/api/tenant/attendance/checkout/`,
            'POST',
            attendanceData
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: 'Attendance check-out failed',
            error: error.data?.message || error.message
        });
    }
};
