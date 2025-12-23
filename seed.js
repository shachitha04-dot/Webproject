const { db, initDatabase } = require('../config/database');

const seedData = async () => {
    try {
        await initDatabase();
        console.log('✅ Database initialized');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        process.exit(1);
    }

    console.log('🌱 Starting database seed...');

    const events = [
        {
            title: "Diljit Dosanjh - Dil-Luminati Tour",
            description: "Experience the magic of Diljit Dosanjh live in concert! A night of electrifying punjabi music and high energy performances.",
            category: "concert",
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
            ]),
            venue_name: "JLN Stadium",
            venue_address: "Pragati Vihar",
            venue_city: "Delhi/NCR",
            venue_latitude: 28.5828,
            venue_longitude: 77.2344,
            start_date_time: "2024-12-25T19:00:00",
            end_date_time: "2024-12-25T23:00:00",
            price_general: 1499,
            price_vip: 4999,
            price_premium: 9999,
            total_seats_general: 5000,
            total_seats_vip: 500,
            total_seats_premium: 100,
            available_seats_general: 4500,
            available_seats_vip: 450,
            available_seats_premium: 90,
            organizer_name: "Live Nation",
            organizer_contact: "contact@livenation.com",
            status: "upcoming",
            tags: JSON.stringify(["music", "punjabi", "concert", "live"]),
            rating_average: 4.8,
            rating_count: 1250
        },
        {
            title: "Zakir Khan - Tathastu",
            description: "Catch the Sakht Launda live with his new special Tathastu. A laugh riot guaranteed!",
            category: "comedy",
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2070&auto=format&fit=crop"
            ]),
            venue_name: "Siri Fort Auditorium",
            venue_address: "August Kranti Marg",
            venue_city: "Delhi/NCR",
            venue_latitude: 28.5545,
            venue_longitude: 77.2194,
            start_date_time: "2024-11-30T20:00:00",
            end_date_time: "2024-11-30T22:00:00",
            price_general: 999,
            price_vip: 2499,
            price_premium: 0,
            total_seats_general: 1500,
            total_seats_vip: 200,
            total_seats_premium: 0,
            available_seats_general: 200,
            available_seats_vip: 50,
            available_seats_premium: 0,
            organizer_name: "OML",
            organizer_contact: "tickets@oml.in",
            status: "upcoming",
            tags: JSON.stringify(["comedy", "standup", "hindi"]),
            rating_average: 4.9,
            rating_count: 850
        },
        {
            title: "Pottery Workshop",
            description: "Learn the art of pottery making in this hands-on workshop. Create your own ceramic masterpieces.",
            category: "workshop",
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2070&auto=format&fit=crop"
            ]),
            venue_name: "The Clay Company",
            venue_address: "Nehru Place",
            venue_city: "Delhi/NCR",
            venue_latitude: 28.5494,
            venue_longitude: 77.2538,
            start_date_time: "2024-12-05T11:00:00",
            end_date_time: "2024-12-05T14:00:00",
            price_general: 1200,
            price_vip: 0,
            price_premium: 0,
            total_seats_general: 20,
            total_seats_vip: 0,
            total_seats_premium: 0,
            available_seats_general: 15,
            available_seats_vip: 0,
            available_seats_premium: 0,
            organizer_name: "Art & Soul",
            organizer_contact: "workshops@artandsoul.com",
            status: "upcoming",
            tags: JSON.stringify(["art", "craft", "workshop", "weekend"]),
            rating_average: 4.5,
            rating_count: 45
        },
        {
            title: "Sunburn Arena ft. Martin Garrix",
            description: "The world's #1 DJ returns to India! Get ready for the biggest EDM night of the year.",
            category: "concert",
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2070&auto=format&fit=crop"
            ]),
            venue_name: "Backyard Sports Club",
            venue_address: "Gurugram",
            venue_city: "Gurugram",
            venue_latitude: 28.3954,
            venue_longitude: 77.0412,
            start_date_time: "2024-12-15T16:00:00",
            end_date_time: "2024-12-15T22:00:00",
            price_general: 2500,
            price_vip: 6000,
            price_premium: 12000,
            total_seats_general: 8000,
            total_seats_vip: 1000,
            total_seats_premium: 200,
            available_seats_general: 7500,
            available_seats_vip: 900,
            available_seats_premium: 180,
            organizer_name: "Sunburn",
            organizer_contact: "info@sunburn.in",
            status: "upcoming",
            tags: JSON.stringify(["edm", "music", "party", "nightlife"]),
            rating_average: 4.7,
            rating_count: 3200
        }
    ];

    const restaurants = [
        {
            name: "Indian Accent",
            description: "Innovative Indian cuisine that marries global ingredients and techniques with the flavours and traditions of India.",
            cuisine: JSON.stringify(["Modern Indian", "Fine Dining"]),
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
            ]),
            address: "The Lodhi, Lodhi Road",
            city: "Delhi/NCR",
            latitude: 28.5916,
            longitude: 77.2386,
            phone: "+91 11 6617 5151",
            email: "reservations.del@indianaccent.com",
            timings: JSON.stringify({ "Mon-Sun": "12:00 PM - 2:30 PM, 7:00 PM - 10:30 PM" }),
            price_range: "$$$$",
            features: JSON.stringify(["Wheelchair Accessible", "Full Bar", "Valet Parking", "Private Dining"]),
            menu: JSON.stringify([]),
            table_booking_enabled: 1,
            max_guests_per_table: 8,
            slot_duration: 150,
            rating_average: 4.9,
            rating_count: 2100,
            popular_dishes: JSON.stringify(["Blue Cheese Naan", "Pork Ribs", "Daulat Ki Chaat"])
        },
        {
            name: "Burma Burma",
            description: "Authentic Burmese cuisine in a tea room setting. Vegetarian only.",
            cuisine: JSON.stringify(["Burmese", "Asian", "Vegetarian"]),
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
            ]),
            address: "Cyber Hub, DLF Cyber City",
            city: "Gurugram",
            latitude: 28.4950,
            longitude: 77.0895,
            phone: "+91 124 437 2999",
            email: "gurgaon@burmaburma.in",
            timings: JSON.stringify({ "Mon-Sun": "12:00 PM - 3:00 PM, 7:00 PM - 11:00 PM" }),
            price_range: "$$",
            features: JSON.stringify(["Vegetarian", "No Alcohol", "Desserts"]),
            menu: JSON.stringify([]),
            table_booking_enabled: 1,
            max_guests_per_table: 10,
            slot_duration: 90,
            rating_average: 4.7,
            rating_count: 1500,
            popular_dishes: JSON.stringify(["Khao Suey", "Samosa Soup", "Tea Leaf Salad"])
        },
        {
            name: "The Big Chill Cafe",
            description: "A favorite for Italian and Continental comfort food with a retro vibe.",
            cuisine: JSON.stringify(["Italian", "Continental", "Cafe"]),
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop"
            ]),
            address: "Khan Market",
            city: "Delhi/NCR",
            latitude: 28.6001,
            longitude: 77.2270,
            phone: "+91 11 4175 7588",
            email: "contact@bigchill.com",
            timings: JSON.stringify({ "Mon-Sun": "12:00 PM - 11:30 PM" }),
            price_range: "$$",
            features: JSON.stringify(["Desserts", "Casual Dining"]),
            menu: JSON.stringify([]),
            table_booking_enabled: 0,
            max_guests_per_table: 6,
            slot_duration: 90,
            rating_average: 4.6,
            rating_count: 3500,
            popular_dishes: JSON.stringify(["Penne Vodka", "Mississippi Mud Pie", "Banoffee Pie"])
        }
    ];

    const sports = [
        {
            name: "Fitso Suncity",
            description: "Premium sports facility with temperature controlled swimming pool and badminton courts.",
            sports_type: "Swimming, Badminton",
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1974&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop"
            ]),
            address: "Sector 54",
            city: "Gurugram",
            latitude: 28.4394,
            longitude: 77.1078,
            phone: "+91 8080 8080 80",
            email: "support@fitso.com",
            facilities: JSON.stringify(["Pool", "Changing Rooms", "Lockers", "Parking"]),
            amenities: JSON.stringify(["Coaching", "Equipment Rental"]),
            opening_time: "06:00",
            closing_time: "22:00",
            rating_average: 4.5,
            rating_count: 450
        },
        {
            name: "DDA Sports Complex",
            description: "Government sports complex with tennis, squash, and cricket facilities.",
            sports_type: "Tennis, Cricket, Squash",
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop"
            ]),
            address: "Siri Fort",
            city: "Delhi/NCR",
            latitude: 28.5530,
            longitude: 77.2200,
            phone: "011 2649 6657",
            email: "ddasports@dda.org.in",
            facilities: JSON.stringify(["Tennis Courts", "Cricket Ground", "Squash Courts"]),
            amenities: JSON.stringify(["Membership", "Canteen"]),
            opening_time: "06:00",
            closing_time: "21:00",
            rating_average: 4.2,
            rating_count: 890
        }
    ];

    db.serialize(() => {
        // Clear existing data
        db.run('DELETE FROM events');
        db.run('DELETE FROM restaurants');
        db.run('DELETE FROM sports_venues');
        db.run('DELETE FROM sqlite_sequence WHERE name IN ("events", "restaurants", "sports_venues")');

        // Insert Events
        const eventStmt = db.prepare(`
            INSERT INTO events (
                title, description, category, images, venue_name, venue_address, venue_city,
                venue_latitude, venue_longitude, start_date_time, end_date_time,
                price_general, price_vip, price_premium,
                total_seats_general, total_seats_vip, total_seats_premium,
                available_seats_general, available_seats_vip, available_seats_premium,
                organizer_name, organizer_contact, status, tags, rating_average, rating_count
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        events.forEach(event => {
            eventStmt.run(
                event.title, event.description, event.category, event.images,
                event.venue_name, event.venue_address, event.venue_city,
                event.venue_latitude, event.venue_longitude,
                event.start_date_time, event.end_date_time,
                event.price_general, event.price_vip, event.price_premium,
                event.total_seats_general, event.total_seats_vip, event.total_seats_premium,
                event.available_seats_general, event.available_seats_vip, event.available_seats_premium,
                event.organizer_name, event.organizer_contact, event.status,
                event.tags, event.rating_average, event.rating_count
            );
        });
        eventStmt.finalize();
        console.log(`✅ Seeded ${events.length} events`);

        // Insert Restaurants
        const restStmt = db.prepare(`
            INSERT INTO restaurants (
                name, description, cuisine, images, address, city,
                latitude, longitude, phone, email, timings, price_range,
                features, menu, table_booking_enabled, max_guests_per_table,
                slot_duration, rating_average, rating_count, popular_dishes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        restaurants.forEach(rest => {
            restStmt.run(
                rest.name, rest.description, rest.cuisine, rest.images,
                rest.address, rest.city, rest.latitude, rest.longitude,
                rest.phone, rest.email, rest.timings, rest.price_range,
                rest.features, rest.menu, rest.table_booking_enabled,
                rest.max_guests_per_table, rest.slot_duration,
                rest.rating_average, rest.rating_count, rest.popular_dishes
            );
        });
        restStmt.finalize();
        console.log(`✅ Seeded ${restaurants.length} restaurants`);

        // Insert Sports
        const sportStmt = db.prepare(`
            INSERT INTO sports_venues (
                name, description, sports_type, images, address, city,
                latitude, longitude, phone, email, facilities, amenities,
                opening_time, closing_time, rating_average, rating_count
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        sports.forEach(sport => {
            sportStmt.run(
                sport.name, sport.description, sport.sports_type, sport.images,
                sport.address, sport.city, sport.latitude, sport.longitude,
                sport.phone, sport.email, sport.facilities, sport.amenities,
                sport.opening_time, sport.closing_time, sport.rating_average, sport.rating_count
            );
        });
        sportStmt.finalize();
        console.log(`✅ Seeded ${sports.length} sports venues`);
    });

    // Close connection after a short delay to ensure operations finish
    setTimeout(() => {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed');
            }
        });
    }, 1000);
};

seedData();
