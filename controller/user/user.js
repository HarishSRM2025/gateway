const { api_call } = require("../../hook/api_call");

exports.signup = async (req, res) => {
    try {
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
        res.status(500).json({
            success: false,
            message: "Signup failed",
            error: error.message
        });
    }
};

exports.signin = async (req ,res) => {
    try {
        const user_detail = req.body
        console.log("Received Signup Request with data:", user_detail);
    
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
        res.status(500).json({
            success: false,
            message: "Signin failed",
            error: error.message
        });
    }
}