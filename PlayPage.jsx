import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './PlayPage.css';

const PlayPage = () => {
    const [selectedLocation, setSelectedLocation] = useState('Gurugram');
    const [activeTab, setActiveTab] = useState('play');
    const [selectedSport, setSelectedSport] = useState('all');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sportsVenues, setSportsVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    const sportCategories = [
        { id: 'all', label: 'All Sports Venues', icon: '🏟️' },
        { id: 'badminton', label: 'Badminton', icon: '🏸' },
        { id: 'turf-football', label: 'Turf Football', icon: '⚽' },
        { id: 'pickleball', label: 'Pickleball', icon: '🎾' },
        { id: 'box-cricket', label: 'Box Cricket', icon: '🏏' },
        { id: 'lawn-tennis', label: 'Lawn Tennis', icon: '🎾' },
        { id: 'cricket-nets', label: 'Cricket Nets', icon: '🏏' },
        { id: 'padel', label: 'Padel', icon: '🎾' },
        { id: 'football', label: 'Football', icon: '⚽' },
        { id: 'cricket', label: 'Cricket', icon: '🏏' },
        { id: 'basketball', label: 'Basketball', icon: '🏀' },
        { id: 'table-tennis', label: 'Table Tennis', icon: '🏓' }
    ];

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'under-5km', label: 'Under 5 km' },
        { id: 'badminton', label: 'Badminton' },
        { id: 'box-cricket', label: 'Box Cricket' },
        { id: 'pickleball', label: 'Pickleball' },
        { id: 'turf-football', label: 'Turf Football' }
    ];

    useEffect(() => {
        fetchSportsVenues();
    }, [selectedSport, selectedFilter]);

    const fetchSportsVenues = async () => {
        try {
            // Simulating API call
            setTimeout(() => {
                const venues = [
                    {
                        id: 1,
                        name: 'Alpha49 Sports',
                        distance: '1.4 km',
                        location: 'Gurugram',
                        sports: ['Pickleball'],
                        image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=400&h=300&fit=crop',
                        rating: 4.5,
                        price: '₹500/hr'
                    },
                    {
                        id: 2,
                        name: 'Champions Cave Box Cricket',
                        distance: '1.4 km',
                        location: 'Gurugram',
                        sports: ['Box Cricket'],
                        image: 'https://images.unsplash.com/photo-1622163643271-c832b89a4439?w=400&h=300&fit=crop',
                        rating: 4.3,
                        price: '₹600/hr'
                    },
                    {
                        id: 3,
                        name: 'Young Leaders Pickleball Club',
                        distance: '2.1 km',
                        location: 'Gurugram',
                        sports: ['Pickleball'],
                        image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=400&h=300&fit=crop',
                        rating: 4.6,
                        price: '₹550/hr'
                    },
                    {
                        id: 4,
                        name: 'Coppa Play',
                        distance: '2.1 km',
                        location: 'Gurugram',
                        sports: ['Pickleball'],
                        image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=400&h=300&fit=crop',
                        rating: 4.4,
                        price: '₹500/hr'
                    },
                    {
                        id: 5,
                        name: 'Vana Greens | Gurgaon',
                        distance: '2.8 km',
                        location: 'Haryana',
                        sports: ['Badminton', 'Padel', 'Pickleball'],
                        image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=400&h=300&fit=crop',
                        rating: 4.7,
                        price: '₹700/hr'
                    },
                    {
                        id: 6,
                        name: 'Skyline Pickleball Courts',
                        distance: '3 km',
                        location: 'Gurugram',
                        sports: ['Pickleball'],
                        image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=400&h=300&fit=crop',
                        rating: 4.5,
                        price: '₹550/hr'
                    },
                    {
                        id: 7,
                        name: 'Hozhyo Sports and Cafe',
                        distance: '2.8 km',
                        location: 'Gurugram',
                        sports: ['Box Cricket', 'Badminton', 'Turf Football'],
                        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
                        rating: 4.6,
                        price: '₹650/hr'
                    },
                    {
                        id: 8,
                        name: 'Super Kings Academy by Push',
                        distance: '3.9 km',
                        location: 'Gurugram',
                        sports: ['Cricket Nets'],
                        image: 'https://images.unsplash.com/photo-1622163643271-c832b89a4439?w=400&h=300&fit=crop',
                        rating: 4.8,
                        price: '₹800/hr'
                    },
                    {
                        id: 9,
                        name: 'Conscient Sports | Pickleball',
                        distance: '3.3 km',
                        location: 'Gurugram',
                        sports: ['Pickleball'],
                        image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=400&h=300&fit=crop',
                        rating: 4.4,
                        price: '₹500/hr'
                    },
                    {
                        id: 10,
                        name: 'PlayAll Gurgaon 62',
                        distance: '3.2 km',
                        location: 'Gurugram',
                        sports: ['Badminton', 'Box Cricket'],
                        image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=400&h=300&fit=crop',
                        rating: 4.5,
                        price: '₹600/hr'
                    },
                    {
                        id: 11,
                        name: 'Gamebox Playgrounds',
                        distance: '3.4 km',
                        location: 'Gurugram',
                        sports: ['Box Cricket', 'Turf Football'],
                        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
                        rating: 4.3,
                        price: '₹550/hr'
                    },
                    {
                        id: 12,
                        name: 'Fooket | Sector 63A',
                        distance: '3.6 km',
                        location: 'Gurugram',
                        sports: ['Box Cricket', 'Turf Football'],
                        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
                        rating: 4.4,
                        price: '₹600/hr'
                    }
                ];

                let filtered = venues;

                if (selectedSport !== 'all') {
                    filtered = filtered.filter(venue => 
                        venue.sports.some(sport => 
                            sport.toLowerCase().replace(/\s+/g, '-') === selectedSport
                        )
                    );
                }

                if (selectedFilter === 'under-5km') {
                    filtered = filtered.filter(venue => {
                        const distance = parseFloat(venue.distance);
                        return distance < 5;
                    });
                } else if (selectedFilter !== 'all') {
                    filtered = filtered.filter(venue => 
                        venue.sports.some(sport => 
                            sport.toLowerCase().replace(/\s+/g, '-') === selectedFilter
                        )
                    );
                }

                setSportsVenues(filtered);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching sports venues:', error);
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        console.log('Searching for:', query);
    };

    return (
        <div className="page">
            <Header 
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSearch={handleSearch}
            />

            <main className="play-main-content">
                {/* Explore Sports Section */}
                <section className="explore-sports-section">
                    <div className="container">
                        <h1 className="explore-title">Explore Sports</h1>
                        <div className="sports-categories">
                            {sportCategories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`sport-category-btn ${selectedSport === category.id ? 'active' : ''}`}
                                    onClick={() => setSelectedSport(category.id)}
                                >
                                    <span className="sport-icon">{category.icon}</span>
                                    <span className="sport-label">{category.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* All Sports Venues Section */}
                <section className="all-venues-section">
                    <div className="container">
                        <div className="venues-header">
                            <h2 className="venues-title">All Sports Venues</h2>
                            <div className="filters-section">
                                <span className="filters-label">Filters</span>
                                <div className="filters">
                                    {filters.map((filter) => (
                                        <button
                                            key={filter.id}
                                            className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
                                            onClick={() => setSelectedFilter(filter.id)}
                                        >
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="venues-grid">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="venue-card-skeleton">
                                        <div className="skeleton" style={{ height: '200px', marginBottom: '1rem' }}></div>
                                        <div className="skeleton" style={{ height: '24px', marginBottom: '0.5rem' }}></div>
                                        <div className="skeleton" style={{ height: '20px' }}></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="venues-grid">
                                {sportsVenues.map((venue) => (
                                    <div key={venue.id} className="venue-card">
                                        <div className="venue-card-image">
                                            <img 
                                                src={venue.image} 
                                                alt={venue.name}
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(venue.name);
                                                }}
                                            />
                                            <div className="venue-rating">
                                                <span className="rating-value">{venue.rating}</span>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M8 1l2.163 4.382L15 6.09l-3.5 3.409.827 4.817L8 12.18l-4.327 2.136.827-4.817L1 6.09l4.837-.708L8 1z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="venue-card-content">
                                            <h3 className="venue-name">{venue.name}</h3>
                                            <div className="venue-details">
                                                <span className="venue-distance">{venue.distance}</span>
                                                <span className="venue-separator">•</span>
                                                <span className="venue-location">{venue.location}</span>
                                            </div>
                                            <div className="venue-sports">
                                                {venue.sports.map((sport, index) => (
                                                    <span key={index} className="venue-sport-tag">{sport}</span>
                                                ))}
                                            </div>
                                            <div className="venue-price">{venue.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PlayPage;

