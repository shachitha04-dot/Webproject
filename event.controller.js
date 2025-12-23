const { db } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../utils/constants');

/**
 * Get all events with filters and pagination
 */
const getAllEvents = (req, res) => {
    const {
        category,
        city,
        startDate,
        endDate,
        minPrice,
        maxPrice,
        status,
        sort = 'start_date_time',
        order = 'ASC',
        page = DEFAULT_PAGE,
        limit = DEFAULT_LIMIT
    } = req.query;

    let query = 'SELECT * FROM events WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM events WHERE 1=1';
    const params = [];
    const countParams = [];

    // Apply filters
    if (category) {
        query += ' AND category = ?';
        countQuery += ' AND category = ?';
        params.push(category);
        countParams.push(category);
    }

    if (city) {
        query += ' AND venue_city LIKE ?';
        countQuery += ' AND venue_city LIKE ?';
        params.push(`%${city}%`);
        countParams.push(`%${city}%`);
    }

    if (status) {
        query += ' AND status = ?';
        countQuery += ' AND status = ?';
        params.push(status);
        countParams.push(status);
    }

    if (startDate) {
        query += ' AND start_date_time >= ?';
        countQuery += ' AND start_date_time >= ?';
        params.push(startDate);
        countParams.push(startDate);
    }

    if (endDate) {
        query += ' AND start_date_time <= ?';
        countQuery += ' AND start_date_time <= ?';
        params.push(endDate);
        countParams.push(endDate);
    }

    if (minPrice) {
        query += ' AND (price_general >= ? OR price_vip >= ? OR price_premium >= ?)';
        countQuery += ' AND (price_general >= ? OR price_vip >= ? OR price_premium >= ?)';
        params.push(minPrice, minPrice, minPrice);
        countParams.push(minPrice, minPrice, minPrice);
    }

    if (maxPrice) {
        query += ' AND (price_general <= ? OR price_vip <= ? OR price_premium <= ?)';
        countQuery += ' AND (price_general <= ? OR price_vip <= ? OR price_premium <= ?)';
        params.push(maxPrice, maxPrice, maxPrice);
        countParams.push(maxPrice, maxPrice, maxPrice);
    }

    // Get total count
    db.get(countQuery, countParams, (err, countRow) => {
        if (err) {
            return errorResponse(res, 'Error fetching events count', 500);
        }

        const total = countRow ? countRow.total : 0;

        // Add sorting and pagination
        query += ` ORDER BY ${sort} ${order}`;
        query += ` LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

        // Get events
        db.all(query, params, (err, rows) => {
            if (err) {
                return errorResponse(res, 'Error fetching events', 500);
            }

            // Parse JSON fields
            const events = rows.map(event => ({
                ...event,
                images: event.images ? JSON.parse(event.images) : [],
                tags: event.tags ? JSON.parse(event.tags) : []
            }));

            return paginatedResponse(res, events, page, limit, total, 'Events fetched successfully');
        });
    });
};

/**
 * Get single event by ID
 */
const getEventById = (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM events WHERE id = ?', [id], (err, row) => {
        if (err) {
            return errorResponse(res, 'Error fetching event', 500);
        }

        if (!row) {
            return errorResponse(res, 'Event not found', 404);
        }

        // Parse JSON fields
        const event = {
            ...row,
            images: row.images ? JSON.parse(row.images) : [],
            tags: row.tags ? JSON.parse(row.tags) : []
        };

        return successResponse(res, event, 'Event fetched successfully');
    });
};

/**
 * Create new event
 */
const createEvent = (req, res) => {
    const {
        title,
        description,
        category,
        venue_name,
        venue_address,
        venue_city,
        venue_latitude,
        venue_longitude,
        start_date_time,
        end_date_time,
        price_general,
        price_vip,
        price_premium,
        total_seats_general,
        total_seats_vip,
        total_seats_premium,
        organizer_name,
        organizer_contact,
        tags
    } = req.body;

    // Handle uploaded images
    const images = req.files ? req.files.map(file => file.path) : [];

    const query = `
    INSERT INTO events (
      title, description, category, images,
      venue_name, venue_address, venue_city, venue_latitude, venue_longitude,
      start_date_time, end_date_time,
      price_general, price_vip, price_premium,
      total_seats_general, total_seats_vip, total_seats_premium,
      available_seats_general, available_seats_vip, available_seats_premium,
      organizer_name, organizer_contact, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const params = [
        title,
        description,
        category,
        JSON.stringify(images),
        venue_name,
        venue_address,
        venue_city,
        venue_latitude,
        venue_longitude,
        start_date_time,
        end_date_time,
        price_general || 0,
        price_vip || 0,
        price_premium || 0,
        total_seats_general || 0,
        total_seats_vip || 0,
        total_seats_premium || 0,
        total_seats_general || 0,
        total_seats_vip || 0,
        total_seats_premium || 0,
        organizer_name,
        organizer_contact,
        JSON.stringify(tags || [])
    ];

    db.run(query, params, function (err) {
        if (err) {
            return errorResponse(res, 'Error creating event', 500);
        }

        return successResponse(res, { id: this.lastID }, 'Event created successfully', 201);
    });
};

/**
 * Update event
 */
const updateEvent = (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        category,
        venue_name,
        venue_address,
        venue_city,
        venue_latitude,
        venue_longitude,
        start_date_time,
        end_date_time,
        price_general,
        price_vip,
        price_premium,
        total_seats_general,
        total_seats_vip,
        total_seats_premium,
        organizer_name,
        organizer_contact,
        status,
        tags
    } = req.body;

    // Build dynamic update query
    const updates = [];
    const params = [];

    if (title) { updates.push('title = ?'); params.push(title); }
    if (description) { updates.push('description = ?'); params.push(description); }
    if (category) { updates.push('category = ?'); params.push(category); }
    if (venue_name) { updates.push('venue_name = ?'); params.push(venue_name); }
    if (venue_address) { updates.push('venue_address = ?'); params.push(venue_address); }
    if (venue_city) { updates.push('venue_city = ?'); params.push(venue_city); }
    if (venue_latitude) { updates.push('venue_latitude = ?'); params.push(venue_latitude); }
    if (venue_longitude) { updates.push('venue_longitude = ?'); params.push(venue_longitude); }
    if (start_date_time) { updates.push('start_date_time = ?'); params.push(start_date_time); }
    if (end_date_time) { updates.push('end_date_time = ?'); params.push(end_date_time); }
    if (price_general !== undefined) { updates.push('price_general = ?'); params.push(price_general); }
    if (price_vip !== undefined) { updates.push('price_vip = ?'); params.push(price_vip); }
    if (price_premium !== undefined) { updates.push('price_premium = ?'); params.push(price_premium); }
    if (total_seats_general !== undefined) { updates.push('total_seats_general = ?'); params.push(total_seats_general); }
    if (total_seats_vip !== undefined) { updates.push('total_seats_vip = ?'); params.push(total_seats_vip); }
    if (total_seats_premium !== undefined) { updates.push('total_seats_premium = ?'); params.push(total_seats_premium); }
    if (organizer_name) { updates.push('organizer_name = ?'); params.push(organizer_name); }
    if (organizer_contact) { updates.push('organizer_contact = ?'); params.push(organizer_contact); }
    if (status) { updates.push('status = ?'); params.push(status); }
    if (tags) { updates.push('tags = ?'); params.push(JSON.stringify(tags)); }

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
    const query = `UPDATE events SET ${updates.join(', ')} WHERE id = ?`;

    db.run(query, params, function (err) {
        if (err) {
            return errorResponse(res, 'Error updating event', 500);
        }

        if (this.changes === 0) {
            return errorResponse(res, 'Event not found', 404);
        }

        return successResponse(res, { id }, 'Event updated successfully');
    });
};

/**
 * Delete event
 */
const deleteEvent = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM events WHERE id = ?', [id], function (err) {
        if (err) {
            return errorResponse(res, 'Error deleting event', 500);
        }

        if (this.changes === 0) {
            return errorResponse(res, 'Event not found', 404);
        }

        return successResponse(res, null, 'Event deleted successfully');
    });
};

