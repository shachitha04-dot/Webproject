import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import EventCard from '../components/cards/EventCard';
import RestaurantCard from '../components/cards/RestaurantCard';
import SportsCard from '../components/cards/SportsCard';
import PlayPage from './PlayPage';
import StoresPage from './StoresPage';
import './HomePage.css';

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('for-you');
    const [selectedLocation, setSelectedLocation] = useState('Delhi/NCR');
    const [events, setEvents] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [sports, setSports] = useState([]);
    const [movies, setMovies] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // TODO: Replace with actual API calls
            // Simulating API calls with mock data
            setTimeout(() => {
                setEvents([
                    {
                        id: 1,
                        title: 'BAN Kafila | Masoom Sharma',
                        description: 'Live music concert with Masoom Sharma',
                        date: 'Sat, 06 Dec, 4:00 PM',
                        location: 'Dockyard Sports Club, Gurugram',
                        price: 999,
                        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
                        category: 'Music'
                    },
                    {
                        id: 2,
                        title: 'A.R. Rahman - Harmony of Hearts',
                        description: 'A.R. Rahman live concert',
                        date: 'Sat, 20 Dec, 7:00 PM',
                        location: 'Indira Gandhi Indoor Stadium, Delhi/NCR',
                        price: 999,
                        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
                        category: 'Music'
                    },
                    {
                        id: 3,
                        title: 'One Night in Toki-O',
                        description: 'Nightlife event at One Horizon Center',
                        date: 'Fri, 28 Nov, 5:00 PM',
                        location: 'One Horizon Center, Gurugram',
                        price: 1999,
                        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop',
                        category: 'Nightlife'
                    },
                    {
                        id: 4,
                        title: 'Javed Ali - Sufi Concert',
                        description: 'Sufi music concert at Dharav Utsav',
                        date: 'Fri, 21 Nov, 5:30 PM',
                        location: 'Dharav High School Ajmer Road Jaipur, Jaipur',
                        price: 999,
                        image: 'https://images.unsplash.com/photo-1501281668745-f7f57025c3b4?w=400&h=300&fit=crop',
                        category: 'Music'
                    },
                    {
                        id: 5,
                        title: 'Radhika Das India Tour 2025',
                        description: 'Spiritual music concert',
                        date: 'Fri, 21 Nov, 7:00 PM',
                        location: 'Homeland Global Park, Chandigarh',
                        price: 1999,
                        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
                        category: 'Music'
                    },
                    {
                        id: 6,
                        title: 'Kaytranada Live in Mumbai 2025',
                        description: 'Electronic music festival',
                        date: 'December 14 | 5PM - 12AM',
                        location: 'Dome SVP Stadium, Mumbai',
                        price: 1500,
                        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
                        category: 'Music'
                    }
                ]);

                setRestaurants([
                    {
                        id: 1,
                        name: 'The Italian Corner',
                        description: 'Authentic Italian cuisine in a cozy atmosphere',
                        cuisine: 'Italian',
                        rating: 4.8,
                        priceRange: '$$$',
                        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
                        location: 'Downtown'
                    },
                    {
                        id: 2,
                        name: 'Sushi Paradise',
                        description: 'Fresh sushi and Japanese delicacies',
                        cuisine: 'Japanese',
                        rating: 4.6,
                        priceRange: '$$$$',
                        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
                        location: 'Waterfront'
                    },
                    {
                        id: 3,
                        name: 'Burger Haven',
                        description: 'Gourmet burgers and craft beers',
                        cuisine: 'American',
                        rating: 4.4,
                        priceRange: '$$',
                        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
                        location: 'Midtown'
                    },
                    {
                        id: 4,
                        name: 'Spice Garden',
                        description: 'Authentic North Indian cuisine',
                        cuisine: 'Indian',
                        rating: 4.7,
                        priceRange: '$$',
                        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
                        location: 'Connaught Place'
                    },
                    {
                        id: 5,
                        name: 'Dragon Palace',
                        description: 'Chinese and Asian fusion',
                        cuisine: 'Chinese',
                        rating: 4.5,
                        priceRange: '$$$',
                        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
                        location: 'Gurugram'
                    }
                ]);

                setSports([
                    {
                        id: 1,
                        name: 'G.O.A.T India Tour 2025 | Lionel Messi',
                        description: 'Watch Lionel Messi live in action',
                        sportType: 'Football',
                        facilities: ['Stadium', 'Parking', 'Food Court'],
                        pricePerHour: 7670,
                        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
                        location: 'Arun Jaitley Stadium, Delhi/NCR'
                    },
                    {
                        id: 2,
                        name: 'Pickleball Open Tournament',
                        description: 'Pickleball tournament at District 9',
                        sportType: 'Pickleball',
                        facilities: ['Courts', 'Equipment', 'Refreshments'],
                        pricePerHour: 1999,
                        image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=400&h=300&fit=crop',
                        location: 'District 9, Noida'
                    },
                    {
                        id: 3,
                        name: 'Elite Tennis Courts',
                        description: 'Professional-grade tennis courts with coaching available',
                        sportType: 'Tennis',
                        facilities: ['Locker Rooms', 'Pro Shop', 'Coaching', 'Equipment Rental'],
                        pricePerHour: 40,
                        image: 'https://images.unsplash.com/photo-1622163643271-c832b89a4439?w=400&h=300&fit=crop',
                        location: 'Sports Complex North'
                    },
                    {
                        id: 4,
                        name: 'Splash Pool & Spa',
                        description: 'Olympic-sized pool with spa facilities',
                        sportType: 'Swimming',
                        facilities: ['Olympic Pool', 'Spa', 'Sauna', 'Cafe'],
                        pricePerHour: 25,
                        image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=400&h=300&fit=crop',
                        location: 'Westside'
                    }
                ]);

                setMovies([
                    {
                        id: 1,
                        title: 'De De Pyaar De 2',
                        rating: 'UA13+',
                        language: 'Hindi',
                        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=280&h=400&fit=crop'
                    },
                    {
                        id: 2,
                        title: 'Mastiii 4',
                        rating: 'A',
                        language: 'Hindi',
                        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=280&h=400&fit=crop'
                    },
                    {
                        id: 3,
                        title: '120 Bahadur',
                        rating: 'UA13+',
                        language: 'Hindi',
                        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=280&h=400&fit=crop'
                    },
                    {
                        id: 4,
                        title: 'Haq',
                        rating: 'UA13+',
                        language: 'Hindi',
                        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=280&h=400&fit=crop'
                    },
                    {
                        id: 5,
                        title: 'Wicked: For Good',
                        rating: 'UA16+',
                        language: 'English',
                        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=280&h=400&fit=crop'
                    },
                    {
                        id: 6,
                        title: 'Sisu: Road to Revenge',
                        rating: 'A',
                        language: 'English',
                        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=280&h=400&fit=crop'
                    }
                ]);

                setActivities([
                    {
                        id: 1,
                        title: 'F9 Go Karting',
                        date: 'Fri, 21 Nov onwards, Multiple Dates',
                        location: 'F9 Go Karting, Gurugram',
                        price: 750,
                        discount: '50% off up to ₹300',
                        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
                    },
                    {
                        id: 2,
                        title: 'The Game Palacio',
                        date: 'Fri, 21 Nov – Sun, 30 Nov, Multiple slots',
                        location: 'The Game Palacio, Delhi/NCR',
                        price: 830,
                        discount: '20% off up to ₹150',
                        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop'
                    },
                    {
                        id: 3,
                        title: 'Chokhi Dhani',
                        date: 'Fri, 21 Nov – Sun, 30 Nov, 6:00 PM',
                        location: 'Chokhi Dhani Sonipat, Haryana',
                        price: 700,
                        discount: '50% off up to ₹300',
                        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
                    },
                    {
                        id: 4,
                        title: 'ISKATE by Roseate',
                        date: 'Fri, 21 Nov – Sun, 30 Nov, Multiple slots',
                        location: 'ISKATE by Roseate, Gurugram',
                        price: 900,
                        discount: '20% off up to ₹175',
                        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop'
                    },
                    {
                        id: 5,
                        title: 'Museum of Illusions',
                        date: 'Daily, Multiple slots',
                        location: 'Museum of Illusions, Delhi/NCR',
                        price: 590,
                        discount: '20% off up to ₹175',
                        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop'
                    },
                    {
                        id: 6,
                        title: 'KidZania | Delhi NCR',
                        date: 'Fri, 21 Nov onwards, Multiple Dates',
                        location: 'KidZania Delhi NCR, Noida',
                        price: 708,
                        discount: '20% off up to ₹150',
                        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop'
                    }
                ]);

                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        console.log('Searching for:', query);
        // TODO: Implement search functionality
    };


    // Show PlayPage when Play tab is active
    if (activeTab === 'play') {
        return <PlayPage />;
    }

    // Show StoresPage when Stores tab is active
    if (activeTab === 'stores') {
        return <StoresPage />;
    }

    return (
        <div className="page">
            <Header 
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSearch={handleSearch}
            />

            <main className="main-content">

                {/* Movies Section */}
                {activeTab === 'movies' || activeTab === 'for-you' ? (
                    <section className="section horizontal-section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">Top Hindi movies near you</h2>
                            </div>
                            <div className="horizontal-scroll">
                                {loading ? (
                                    <div className="horizontal-scroll-content">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="movie-card-compact">
                                                <div className="skeleton" style={{ height: '200px', width: '140px' }}></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="horizontal-scroll-content">
                                        {movies.map((movie) => (
                                            <div key={movie.id} className="movie-card-compact">
                                                <div className="movie-card-image">
                                                    <img 
                                                        src={movie.image || 'https://via.placeholder.com/140x200'} 
                                                        alt={movie.title}
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/140x200?text=' + encodeURIComponent(movie.title);
                                                        }}
                                                    />
                                                    <div className="movie-rating-badge">{movie.rating}</div>
                                                </div>
                                                <div className="movie-card-info">
                                                    <h4 className="movie-title">{movie.title}</h4>
                                                    <span className="movie-language">{movie.language}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                ) : null}

                {/* Activities Section */}
                {activeTab === 'activities' || activeTab === 'for-you' ? (
                    <section className="section horizontal-section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">Crowd Favourite Activities</h2>
                            </div>
                            <div className="horizontal-scroll">
                                {loading ? (
                                    <div className="horizontal-scroll-content">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="activity-card-compact">
                                                <div className="skeleton" style={{ height: '180px', width: '280px' }}></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="horizontal-scroll-content">
                                        {activities.map((activity) => (
                                            <div key={activity.id} className="activity-card-compact">
                                                <div className="activity-card-image">
                                                    <img 
                                                        src={activity.image || 'https://via.placeholder.com/280x180'} 
                                                        alt={activity.title}
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/280x180?text=' + encodeURIComponent(activity.title);
                                                        }}
                                                    />
                                                    {activity.discount && (
                                                        <div className="discount-badge">{activity.discount}</div>
                                                    )}
                                                </div>
                                                <div className="activity-card-content">
                                                    <h4 className="activity-title">{activity.title}</h4>
                                                    <p className="activity-date">{activity.date}</p>
                                                    <p className="activity-location">{activity.location}</p>
                                                    <p className="activity-price">₹{activity.price} onwards</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                ) : null}

                {/* Events Section */}
                {activeTab === 'events' || activeTab === 'for-you' ? (
                    <section className="section horizontal-section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">India's Top Events</h2>
                            </div>
                            <div className="horizontal-scroll">
                                {loading ? (
                                    <div className="horizontal-scroll-content">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="event-card-compact">
                                                <div className="skeleton" style={{ height: '200px', width: '300px' }}></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="horizontal-scroll-content">
                                        {events.map((event) => (
                                            <div key={event.id} className="event-card-compact">
                                                <div className="event-card-image">
                                                    <img 
                                                        src={event.image || 'https://via.placeholder.com/300x200'} 
                                                        alt={event.title}
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(event.title);
                                                        }}
                                                    />
                                                    {event.category && (
                                                        <div className="event-category-badge">{event.category}</div>
                                                    )}
                                                </div>
                                                <div className="event-card-content">
                                                    <h4 className="event-title">{event.title}</h4>
                                                    <p className="event-date">{event.date}</p>
                                                    <p className="event-location">{event.location}</p>
                                                    <p className="event-price">₹{event.price} onwards</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                ) : null}

                {/* Restaurants Section */}
                {activeTab === 'dining' || activeTab === 'for-you' ? (
                    <section className="section horizontal-section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">Popular Restaurants</h2>
                            </div>
                            <div className="horizontal-scroll">
                                {loading ? (
                                    <div className="horizontal-scroll-content">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="restaurant-card-compact">
                                                <div className="skeleton" style={{ height: '200px', width: '280px' }}></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="horizontal-scroll-content">
                                        {restaurants.map((restaurant) => (
                                            <div key={restaurant.id} className="restaurant-card-compact">
                                                <div className="restaurant-card-image">
                                                    <img 
                                                        src={restaurant.image || 'https://via.placeholder.com/280x200'} 
                                                        alt={restaurant.name}
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/280x200?text=' + encodeURIComponent(restaurant.name);
                                                        }}
                                                    />
                                                    {restaurant.cuisine && (
                                                        <div className="restaurant-cuisine-badge">{restaurant.cuisine}</div>
                                                    )}
                                                </div>
                                                <div className="restaurant-card-content">
                                                    <h4 className="restaurant-title">{restaurant.name}</h4>
                                                    <div className="restaurant-rating">
                                                        <span className="rating-value">{restaurant.rating}</span>
                                                        <span className="rating-stars">★★★★★</span>
                                                    </div>
                                                    <p className="restaurant-location">{restaurant.location}</p>
                                                    <p className="restaurant-price-range">{restaurant.priceRange}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                ) : null}

                {/* Sports Section */}
                {activeTab === 'activities' || activeTab === 'for-you' ? (
                    <section className="section horizontal-section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">Sports Mania</h2>
                            </div>
                            <div className="horizontal-scroll">
                                {loading ? (
                                    <div className="horizontal-scroll-content">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="sports-card-compact">
                                                <div className="skeleton" style={{ height: '200px', width: '280px' }}></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="horizontal-scroll-content">
                                        {sports.map((sport) => (
                                            <div key={sport.id} className="sports-card-compact">
                                                <div className="sports-card-image">
                                                    <img 
                                                        src={sport.image || 'https://via.placeholder.com/280x200'} 
                                                        alt={sport.name}
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/280x200?text=' + encodeURIComponent(sport.name);
                                                        }}
                                                    />
                                                    {sport.sportType && (
                                                        <div className="sports-type-badge">{sport.sportType}</div>
                                                    )}
                                                </div>
                                                <div className="sports-card-content">
                                                    <h4 className="sports-title">{sport.name}</h4>
                                                    <p className="sports-location">{sport.location}</p>
                                                    <p className="sports-price">₹{sport.pricePerHour}/hr</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                ) : null}
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;
