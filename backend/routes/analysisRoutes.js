const express = require('express');
const router = express.Router();
const { uploadChat, getAnalysis, getAllAnalyses } = require('../controllers/analysisController');

// POST /api/analysis/upload
router.post('/upload', uploadChat);

// GET /api/analysis
router.get('/', getAllAnalyses);

// GET /api/analysis/:id
router.get('/:id', getAnalysis);

module.exports = router;
