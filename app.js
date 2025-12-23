const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Import middleware
const { errorHandler, notFound } = require('./middleware/error.middleware');

// Import routes
const eventRoutes = require('./routes/event.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const sportsRoutes = require('./routes/sports.routes');
const bookingRoutes = require('./routes/booking.routes');
const reviewRoutes = require('./routes/review.routes');

// Initialize express app
const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to District API',
        version: '1.0.0',
        endpoints: {
            events: '/api/events',
            restaurants: '/api/restaurants',
            sports: '/api/sports',
            bookings: '/api/bookings',
            reviews: '/api/reviews'
        }
    });
});

app.use('/api/v1/events', eventRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/sports', sportsRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
