const { analyzeWithFastAPI } = require('../services/fastapiService');

exports.uploadChat = async (req, res) => {
    try {
        const chatData = req.body;

        // Relay raw data to Python NLP Engine
        const nlpResults = await analyzeWithFastAPI(chatData);

        // Mock save to MongoDB
        const savedDoc = {
            _id: '802A',
            title: 'Auto-Generated Analysis',
            status: 'completed',
            results: nlpResults.data
        };

        res.status(201).json({
            message: 'Analysis complete',
            data: savedDoc
        });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ error: 'Failed to process chat data with AI engine.' });
    }
};

exports.getAnalysis = async (req, res) => {
    res.status(200).json({ message: `Fetching analysis ${req.params.id}` });
};

exports.getAllAnalyses = async (req, res) => {
    res.status(200).json({ data: [] });
};
