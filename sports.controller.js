const { db } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../utils/constants');

/**
 * Get all sports venues with filters and pagination
 */
const getAllSportsVenues = (req, res) => {
    const {
        sportsType,
        city,
        minPrice,
        maxPrice,
        amenities,
        sort = 'name',
        order = 'ASC',
        page = DEFAULT_PAGE,
        limit = DEFAULT_LIMIT
    } = req.query;

    let query = 'SELECT * FROM sports_venues WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM sports_venues WHERE 1=1';
    const params = [];
    const countParams = [];

    // Apply filters
    if (sportsType) {
        query += ' AND sports_type LIKE ?';
        countQuery += ' AND sports_type LIKE ?';
        params.push(`%${sportsType}%`);
        countParams.push(`%${sportsType}%`);
    }

    if (city) {
        query += ' AND city LIKE ?';
        countQuery += ' AND city LIKE ?';
        params.push(`%${city}%`);
        countParams.push(`%${city}%`);
    }

    if (amenities) {
        query += ' AND amenities LIKE ?';
        countQuery += ' AND amenities LIKE ?';
        params.push(`%${amenities}%`);
        countParams.push(`%${amenities}%`);
    }

    // Get total count
    db.get(countQuery, countParams, (err, countRow) => {
        if (err) {
            return errorResponse(res, 'Error fetching sports venues count', 500);
        }

        const total = countRow.total;

        // Add sorting and pagination
        query += ` ORDER BY ${sort} ${order}`;
        query += ` LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

        // Get sports venues
        db.all(query, params, (err, rows) => {
            if (err) {
                return errorResponse(res, 'Error fetching sports venues', 500);
            }

            // Parse JSON fields
            const venues = rows.map(venue => ({
                ...venue,
                images: venue.images ? JSON.parse(venue.images) : [],
                sports_type: venue.sports_type ? JSON.parse(venue.sports_type) : [],
                facilities: venue.facilities ? JSON.parse(venue.facilities) : [],
                amenities: venue.amenities ? JSON.parse(venue.amenities) : []
            }));

            return paginatedResponse(res, venues, page, limit, total, 'Sports venues fetched successfully');
        });
    });
};

/**
 * Get single sports venue by ID
 */
const getSportsVenueById = (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM sports_venues WHERE id = ?', [id], (err, row) => {
        if (err) {
            return errorResponse(res, 'Error fetching sports venue', 500);
        }

        if (!row) {
            return errorResponse(res, 'Sports venue not found', 404);
        }

        // Parse JSON fields
        const venue = {
            ...row,
            images: row.images ? JSON.parse(row.images) : [],
            sports_type: row.sports_type ? JSON.parse(row.sports_type) : [],
            facilities: row.facilities ? JSON.parse(row.facilities) : [],
            amenities: row.amenities ? JSON.parse(row.amenities) : []
        };

        return successResponse(res, venue, 'Sports venue fetched successfully');
    });
};

/**
 * Create new sports venue
 */
const createSportsVenue = (req, res) => {
    const {
        name,
        description,
        sports_type,
        address,
        city,
        latitude,
        longitude,
        phone,
        email,
        facilities,
        amenities,
        opening_time,
        closing_time
    } = req.body;

    // Handle uploaded images
    const images = req.files ? req.files.map(file => file.path) : [];

    const query = `
    INSERT INTO sports_venues (
      name, description, sports_type, images,
      address, city, latitude, longitude,
      phone, email, facilities, amenities,
      opening_time, closing_time
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const params = [
        name,
        description,
        JSON.stringify(sports_type || []),
        JSON.stringify(images),
        address,
        city,
        latitude,
        longitude,
        phone,
        email,
        JSON.stringify(facilities || []),
        JSON.stringify(amenities || []),
        opening_time,
        closing_time
    ];

    db.run(query, params, function (err) {
        if (err) {
            return errorResponse(res, 'Error creating sports venue', 500);
        }

        return successResponse(res, { id: this.lastID }, 'Sports venue created successfully', 201);
    });
};

/**
 * Update sports venue
 */
const updateSportsVenue = (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        sports_type,
        address,
        city,
        latitude,
        longitude,
        phone,
        email,
        facilities,
        amenities,
        opening_time,
        closing_time
    } = req.body;

    // Build dynamic update query
    const updates = [];
    const params = [];

    if (name) { updates.push('name = ?'); params.push(name); }
    if (description) { updates.push('description = ?'); params.push(description); }
    if (sports_type) { updates.push('sports_type = ?'); params.push(JSON.stringify(sports_type)); }
    if (address) { updates.push('address = ?'); params.push(address); }
    if (city) { updates.push('city = ?'); params.push(city); }
    if (latitude) { updates.push('latitude = ?'); params.push(latitude); }
    if (longitude) { updates.push('longitude = ?'); params.push(longitude); }
    if (phone) { updates.push('phone = ?'); params.push(phone); }
    if (email) { updates.push('email = ?'); params.push(email); }
    if (facilities) { updates.push('facilities = ?'); params.push(JSON.stringify(facilities)); }
    if (amenities) { updates.push('amenities = ?'); params.push(JSON.stringify(amenities)); }
    if (opening_time) { updates.push('opening_time = ?'); params.push(opening_time); }
    if (closing_time) { updates.push('closing_time = ?'); params.push(closing_time); }

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
    const query = `UPDATE sports_venues SET ${updates.join(', ')} WHERE id = ?`;

    db.run(query, params, function (err) {
        if (err) {
            return errorResponse(res, 'Error updating sports venue', 500);
        }

        if (this.changes === 0) {
            return errorResponse(res, 'Sports venue not found', 404);
        }

        return successResponse(res, { id }, 'Sports venue updated successfully');
    });
};

/**
 * Delete sports venue
 */
const deleteSportsVenue = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM sports_venues WHERE id = ?', [id], function (err) {
        if (err) {
            return errorResponse(res, 'Error deleting sports venue', 500);
        }

        if (this.changes === 0) {
            return errorResponse(res, 'Sports venue not found', 404);
        }

        return successResponse(res, null, 'Sports venue deleted successfully');
    });
};

