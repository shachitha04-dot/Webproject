const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
    markHelpful
} = require('../controllers/review.controller');

// Review routes
router.post('/', upload.array('images', 3), createReview);
router.get('/:type/:id', getReviews); // type = event/restaurant/sports, id = reference_id
router.put('/:id', upload.array('images', 3), updateReview);
router.delete('/:id', deleteReview);
router.post('/:id/helpful', markHelpful);

module.exports = router;
