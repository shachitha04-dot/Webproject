import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './StoresPage.css';

const StoresPage = () => {
    const [selectedLocation, setSelectedLocation] = useState('Gurugram');
    const [activeTab, setActiveTab] = useState('stores');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        { id: 'all', label: 'All Stores', icon: '🏪' },
        { id: 'beauty-salons', label: 'Beauty & Salons', icon: '💅' },
        { id: 'footwear', label: 'Footwear', icon: '👟' },
        { id: 'apparel', label: 'Apparel', icon: '👕' },
        { id: 'accessories', label: 'Accessories', icon: '👜' },
        { id: 'jewellery', label: 'Jewellery', icon: '💍' },
        { id: 'home-gifting', label: 'Home & Gifting', icon: '🎁' }
    ];

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'apparel', label: 'Apparel' },
        { id: 'footwear', label: 'Footwear' },
        { id: 'accessories', label: 'Accessories' },
        { id: 'home-decor', label: 'Home Decor' }
    ];

    useEffect(() => {
        fetchStores();
    }, [selectedCategory, selectedFilter]);

    const fetchStores = async () => {
        try {
            setTimeout(() => {
                const allStores = [
                    // Offers You'll Love
                    {
                        id: 1,
                        name: 'Glitz Salon',
                        location: 'Sector 60, Gurgaon',
                        category: 'Salon',
                        categories: ['Salon'],
                        image: 'https://images.unsplash.com/photo-1560066984-10df0a5b9f0e?w=400&h=300&fit=crop',
                        featured: true,
                        section: 'offers'
                    },
                    {
                        id: 2,
                        name: 'mamaearth',
                        location: 'M3M Atrium 57, Gurgaon',
                        category: 'Beauty',
                        categories: ['Beauty & Salons'],
                        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
                        featured: true,
                        section: 'offers'
                    },
                    {
                        id: 3,
                        name: 'Rawls Salon',
                        location: 'Sector 57, Gurgaon',
                        category: 'Salon',
                        categories: ['Salon'],
                        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
                        featured: true,
                        section: 'offers'
                    },
                    {
                        id: 4,
                        name: 'CLINIC DERMATECH',
                        location: 'South Point Mall, Golf Course Road, Gurgaon',
                        category: 'Beauty',
                        categories: ['Beauty & Salons'],
                        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
                        featured: true,
                        section: 'offers'
                    },
                    {
                        id: 5,
                        name: 'Nailashes',
                        location: 'South Point Mall, Golf Course Road, Gurgaon',
                        category: 'Beauty',
                        categories: ['Beauty & Salons'],
                        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
                        featured: true,
                        section: 'offers'
                    },
                    // Handpicked Favourites
                    {
                        id: 6,
                        name: 'Toni & Guy',
                        location: 'Sector 59, Gurgaon',
                        category: 'Salon',
                        categories: ['Salon'],
                        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
                        featured: true,
                        section: 'handpicked'
                    },
                    {
                        id: 7,
                        name: 'Truefitt & Hill Gurugram Sector 58',
                        location: 'Ireo Grand View High Street, Sector 58, Gurgaon',
                        category: 'Salon',
                        categories: ['Salon'],
                        image: 'https://images.unsplash.com/photo-1560066984-10df0a5b9f0e?w=400&h=300&fit=crop',
                        featured: true,
                        section: 'handpicked'
                    },
                    {
                        id: 8,
                        name: 'Puma',
                        location: 'Worldmark, Sector 65, Gurgaon',
                        category: 'Footwear',
                        categories: ['Footwear', 'Apparel'],
                        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
                        featured: true,
                        section: 'handpicked'
                    },
                    {
                        id: 9,
                        name: 'Adidas',
                        location: 'South Point Mall, Golf Course Road, Gurgaon',
                        category: 'Footwear',
                        categories: ['Footwear', 'Apparel'],
                        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
                        featured: true,
                        section: 'handpicked'
                    },
                    {
                        id: 10,
                        name: 'Rare Rabbit',
                        location: 'Ardee Mall, Ardee City, Gurgaon',
                        category: 'Apparel',
                        categories: ['Apparel'],
                        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
                        featured: true,
                        section: 'handpicked'
                    },
                    // All Stores
                    {
                        id: 11,
                        name: 'Toni & Guy',
                        location: 'Sector 59, Gurgaon',
                        category: 'Salon',
                        categories: ['Salon'],
                        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
                        featured: false
                    },
                    {
                        id: 12,
                        name: 'Nicobar',
                        location: 'Ireo Grand View High Street, Sector 58, Gurgaon',
                        category: 'Apparel',
                        categories: ['Apparel', 'Jewellery'],
                        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
                        featured: false
                    },
                    {
                        id: 13,
                        name: 'Pure Home + Living',
                        location: 'Ireo Grand View High Street, Sector 58, Gurgaon',
                        category: 'Home Decor',
                        categories: ['Home Decor', 'Gifting'],
                        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
                        featured: false
                    },
                    {
                        id: 14,
                        name: 'Truefitt & Hill Gurugram Sector 58',
                        location: 'Ireo Grand View High Street, Sector 58, Gurgaon',
                        category: 'Salon',
                        categories: ['Salon'],
                        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
                        featured: false
                    },
                    {
                        id: 15,
                        name: 'Vanilla Moon',
                        location: 'Ireo Grand View High Street, Sector 58, Gurgaon',
                        category: 'Footwear',
                        categories: ['Footwear'],
                        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
                        featured: false
                    },
                    {
                        id: 16,
                        name: 'Mink Lifestyle',
                        location: 'Sector 56, Gurugram',
                        category: 'Apparel',
                        categories: ['Apparel'],
                        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
                        featured: false
                    },
                    {
                        id: 17,
                        name: 'Glitz Salon',
                        location: 'Sector 60, Gurgaon',
                        category: 'Salon',
                        categories: ['Salon'],
                        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
                        featured: false
                    },
                    {
                        id: 18,
                        name: 'Hair Masters Luxury Salon',
                        location: 'Sector 60, Gurgaon',
                        category: 'Salon',
                        categories: ['Salon'],
                        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
                        featured: false
                    },
                    {
                        id: 19,
                        name: 'LAKME SALON',
                        location: 'Sector 56, Gurgaon',
                        category: 'Salon',
                        categories: ['Salon'],
                        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
                        featured: false
                    },
                    {
                        id: 20,
                        name: 'Noi Tre Salon',
                        location: 'Sector 56, Gurgaon',
                        category: 'Salon',
                        categories: ['Salon'],
                        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
                        featured: false
                    }
                ];

                let filtered = allStores;

                if (selectedCategory !== 'all') {
                    const categoryMap = {
                        'beauty-salons': 'Beauty & Salons',
                        'footwear': 'Footwear',
                        'apparel': 'Apparel',
                        'accessories': 'Accessories',
                        'jewellery': 'Jewellery',
                        'home-gifting': 'Home & Gifting'
                    };
                    const categoryLabel = categoryMap[selectedCategory];
                    filtered = filtered.filter(store => 
                        store.categories.some(cat => 
                            cat.toLowerCase().includes(categoryLabel.toLowerCase().split(' ')[0])
                        )
                    );
                }

                if (selectedFilter !== 'all') {
                    const filterMap = {
                        'apparel': 'Apparel',
                        'footwear': 'Footwear',
                        'accessories': 'Accessories',
                        'home-decor': 'Home Decor'
                    };
                    const filterLabel = filterMap[selectedFilter];
                    filtered = filtered.filter(store => 
                        store.categories.some(cat => 
                            cat.toLowerCase().includes(filterLabel.toLowerCase())
                        )
                    );
                }

                setStores(filtered);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching stores:', error);
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        console.log('Searching for:', query);
    };

    const offersStores = stores.filter(store => store.featured && store.section === 'offers');
    const handpickedStores = stores.filter(store => store.featured && store.section === 'handpicked');
    const allStoresList = stores.filter(store => !store.featured);

    return (
        <div className="page">
            <Header 
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSearch={handleSearch}
            />

            <main className="stores-main-content">
                {/* Shop by Category Section */}
                <section className="shop-category-section">
                    <div className="container">
                        <h1 className="shop-title">Shop by category</h1>
                        <div className="store-categories">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`store-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <span className="category-icon">{category.icon}</span>
                                    <span className="category-label">{category.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* IN YOUR DISTRICT Section */}
                <section className="district-section">
                    <div className="container">
                        <h2 className="district-title">IN YOUR DISTRICT</h2>

                        {/* Offers You'll Love */}
                        {offersStores.length > 0 && (
                            <div className="featured-section">
                                <div className="featured-header">
                                    <h3 className="featured-title">Offers You'll Love</h3>
                                    <p className="featured-subtitle">Unmissable deals on top brands</p>
                                </div>
                                <div className="featured-stores">
                                    {offersStores.map((store) => (
                                        <div key={store.id} className="featured-store-card">
                                            <div className="featured-store-image">
                                                <img 
                                                    src={store.image} 
                                                    alt={store.name}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(store.name);
                                                    }}
                                                />
                                            </div>
                                            <div className="featured-store-content">
                                                <h4 className="featured-store-name">{store.name}</h4>
                                                <p className="featured-store-location">{store.location}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Handpicked Favourites */}
                        {handpickedStores.length > 0 && (
                            <div className="featured-section">
                                <div className="featured-header">
                                    <h3 className="featured-title">Handpicked Favourites</h3>
                                    <p className="featured-subtitle">The best of what's trending</p>
                                </div>
                                <div className="featured-stores">
                                    {handpickedStores.map((store) => (
                                        <div key={store.id} className="featured-store-card">
                                            <div className="featured-store-image">
                                                <img 
                                                    src={store.image} 
                                                    alt={store.name}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(store.name);
                                                    }}
                                                />
                                            </div>
                                            <div className="featured-store-content">
                                                <h4 className="featured-store-name">{store.name}</h4>
                                                <p className="featured-store-location">{store.location}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* All Stores Section */}
                <section className="all-stores-section">
                    <div className="container">
                        <div className="stores-header">
                            <h2 className="stores-title">All Stores</h2>
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
                            <div className="stores-grid">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="store-card-skeleton">
                                        <div className="skeleton" style={{ height: '200px', marginBottom: '1rem' }}></div>
                                        <div className="skeleton" style={{ height: '24px', marginBottom: '0.5rem' }}></div>
                                        <div className="skeleton" style={{ height: '20px' }}></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="stores-grid">
                                {allStoresList.map((store) => (
                                    <div key={store.id} className="store-card">
                                        <div className="store-card-image">
                                            <img 
                                                src={store.image} 
                                                alt={store.name}
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(store.name);
                                                }}
                                            />
                                        </div>
                                        <div className="store-card-content">
                                            <h3 className="store-name">{store.name}</h3>
                                            <p className="store-location">{store.location}</p>
                                            <div className="store-categories-tags">
                                                {store.categories.map((cat, index) => (
                                                    <span key={index} className="store-category-tag">{cat}</span>
                                                ))}
                                            </div>
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

export default StoresPage;

