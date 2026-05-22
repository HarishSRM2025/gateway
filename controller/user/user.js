const { api_call } = require("../../hook/api_call");

exports.signup = async (req, res) => {
    try {
        if (!process.env.AUTH_API) {
            return res.status(500).json({
                success: false,
                message: "AUTH_API is not configured",
            });
        }

        const user_detail = req.body;
        const response = await api_call(
            `${process.env.AUTH_API}/api/v1/user/signup`,
            "POST",
            user_detail
        );
        console.log("Signup Response:", response);
        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.data?.message || error.message || "Signup failed",
            error: error.message
        });
    }
};

exports.signin = async (req ,res) => {
    try {
        if (!process.env.AUTH_API) {
            return res.status(500).json({
                success: false,
                message: "AUTH_API is not configured",
            });
        }

        const user_detail = req.body
        console.log("Received Signin Request with data:", user_detail);
    
        const response = await api_call(
            `${process.env.AUTH_API}/api/v1/user/signin`,
            "POST",
            user_detail
        );

      res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.data?.message || error.message || "Signin failed",
            error: error.message
        });
    }
}
