require('dotenv').config();
const app = require('./src/app');
const { initDatabase } = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// Initialize database and start server
const startServer = async () => {
    try {
        // Initialize database schema
        await initDatabase();
        console.log('✅ Database initialized successfully');

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📚 API Documentation: http://localhost:${PORT}/`);
            console.log(`\n📍 Available Endpoints:`);
            console.log(`   - Events: http://localhost:${PORT}/api/events`);
            console.log(`   - Restaurants: http://localhost:${PORT}/api/restaurants`);
            console.log(`   - Sports: http://localhost:${PORT}/api/sports`);
            console.log(`   - Bookings: http://localhost:${PORT}/api/bookings`);
            console.log(`   - Reviews: http://localhost:${PORT}/api/reviews`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
