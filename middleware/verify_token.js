const { api_call_post } = require("../hook/api_call");

exports.verify_token = (role = "Any") => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                    success: false,
                    message: "Authorization token missing"
                });
            }

            const token = authHeader.split(" ")[1];

            const response = await api_call_post(
                `${process.env.AUTH_API}/api/v1/middleware/verify-token`,
                { token }
            );

            req.user = response.data.user;

            if (role !== "Any") {
                const allowedRoles = Array.isArray(role) ? role : [role];
                if (!allowedRoles.includes(req.user.role)) {
                    return res.status(403).json({
                        success: false,
                        message: "Insufficient permissions"
                    });
                }
            }

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }
    };
};