/**
 * Search sports venues
 */
const searchSportsVenues = (req, res) => {
    const { q, page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req.query;

    if (!q) {
        return errorResponse(res, 'Search query is required', 400);
    }

    const searchTerm = `%${q}%`;
    const query = `
    SELECT * FROM sports_venues 
    WHERE name LIKE ? OR description LIKE ? OR sports_type LIKE ? OR city LIKE ?
    ORDER BY rating_average DESC
    LIMIT ? OFFSET ?
  `;

    const countQuery = `
    SELECT COUNT(*) as total FROM sports_venues 
    WHERE name LIKE ? OR description LIKE ? OR sports_type LIKE ? OR city LIKE ?
  `;

    db.get(countQuery, [searchTerm, searchTerm, searchTerm, searchTerm], (err, countRow) => {
        if (err) {
            return errorResponse(res, 'Error searching sports venues', 500);
        }

        const total = countRow.total;

        db.all(query, [searchTerm, searchTerm, searchTerm, searchTerm, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)], (err, rows) => {
            if (err) {
                return errorResponse(res, 'Error searching sports venues', 500);
            }

            const venues = rows.map(venue => ({
                ...venue,
                images: venue.images ? JSON.parse(venue.images) : [],
                sports_type: venue.sports_type ? JSON.parse(venue.sports_type) : [],
                facilities: venue.facilities ? JSON.parse(venue.facilities) : [],
                amenities: venue.amenities ? JSON.parse(venue.amenities) : []
            }));

            return paginatedResponse(res, venues, page, limit, total, 'Search results');
        });
    });
};

module.exports = {
    getAllSportsVenues,
    getSportsVenueById,
    createSportsVenue,
    updateSportsVenue,
    deleteSportsVenue,
    searchSportsVenues
};
