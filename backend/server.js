const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const analysisRoutes = require('./routes/analysisRoutes');
const connectDB = require('./config/db');

dotenv.config();

// Initialize DB (mock)
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/analysis', analysisRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend API Gateway running on port ${PORT}`);
});
