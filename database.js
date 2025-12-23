const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const DB_PATH = path.join(__dirname, '..', 'district.db');
console.log('📂 Database Path:', DB_PATH);

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Initialize database schema
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Events Table
      db.run(`
        CREATE TABLE IF NOT EXISTS events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          category TEXT CHECK(category IN ('concert', 'sports', 'comedy', 'workshop', 'exhibition', 'other')),
          images TEXT,
          venue_name TEXT,
          venue_address TEXT,
          venue_city TEXT,
          venue_latitude REAL,
          venue_longitude REAL,
          start_date_time TEXT NOT NULL,
          end_date_time TEXT,
          price_general REAL,
          price_vip REAL,
          price_premium REAL,
          total_seats_general INTEGER DEFAULT 0,
          total_seats_vip INTEGER DEFAULT 0,
          total_seats_premium INTEGER DEFAULT 0,
          available_seats_general INTEGER DEFAULT 0,
          available_seats_vip INTEGER DEFAULT 0,
          available_seats_premium INTEGER DEFAULT 0,
          organizer_name TEXT,
          organizer_contact TEXT,
          status TEXT CHECK(status IN ('upcoming', 'ongoing', 'cancelled', 'completed')) DEFAULT 'upcoming',
          tags TEXT,
          rating_average REAL DEFAULT 0,
          rating_count INTEGER DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) console.error('Error creating events table:', err);
      });

      // Restaurants Table
      db.run(`
        CREATE TABLE IF NOT EXISTS restaurants (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          cuisine TEXT,
          images TEXT,
          address TEXT,
          city TEXT,
          latitude REAL,
          longitude REAL,
          phone TEXT,
          email TEXT,
          timings TEXT,
          price_range TEXT CHECK(price_range IN ('$', '$$', '$$$', '$$$$')),
          features TEXT,
          menu TEXT,
          table_booking_enabled INTEGER DEFAULT 1,
          max_guests_per_table INTEGER DEFAULT 6,
          slot_duration INTEGER DEFAULT 120,
          rating_average REAL DEFAULT 0,
          rating_count INTEGER DEFAULT 0,
          popular_dishes TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) console.error('Error creating restaurants table:', err);
      });

      // Sports Venues Table
      db.run(`
        CREATE TABLE IF NOT EXISTS sports_venues (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          sports_type TEXT,
          images TEXT,
          address TEXT,
          city TEXT,
          latitude REAL,
          longitude REAL,
          phone TEXT,
          email TEXT,
          facilities TEXT,
          amenities TEXT,
          opening_time TEXT,
          closing_time TEXT,
          rating_average REAL DEFAULT 0,
          rating_count INTEGER DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) console.error('Error creating sports_venues table:', err);
      });

      // Bookings Table
      db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          booking_type TEXT CHECK(booking_type IN ('event', 'restaurant', 'sports')) NOT NULL,
          customer_name TEXT NOT NULL,
          customer_email TEXT,
          customer_phone TEXT NOT NULL,
          event_id INTEGER,
          tickets_general INTEGER DEFAULT 0,
          tickets_vip INTEGER DEFAULT 0,
          tickets_premium INTEGER DEFAULT 0,
          restaurant_id INTEGER,
          booking_date TEXT,
          booking_time TEXT,
          guest_count INTEGER,
          special_requests TEXT,
          sports_id INTEGER,
          facility_name TEXT,
          time_slot_start TEXT,
          time_slot_end TEXT,
          equipment_rental TEXT,
          total_amount REAL NOT NULL,
          status TEXT CHECK(status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'confirmed',
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
          FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
          FOREIGN KEY (sports_id) REFERENCES sports_venues(id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) console.error('Error creating bookings table:', err);
      });

      // Reviews Table
      db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          review_type TEXT CHECK(review_type IN ('event', 'restaurant', 'sports')) NOT NULL,
          reference_id INTEGER NOT NULL,
          reviewer_name TEXT NOT NULL,
          reviewer_email TEXT,
          rating INTEGER CHECK(rating >= 1 AND rating <= 5) NOT NULL,
          comment TEXT,
          images TEXT,
          helpful_count INTEGER DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) console.error('Error creating reviews table:', err);
        else {
          console.log('Database schema initialized successfully');
          resolve();
        }
      });
    });
  });
};

module.exports = { db, initDatabase };
