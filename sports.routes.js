const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const {
    getAllSportsVenues,
    getSportsVenueById,
    createSportsVenue,
    updateSportsVenue,
    deleteSportsVenue,
    searchSportsVenues
} = require('../controllers/sports.controller');

// Public routes
router.get('/', getAllSportsVenues);
router.get('/search', searchSportsVenues);
router.get('/:id', getSportsVenueById);

// Admin routes
router.post('/', upload.array('images', 5), createSportsVenue);
router.put('/:id', upload.array('images', 5), updateSportsVenue);
router.delete('/:id', deleteSportsVenue);

module.exports = router;
