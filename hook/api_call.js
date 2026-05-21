const api_call = async (endpoint, method = "GET", req_data = null) => {
    try {

        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        console.log(`Making API call to ${endpoint} with method ${method} and data:`, req_data);
        if (req_data) {
            options.body = JSON.stringify(req_data);
        }

        const response = await fetch(endpoint, options);
        
        // Handle responses without body (like 204 No Content)
        if (response.status === 204) {
            return { message: "Operation successful" };
        }
        
        const data = await response.json();

        if (!response.ok) {
            const apiError = new Error(data.message || "API call failed");
            apiError.status = response.status;
            apiError.data = data;
            throw apiError;
        }

        return data;

    } catch (error) {
        console.error(`API ${method} call error:`, error.message);
        throw error;
    }
};

const api_call_post = async (endpoint, req_data = null) => {
    return api_call(endpoint, "POST", req_data);
};

module.exports = {
    api_call,
    api_call_post,
};