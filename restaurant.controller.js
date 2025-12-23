const { db } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../utils/constants');

/**
 * Get all restaurants with filters and pagination
 */
const getAllRestaurants = (req, res) => {
    const {
        cuisine,
        city,
        priceRange,
        minRating,
        features,
        sort = 'name',
        order = 'ASC',
        page = DEFAULT_PAGE,
        limit = DEFAULT_LIMIT
    } = req.query;

    let query = 'SELECT * FROM restaurants WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM restaurants WHERE 1=1';
    const params = [];
    const countParams = [];

    // Apply filters
    if (cuisine) {
        query += ' AND cuisine LIKE ?';
        countQuery += ' AND cuisine LIKE ?';
        params.push(`%${cuisine}%`);
        countParams.push(`%${cuisine}%`);
    }

    if (city) {
        query += ' AND city LIKE ?';
        countQuery += ' AND city LIKE ?';
        params.push(`%${city}%`);
        countParams.push(`%${city}%`);
    }

    if (priceRange) {
        query += ' AND price_range = ?';
        countQuery += ' AND price_range = ?';
        params.push(priceRange);
        countParams.push(priceRange);
    }

    if (minRating) {
        query += ' AND rating_average >= ?';
        countQuery += ' AND rating_average >= ?';
        params.push(parseFloat(minRating));
        countParams.push(parseFloat(minRating));
    }

    if (features) {
        query += ' AND features LIKE ?';
        countQuery += ' AND features LIKE ?';
        params.push(`%${features}%`);
        countParams.push(`%${features}%`);
    }

    // Get total count
    db.get(countQuery, countParams, (err, countRow) => {
        if (err) {
            return errorResponse(res, 'Error fetching restaurants count', 500);
        }

        const total = countRow.total;

        // Add sorting and pagination
        query += ` ORDER BY ${sort} ${order}`;
        query += ` LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

        // Get restaurants
        db.all(query, params, (err, rows) => {
            if (err) {
                return errorResponse(res, 'Error fetching restaurants', 500);
            }

            // Parse JSON fields
            const restaurants = rows.map(restaurant => ({
                ...restaurant,
                images: restaurant.images ? JSON.parse(restaurant.images) : [],
                cuisine: restaurant.cuisine ? JSON.parse(restaurant.cuisine) : [],
                features: restaurant.features ? JSON.parse(restaurant.features) : [],
                timings: restaurant.timings ? JSON.parse(restaurant.timings) : {},
                menu: restaurant.menu ? JSON.parse(restaurant.menu) : [],
                popular_dishes: restaurant.popular_dishes ? JSON.parse(restaurant.popular_dishes) : []
            }));

            return paginatedResponse(res, restaurants, page, limit, total, 'Restaurants fetched successfully');
        });
    });
};

/**
 * Get single restaurant by ID
 */
const getRestaurantById = (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM restaurants WHERE id = ?', [id], (err, row) => {
        if (err) {
            return errorResponse(res, 'Error fetching restaurant', 500);
        }

        if (!row) {
            return errorResponse(res, 'Restaurant not found', 404);
        }

        // Parse JSON fields
        const restaurant = {
            ...row,
            images: row.images ? JSON.parse(row.images) : [],
            cuisine: row.cuisine ? JSON.parse(row.cuisine) : [],
            features: row.features ? JSON.parse(row.features) : [],
            timings: row.timings ? JSON.parse(row.timings) : {},
            menu: row.menu ? JSON.parse(row.menu) : [],
            popular_dishes: row.popular_dishes ? JSON.parse(row.popular_dishes) : []
        };

        return successResponse(res, restaurant, 'Restaurant fetched successfully');
    });
};

/**
 * Create new restaurant
 */
const createRestaurant = (req, res) => {
    const {
        name,
        description,
        cuisine,
        address,
        city,
        latitude,
        longitude,
        phone,
        email,
        timings,
        price_range,
        features,
        menu,
        table_booking_enabled,
        max_guests_per_table,
        slot_duration,
        popular_dishes
    } = req.body;

    // Handle uploaded images
    const images = req.files ? req.files.map(file => file.path) : [];

    const query = `
    INSERT INTO restaurants (
      name, description, cuisine, images,
      address, city, latitude, longitude,
      phone, email, timings, price_range, features, menu,
      table_booking_enabled, max_guests_per_table, slot_duration,
      popular_dishes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const params = [
        name,
        description,
        JSON.stringify(cuisine || []),
        JSON.stringify(images),
        address,
        city,
        latitude,
        longitude,
        phone,
        email,
        JSON.stringify(timings || {}),
        price_range,
        JSON.stringify(features || []),
        JSON.stringify(menu || []),
        table_booking_enabled !== undefined ? table_booking_enabled : 1,
        max_guests_per_table || 6,
        slot_duration || 120,
        JSON.stringify(popular_dishes || [])
    ];

    db.run(query, params, function (err) {
        if (err) {
            return errorResponse(res, 'Error creating restaurant', 500);
        }

        return successResponse(res, { id: this.lastID }, 'Restaurant created successfully', 201);
    });
};

/**
 * Update restaurant
 */
const updateRestaurant = (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        cuisine,
        address,
        city,
        latitude,
        longitude,
        phone,
        email,
        timings,
        price_range,
        features,
        menu,
        table_booking_enabled,
        max_guests_per_table,
        slot_duration,
        popular_dishes
    } = req.body;

    // Build dynamic update query
    const updates = [];
    const params = [];

    if (name) { updates.push('name = ?'); params.push(name); }
    if (description) { updates.push('description = ?'); params.push(description); }
    if (cuisine) { updates.push('cuisine = ?'); params.push(JSON.stringify(cuisine)); }
    if (address) { updates.push('address = ?'); params.push(address); }
    if (city) { updates.push('city = ?'); params.push(city); }
    if (latitude) { updates.push('latitude = ?'); params.push(latitude); }
    if (longitude) { updates.push('longitude = ?'); params.push(longitude); }
    if (phone) { updates.push('phone = ?'); params.push(phone); }
    if (email) { updates.push('email = ?'); params.push(email); }
    if (timings) { updates.push('timings = ?'); params.push(JSON.stringify(timings)); }
    if (price_range) { updates.push('price_range = ?'); params.push(price_range); }
    if (features) { updates.push('features = ?'); params.push(JSON.stringify(features)); }
    if (menu) { updates.push('menu = ?'); params.push(JSON.stringify(menu)); }
    if (table_booking_enabled !== undefined) { updates.push('table_booking_enabled = ?'); params.push(table_booking_enabled); }
    if (max_guests_per_table) { updates.push('max_guests_per_table = ?'); params.push(max_guests_per_table); }
    if (slot_duration) { updates.push('slot_duration = ?'); params.push(slot_duration); }
    if (popular_dishes) { updates.push('popular_dishes = ?'); params.push(JSON.stringify(popular_dishes)); }

    if (req.files && req.files.length > 0) {
        const images = req.files.map(file => file.path);
        updates.push('images = ?');
        params.push(JSON.stringify(images));
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');

    if (updates.length === 1) {
        return errorResponse(res, 'No fields to update', 400);
    }

    params.push(id);
    const query = `UPDATE restaurants SET ${updates.join(', ')} WHERE id = ?`;

    db.run(query, params, function (err) {
        if (err) {
            return errorResponse(res, 'Error updating restaurant', 500);
        }

        if (this.changes === 0) {
            return errorResponse(res, 'Restaurant not found', 404);
        }

        return successResponse(res, { id }, 'Restaurant updated successfully');
    });
};

/**
 * Delete restaurant
 */
const deleteRestaurant = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM restaurants WHERE id = ?', [id], function (err) {
        if (err) {
            return errorResponse(res, 'Error deleting restaurant', 500);
        }

        if (this.changes === 0) {
            return errorResponse(res, 'Restaurant not found', 404);
        }

        return successResponse(res, null, 'Restaurant deleted successfully');
    });
};

