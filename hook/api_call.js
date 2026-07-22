const api_call = async (endpoint, method = "GET", req_data = null) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        if (!endpoint || endpoint.startsWith("undefined")) {
            const configError = new Error("Upstream API URL is not configured");
            configError.status = 500;
            throw configError;
        }

        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            signal: controller.signal
        };

        console.log(`Making API call to ${endpoint} with method ${method} and data:`, req_data);
        if (req_data) {
            options.body = JSON.stringify(req_data);
        }

        const response = await fetch(endpoint, options);
        clearTimeout(timeoutId);
        
        // Handle responses without body (like 204 No Content)
        if (response.status === 204) {
            return { message: "Operation successful" };
        }
        
        const contentType = response.headers.get("content-type") || "";
        const data = contentType.includes("application/json")
            ? await response.json()
            : { message: await response.text() };

        if (!response.ok) {
            const apiError = new Error(data.message || "API call failed");
            apiError.status = response.status;
            apiError.data = data;
            throw apiError;
        }

        return data;

    } catch (error) {
        clearTimeout(timeoutId);
        console.error(`API ${method} call error:`, error.message);
        
        if (error.name === "AbortError") {
            const timeoutError = new Error(`Gateway Timeout: Upstream service at ${endpoint} did not respond within 8 seconds.`);
            timeoutError.status = 504;
            throw timeoutError;
        }

        if (!error.status) {
            // It's a connection refused or other network level failure
            const badGatewayError = new Error(`Bad Gateway: Could not connect to upstream service at ${endpoint}. Connection refused or service offline.`);
            badGatewayError.status = 502;
            throw badGatewayError;
        }
        
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
