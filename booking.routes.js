const express = require('express');
const router = express.Router();
const {
    createEventBooking,
    createRestaurantBooking,
    createSportsBooking,
    getAllBookings,
    getBookingById,
    cancelBooking
} = require('../controllers/booking.controller');

// Booking routes
router.post('/event', createEventBooking);
router.post('/restaurant', createRestaurantBooking);
router.post('/sports', createSportsBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.put('/:id/cancel', cancelBooking);

module.exports = router;
