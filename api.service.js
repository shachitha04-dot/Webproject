// API Service for making HTTP requests to the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper function to handle responses
const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};

// Helper function to make requests
const request = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        return await handleResponse(response);
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Events API
export const eventsAPI = {
    getAll: () => request('/api/v1/events'),
    getById: (id) => request(`/api/v1/events/${id}`),
    create: (data) => request('/api/v1/events', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id, data) => request(`/api/v1/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id) => request(`/api/v1/events/${id}`, {
        method: 'DELETE',
    }),
};

// Restaurants API
export const restaurantsAPI = {
    getAll: () => request('/api/restaurants'),
    getById: (id) => request(`/api/restaurants/${id}`),
    create: (data) => request('/api/restaurants', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id, data) => request(`/api/restaurants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id) => request(`/api/restaurants/${id}`, {
        method: 'DELETE',
    }),
};

// Sports API
export const sportsAPI = {
    getAll: () => request('/api/sports'),
    getById: (id) => request(`/api/sports/${id}`),
    create: (data) => request('/api/sports', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id, data) => request(`/api/sports/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id) => request(`/api/sports/${id}`, {
        method: 'DELETE',
    }),
};

// Bookings API
export const bookingsAPI = {
    getAll: () => request('/api/bookings'),
    getById: (id) => request(`/api/bookings/${id}`),
    create: (data) => request('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id, data) => request(`/api/bookings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    cancel: (id) => request(`/api/bookings/${id}/cancel`, {
        method: 'POST',
    }),
};

// Reviews API
export const reviewsAPI = {
    getByItem: (itemType, itemId) => request(`/api/reviews/${itemType}/${itemId}`),
    create: (data) => request('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id, data) => request(`/api/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id) => request(`/api/reviews/${id}`, {
        method: 'DELETE',
    }),
};

// Search API
export const searchAPI = {
    search: (query, filters = {}) => {
        const params = new URLSearchParams({ q: query, ...filters });
        return request(`/api/search?${params}`);
    },
};

export default {
    events: eventsAPI,
    restaurants: restaurantsAPI,
    sports: sportsAPI,
    bookings: bookingsAPI,
    reviews: reviewsAPI,
    search: searchAPI,
};
