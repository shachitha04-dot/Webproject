// Event Categories
const EVENT_CATEGORIES = ['concert', 'sports', 'comedy', 'workshop', 'exhibition', 'other'];

// Event Status
const EVENT_STATUS = ['upcoming', 'ongoing', 'cancelled', 'completed'];

// Restaurant Price Ranges
const PRICE_RANGES = ['$', '$$', '$$$', '$$$$'];

// Booking Types
const BOOKING_TYPES = ['event', 'restaurant', 'sports'];

// Booking Status
const BOOKING_STATUS = ['pending', 'confirmed', 'cancelled', 'completed'];

// Review Types
const REVIEW_TYPES = ['event', 'restaurant', 'sports'];

// Pagination
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

// Sports Types
const SPORTS_TYPES = ['cricket', 'football', 'badminton', 'tennis', 'basketball', 'swimming', 'gym', 'yoga'];

// File Upload
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

module.exports = {
    EVENT_CATEGORIES,
    EVENT_STATUS,
    PRICE_RANGES,
    BOOKING_TYPES,
    BOOKING_STATUS,
    REVIEW_TYPES,
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    MAX_LIMIT,
    SPORTS_TYPES,
    MAX_FILE_SIZE,
    ALLOWED_IMAGE_TYPES
};
