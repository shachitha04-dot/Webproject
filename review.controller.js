const { db } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../utils/constants');

/**
 * Create review
 */
const createReview = (req, res) => {
    const {
        review_type,
        reference_id,
        reviewer_name,
        reviewer_email,
        rating,
        comment
    } = req.body;

    // Handle uploaded images
    const images = req.files ? req.files.map(file => file.path) : [];

    const query = `
    INSERT INTO reviews (
      review_type, reference_id, reviewer_name, reviewer_email,
      rating, comment, images
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    const params = [
        review_type,
        reference_id,
        reviewer_name,
        reviewer_email,
        rating,
        comment,
        JSON.stringify(images)
    ];

    db.run(query, params, function (err) {
        if (err) {
            return errorResponse(res, 'Error creating review', 500);
        }

        // Update rating in the respective table
        updateRatings(review_type, reference_id);

        return successResponse(res, { id: this.lastID }, 'Review created successfully', 201);
    });
};

/**
 * Get reviews by type and reference ID
 */
const getReviews = (req, res) => {
    const { type, id } = req.params;
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req.query;

    const countQuery = 'SELECT COUNT(*) as total FROM reviews WHERE review_type = ? AND reference_id = ?';

    db.get(countQuery, [type, id], (err, countRow) => {
        if (err) {
            return errorResponse(res, 'Error fetching reviews count', 500);
        }

        const total = countRow.total;

        const query = `
      SELECT * FROM reviews 
      WHERE review_type = ? AND reference_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

        db.all(query, [type, id, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)], (err, rows) => {
            if (err) {
                return errorResponse(res, 'Error fetching reviews', 500);
            }

            const reviews = rows.map(review => ({
                ...review,
                images: review.images ? JSON.parse(review.images) : []
            }));

            return paginatedResponse(res, reviews, page, limit, total, 'Reviews fetched successfully');
        });
    });
};

/**
 * Update review
 */
const updateReview = (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const updates = [];
    const params = [];

    if (rating) { updates.push('rating = ?'); params.push(rating); }
    if (comment) { updates.push('comment = ?'); params.push(comment); }

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
    const query = `UPDATE reviews SET ${updates.join(', ')} WHERE id = ?`;

    db.run(query, params, function (err) {
        if (err) {
            return errorResponse(res, 'Error updating review', 500);
        }

        if (this.changes === 0) {
            return errorResponse(res, 'Review not found', 404);
        }

        // Get the review to update ratings
        db.get('SELECT review_type, reference_id FROM reviews WHERE id = ?', [id], (err, review) => {
            if (!err && review) {
                updateRatings(review.review_type, review.reference_id);
            }
        });

        return successResponse(res, { id }, 'Review updated successfully');
    });
};

/**
 * Delete review
 */
const deleteReview = (req, res) => {
    const { id } = req.params;

    // Get the review first to update ratings after deletion
    db.get('SELECT review_type, reference_id FROM reviews WHERE id = ?', [id], (err, review) => {
        if (err) {
            return errorResponse(res, 'Error fetching review', 500);
        }

        if (!review) {
            return errorResponse(res, 'Review not found', 404);
        }

        db.run('DELETE FROM reviews WHERE id = ?', [id], function (err) {
            if (err) {
                return errorResponse(res, 'Error deleting review', 500);
            }

            // Update ratings
            updateRatings(review.review_type, review.reference_id);

            return successResponse(res, null, 'Review deleted successfully');
        });
    });
};

/**
 * Mark review as helpful
 */
const markHelpful = (req, res) => {
    const { id } = req.params;

    db.run('UPDATE reviews SET helpful_count = helpful_count + 1 WHERE id = ?', [id], function (err) {
        if (err) {
            return errorResponse(res, 'Error updating review', 500);
        }

        if (this.changes === 0) {
            return errorResponse(res, 'Review not found', 404);
        }

        return successResponse(res, null, 'Review marked as helpful');
    });
};

/**
 * Helper function to update ratings in respective tables
 */
const updateRatings = (reviewType, referenceId) => {
    const tableName = reviewType === 'event' ? 'events' :
        reviewType === 'restaurant' ? 'restaurants' : 'sports_venues';

    // Calculate new average and count
    db.get(
        'SELECT AVG(rating) as avg_rating, COUNT(*) as count FROM reviews WHERE review_type = ? AND reference_id = ?',
        [reviewType, referenceId],
        (err, result) => {
            if (err || !result) return;

            const updateQuery = `UPDATE ${tableName} SET rating_average = ?, rating_count = ? WHERE id = ?`;
            db.run(updateQuery, [result.avg_rating || 0, result.count || 0, referenceId]);
        }
    );
};

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
    markHelpful
};
