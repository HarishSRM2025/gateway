const { api_call } = require('../../hook/api_call');

const buildLeaveUrl = (path = "", query = {}) => {
    const url = new URL(`${process.env.EMP_API}/api/leave/requests/${path}`);

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
        }
    });

    return url.toString();
};

const sendError = (res, error, message) => {
    res.status(error.status || 500).json({
        success: false,
        message,
        error: error.data?.message || error.message
    });
};

exports.leave_list = async (req, res) => {
    try {
        const response = await api_call(buildLeaveUrl("", req.query), "GET");

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        sendError(res, error, "Leave request list fetch failed");
    }
};

exports.leave_detail = async (req, res) => {
    try {
        const response = await api_call(buildLeaveUrl(`${req.params.id}/`), "GET");

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        sendError(res, error, "Leave request fetch failed");
    }
};

exports.leave_create = async (req, res) => {
    try {
        const response = await api_call(
            buildLeaveUrl(),
            "POST",
            req.body
        );

        res.status(201).json({
            success: true,
            data: response
        });
    } catch (error) {
        sendError(res, error, "Leave request creation failed");
    }
};

exports.leave_update = async (req, res) => {
    try {
        const response = await api_call(
            buildLeaveUrl(`${req.params.id}/`),
            "PATCH",
            req.body
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        sendError(res, error, "Leave request update failed");
    }
};

exports.leave_delete = async (req, res) => {
    try {
        const response = await api_call(
            buildLeaveUrl(`${req.params.id}/`),
            "DELETE"
        );

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        sendError(res, error, "Leave request delete failed");
    }
};
