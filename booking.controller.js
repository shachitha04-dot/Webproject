const { db } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../utils/constants');

/**
 * Create event booking
 */
const createEventBooking = (req, res) => {
    const {
        customer_name,
        customer_email,
        customer_phone,
        event_id,
        tickets_general,
        tickets_vip,
        tickets_premium
    } = req.body;

    // First check if event exists and has available seats
    db.get('SELECT * FROM events WHERE id = ?', [event_id], (err, event) => {
        if (err) {
            return errorResponse(res, 'Error fetching event', 500);
        }

        if (!event) {
            return errorResponse(res, 'Event not found', 404);
        }

        // Check seat availability
        if (tickets_general > event.available_seats_general ||
            tickets_vip > event.available_seats_vip ||
            tickets_premium > event.available_seats_premium) {
            return errorResponse(res, 'Not enough seats available', 400);
        }

        // Calculate total amount
        const total_amount =
            (tickets_general || 0) * event.price_general +
            (tickets_vip || 0) * event.price_vip +
            (tickets_premium || 0) * event.price_premium;

        // Create booking
        const query = `
      INSERT INTO bookings (
        booking_type, customer_name, customer_email, customer_phone,
        event_id, tickets_general, tickets_vip, tickets_premium, total_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const params = [
            'event',
            customer_name,
            customer_email,
            customer_phone,
            event_id,
            tickets_general || 0,
            tickets_vip || 0,
            tickets_premium || 0,
            total_amount
        ];

        db.run(query, params, function (err) {
            if (err) {
                return errorResponse(res, 'Error creating booking', 500);
            }

            // Update available seats
            const updateQuery = `
        UPDATE events SET 
          available_seats_general = available_seats_general - ?,
          available_seats_vip = available_seats_vip - ?,
          available_seats_premium = available_seats_premium - ?
        WHERE id = ?
      `;

            db.run(updateQuery, [tickets_general || 0, tickets_vip || 0, tickets_premium || 0, event_id], (err) => {
                if (err) {
                    return errorResponse(res, 'Error updating seats', 500);
                }

                return successResponse(res, {
                    id: this.lastID,
                    total_amount
                }, 'Event booking created successfully', 201);
            });
        });
    });
};

/**
 * Create restaurant booking
 */
const createRestaurantBooking = (req, res) => {
    const {
        customer_name,
        customer_email,
        customer_phone,
        restaurant_id,
        booking_date,
        booking_time,
        guest_count,
        special_requests
    } = req.body;

    // Check if restaurant exists
    db.get('SELECT * FROM restaurants WHERE id = ?', [restaurant_id], (err, restaurant) => {
        if (err) {
            return errorResponse(res, 'Error fetching restaurant', 500);
        }

        if (!restaurant) {
            return errorResponse(res, 'Restaurant not found', 404);
        }

        if (!restaurant.table_booking_enabled) {
            return errorResponse(res, 'Table booking not enabled for this restaurant', 400);
        }

        // Create booking
        const query = `
      INSERT INTO bookings (
        booking_type, customer_name, customer_email, customer_phone,
        restaurant_id, booking_date, booking_time, guest_count, special_requests, total_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const params = [
            'restaurant',
            customer_name,
            customer_email,
            customer_phone,
            restaurant_id,
            booking_date,
            booking_time,
            guest_count,
            special_requests,
            0 // Restaurant bookings typically don't have upfront payment
        ];

        db.run(query, params, function (err) {
            if (err) {
                return errorResponse(res, 'Error creating booking', 500);
            }

            return successResponse(res, { id: this.lastID }, 'Restaurant booking created successfully', 201);
        });
    });
};

/**
 * Create sports booking
 */
const createSportsBooking = (req, res) => {
    const {
        customer_name,
        customer_email,
        customer_phone,
        sports_id,
        facility_name,
        booking_date,
        time_slot_start,
        time_slot_end,
        equipment_rental,
        total_amount
    } = req.body;

    // Check if sports venue exists
    db.get('SELECT * FROM sports_venues WHERE id = ?', [sports_id], (err, venue) => {
        if (err) {
            return errorResponse(res, 'Error fetching sports venue', 500);
        }

        if (!venue) {
            return errorResponse(res, 'Sports venue not found', 404);
        }

        // Create booking
        const query = `
      INSERT INTO bookings (
        booking_type, customer_name, customer_email, customer_phone,
        sports_id, facility_name, booking_date, time_slot_start, time_slot_end,
        equipment_rental, total_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const params = [
            'sports',
            customer_name,
            customer_email,
            customer_phone,
            sports_id,
            facility_name,
            booking_date,
            time_slot_start,
            time_slot_end,
            JSON.stringify(equipment_rental || []),
            total_amount
        ];

        db.run(query, params, function (err) {
            if (err) {
                return errorResponse(res, 'Error creating booking', 500);
            }

            return successResponse(res, {
                id: this.lastID,
                total_amount
            }, 'Sports booking created successfully', 201);
        });
    });
};

/**
 * Get all bookings with filters
 */
const getAllBookings = (req, res) => {
    const {
        booking_type,
        status,
        customer_email,
        page = DEFAULT_PAGE,
        limit = DEFAULT_LIMIT
    } = req.query;

    let query = 'SELECT * FROM bookings WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM bookings WHERE 1=1';
    const params = [];
    const countParams = [];

    if (booking_type) {
        query += ' AND booking_type = ?';
        countQuery += ' AND booking_type = ?';
        params.push(booking_type);
        countParams.push(booking_type);
    }

    if (status) {
        query += ' AND status = ?';
        countQuery += ' AND status = ?';
        params.push(status);
        countParams.push(status);
    }

    if (customer_email) {
        query += ' AND customer_email = ?';
        countQuery += ' AND customer_email = ?';
        params.push(customer_email);
        countParams.push(customer_email);
    }

    // Get total count
    db.get(countQuery, countParams, (err, countRow) => {
        if (err) {
            return errorResponse(res, 'Error fetching bookings count', 500);
        }

        const total = countRow.total;

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

        db.all(query, params, (err, rows) => {
            if (err) {
                return errorResponse(res, 'Error fetching bookings', 500);
            }

            const bookings = rows.map(booking => ({
                ...booking,
                equipment_rental: booking.equipment_rental ? JSON.parse(booking.equipment_rental) : []
            }));

            return paginatedResponse(res, bookings, page, limit, total, 'Bookings fetched successfully');
        });
    });
};

/**
 * Get booking by ID
 */
const getBookingById = (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM bookings WHERE id = ?', [id], (err, row) => {
        if (err) {
            return errorResponse(res, 'Error fetching booking', 500);
        }

        if (!row) {
            return errorResponse(res, 'Booking not found', 404);
        }

        const booking = {
            ...row,
            equipment_rental: row.equipment_rental ? JSON.parse(row.equipment_rental) : []
        };

        return successResponse(res, booking, 'Booking fetched successfully');
    });
};

/**
 * Cancel booking
 */
const cancelBooking = (req, res) => {
    const { id } = req.params;

    // Get booking first
    db.get('SELECT * FROM bookings WHERE id = ?', [id], (err, booking) => {
        if (err) {
            return errorResponse(res, 'Error fetching booking', 500);
        }

        if (!booking) {
            return errorResponse(res, 'Booking not found', 404);
        }

        if (booking.status === 'cancelled') {
            return errorResponse(res, 'Booking already cancelled', 400);
        }

        // Update booking status
        db.run('UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['cancelled', id], function (err) {
            if (err) {
                return errorResponse(res, 'Error cancelling booking', 500);
            }

            // If it's an event booking, restore seats
            if (booking.booking_type === 'event') {
                const updateQuery = `
          UPDATE events SET 
            available_seats_general = available_seats_general + ?,
            available_seats_vip = available_seats_vip + ?,
            available_seats_premium = available_seats_premium + ?
          WHERE id = ?
        `;

                db.run(updateQuery, [booking.tickets_general, booking.tickets_vip, booking.tickets_premium, booking.event_id], (err) => {
                    if (err) {
                        console.error('Error restoring seats:', err);
                    }
                });
            }

            return successResponse(res, null, 'Booking cancelled successfully');
        });
    });
};

module.exports = {
    createEventBooking,
    createRestaurantBooking,
    createSportsBooking,
    getAllBookings,
    getBookingById,
    cancelBooking
};
