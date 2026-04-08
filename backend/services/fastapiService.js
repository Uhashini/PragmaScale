const axios = require('axios');

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

exports.analyzeWithFastAPI = async (chatPayload) => {
    try {
        const response = await axios.post(`${FASTAPI_URL}/analyze`, chatPayload);
        return response;
    } catch (error) {
        console.error('FastAPI Connection Error:', error.message);
        throw new Error('AI engine analysis failed or is unreachable.');
    }
};
