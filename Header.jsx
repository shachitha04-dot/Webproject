import { useState, useEffect } from 'react';
import './Header.css';

import SearchBar from '../common/SearchBar';

const Header = ({ selectedLocation, onLocationChange, activeTab, onTabChange, onSearch }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navTabs = [
        { id: 'for-you', label: 'For you' },
        { id: 'dining', label: 'Dining' },
        { id: 'events', label: 'Events' },
        { id: 'movies', label: 'Movies' },
        { id: 'activities', label: 'Activities' },
        { id: 'play', label: 'Play' },
        { id: 'stores', label: 'Stores' }
    ];

    return (
        <>
            <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
                <div className="container">
                    <div className="header-top">
                        {/* Logo */}
                        <a href="/" className="logo">
                            <div className="logo-icon">
                                <img
                                    src="/logo.png"
                                    alt="TICPIN"
                                    className="logo-img"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        const span = document.createElement('span');
                                        span.className = 'logo-text';
                                        span.innerText = 'TICPIN';
                                        e.target.parentElement.appendChild(span);
                                    }}
                                />
                            </div>
                        </a>

                        {/* Location Selector */}
                        <div className="header-location">
                            <svg className="location-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M10 18s6-4.686 6-8.5C16 4.462 13.314 2 10 2S4 4.462 4 9.5C4 13.314 10 18 10 18z"
                                    fill="currentColor"
                                />
                                <circle cx="10" cy="9.5" r="2" fill="white" />
                            </svg>
                            <div className="location-info">
                                <select
                                    className="location-select"
                                    value={selectedLocation || 'Gurugram'}
                                    onChange={(e) => onLocationChange && onLocationChange(e.target.value)}
                                >
                                    <option value="Gurugram">Gurugram</option>
                                    <option value="Delhi/NCR">Delhi/NCR</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Pune">Pune</option>
                                </select>
                                <span className="location-state">Haryana</span>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <nav className="header-nav-tabs">
                            {navTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => onTabChange && onTabChange(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        {/* User Actions */}
                        <div className="header-user-actions">
                            <button className="header-icon-btn" aria-label="Bookings">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                                </svg>
                                <span className="icon-badge">2</span>
                            </button>

                            <button className="user-profile-btn" aria-label="User Profile">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="12" cy="9" r="3" fill="currentColor" />
                                    <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Bar Section */}
            <div className="header-search-section">
                <div className="container">
                    <div className="header-search-wrapper">
                        <SearchBar onSearch={onSearch} placeholder="Search for events, movies and restaurants" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
