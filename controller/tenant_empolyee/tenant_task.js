const { api_call } = require('../../hook/api_call');

exports.task_list = async (req, res) => {
    try {
        const queryParams = new URLSearchParams(req.query).toString();
        const url = `${process.env.EMP_API}/api/tasks/tasks/${queryParams ? '?' + queryParams : ''}`;
        const response = await api_call(url, 'GET');
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: 'Task list fetch failed',
            error: error.data?.message || error.message
        });
    }
};

exports.task_create = async (req, res) => {
    try {
        const response = await api_call(
            `${process.env.EMP_API}/api/tasks/tasks/`,
            'POST',
            req.body
        );
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: 'Task creation failed',
            error: error.data?.message || error.message
        });
    }
};

exports.task_update = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await api_call(
            `${process.env.EMP_API}/api/tasks/tasks/${id}/`,
            'PATCH',
            req.body
        );
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: 'Task update failed',
            error: error.data?.message || error.message
        });
    }
};

exports.task_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await api_call(
            `${process.env.EMP_API}/api/tasks/tasks/${id}/`,
            'DELETE'
        );
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: 'Task delete failed',
            error: error.data?.message || error.message
        });
    }
};
