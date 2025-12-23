const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants,
    getRestaurantMenu
} = require('../controllers/restaurant.controller');

// Public routes
router.get('/', getAllRestaurants);
router.get('/search', searchRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:id/menu', getRestaurantMenu);

// Admin routes
router.post('/', upload.array('images', 5), createRestaurant);
router.put('/:id', upload.array('images', 5), updateRestaurant);
router.delete('/:id', deleteRestaurant);

module.exports = router;
