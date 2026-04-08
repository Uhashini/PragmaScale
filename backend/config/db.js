const connectDB = async () => {
    try {
        // const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Placeholder Connected`);
    } catch (error) {
        console.error(`MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