/**
 * Search events
 */
const searchEvents = (req, res) => {
    const { q, page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req.query;

    if (!q) {
        return errorResponse(res, 'Search query is required', 400);
    }

    const searchTerm = `%${q}%`;
    const query = `
    SELECT * FROM events 
    WHERE title LIKE ? OR description LIKE ? OR venue_city LIKE ? OR tags LIKE ?
    ORDER BY start_date_time ASC
    LIMIT ? OFFSET ?
  `;

    const countQuery = `
    SELECT COUNT(*) as total FROM events 
    WHERE title LIKE ? OR description LIKE ? OR venue_city LIKE ? OR tags LIKE ?
  `;

    db.get(countQuery, [searchTerm, searchTerm, searchTerm, searchTerm], (err, countRow) => {
        if (err) {
            return errorResponse(res, 'Error searching events', 500);
        }

        const total = countRow.total;

        db.all(query, [searchTerm, searchTerm, searchTerm, searchTerm, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)], (err, rows) => {
            if (err) {
                return errorResponse(res, 'Error searching events', 500);
            }

            const events = rows.map(event => ({
                ...event,
                images: event.images ? JSON.parse(event.images) : [],
                tags: event.tags ? JSON.parse(event.tags) : []
            }));

            return paginatedResponse(res, events, page, limit, total, 'Search results');
        });
    });
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    searchEvents
};
