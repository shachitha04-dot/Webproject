const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    searchEvents
} = require('../controllers/event.controller');

// Public routes
router.get('/', getAllEvents);
router.get('/search', searchEvents);
router.get('/:id', getEventById);

// Admin routes (no auth for now, can add later)
router.post('/', upload.array('images', 5), createEvent);
router.put('/:id', upload.array('images', 5), updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