/**
 * Search restaurants
 */
const searchRestaurants = (req, res) => {
    const { q, page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req.query;

    if (!q) {
        return errorResponse(res, 'Search query is required', 400);
    }

    const searchTerm = `%${q}%`;
    const query = `
    SELECT * FROM restaurants 
    WHERE name LIKE ? OR description LIKE ? OR cuisine LIKE ? OR city LIKE ?
    ORDER BY rating_average DESC
    LIMIT ? OFFSET ?
  `;

    const countQuery = `
    SELECT COUNT(*) as total FROM restaurants 
    WHERE name LIKE ? OR description LIKE ? OR cuisine LIKE ? OR city LIKE ?
  `;

    db.get(countQuery, [searchTerm, searchTerm, searchTerm, searchTerm], (err, countRow) => {
        if (err) {
            return errorResponse(res, 'Error searching restaurants', 500);
        }

        const total = countRow.total;

        db.all(query, [searchTerm, searchTerm, searchTerm, searchTerm, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)], (err, rows) => {
            if (err) {
                return errorResponse(res, 'Error searching restaurants', 500);
            }

            const restaurants = rows.map(restaurant => ({
                ...restaurant,
                images: restaurant.images ? JSON.parse(restaurant.images) : [],
                cuisine: restaurant.cuisine ? JSON.parse(restaurant.cuisine) : [],
                features: restaurant.features ? JSON.parse(restaurant.features) : [],
                timings: restaurant.timings ? JSON.parse(restaurant.timings) : {},
                menu: restaurant.menu ? JSON.parse(restaurant.menu) : [],
                popular_dishes: restaurant.popular_dishes ? JSON.parse(restaurant.popular_dishes) : []
            }));

            return paginatedResponse(res, restaurants, page, limit, total, 'Search results');
        });
    });
};

/**
 * Get restaurant menu
 */
const getRestaurantMenu = (req, res) => {
    const { id } = req.params;

    db.get('SELECT menu FROM restaurants WHERE id = ?', [id], (err, row) => {
        if (err) {
            return errorResponse(res, 'Error fetching menu', 500);
        }

        if (!row) {
            return errorResponse(res, 'Restaurant not found', 404);
        }

        const menu = row.menu ? JSON.parse(row.menu) : [];
        return successResponse(res, menu, 'Menu fetched successfully');
    });
};

module.exports = {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants,
    getRestaurantMenu
};
