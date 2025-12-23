import { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Search events, restaurants, sports..." }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search
    useEffect(() => {
        if (query.trim()) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                performSearch(query);
            }, 300);

            return () => clearTimeout(timer);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query]);

    const performSearch = async (searchQuery) => {
        try {
            // TODO: Replace with actual API call
            // Simulating search results
            const mockResults = [
                { id: 1, type: 'event', title: 'Live Music Night', category: 'Events' },
                { id: 2, type: 'restaurant', title: 'Italian Bistro', category: 'Restaurants' },
                { id: 3, type: 'sports', title: 'Tennis Courts', category: 'Sports' },
            ].filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setResults(mockResults);
            setIsOpen(mockResults.length > 0);
            setIsLoading(false);
        } catch (error) {
            console.error('Search error:', error);
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() && onSearch) {
            onSearch(query);
            setIsOpen(false);
        }
    };

    const handleResultClick = (result) => {
        setQuery(result.title);
        setIsOpen(false);
        // Navigate to result
        window.location.href = `/${result.type}/${result.id}`;
    };

    return (
        <div className="search-bar" ref={searchRef}>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-input-wrapper">
                    <svg
                        className="search-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <input
                        type="text"
                        className="search-input"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query && setIsOpen(true)}
                    />

                    {query && (
                        <button
                            type="button"
                            className="search-clear"
                            onClick={() => {
                                setQuery('');
                                setResults([]);
                                setIsOpen(false);
                            }}
                            aria-label="Clear search"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M12 4L4 12M4 4l8 8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    )}

                    {isLoading && (
                        <div className="search-loader">
                            <svg className="spinner" width="20" height="20" viewBox="0 0 50 50">
                                <circle
                                    cx="25"
                                    cy="25"
                                    r="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeDasharray="80"
                                    strokeDashoffset="60"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                <button type="submit" className="search-submit">
                    Search
                </button>
            </form>

            {/* Search Results Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="search-results">
                    <div className="results-header">
                        <span className="results-count">{results.length} results found</span>
                    </div>
                    <ul className="results-list">
                        {results.map((result) => (
                            <li key={result.id} className="result-item">
                                <button
                                    className="result-button"
                                    onClick={() => handleResultClick(result)}
                                >
                                    <div className="result-content">
                                        <span className="result-title">{result.title}</span>
                                        <span className="result-category">{result.category}</span>
                                    </div>
                                    <svg
                                        className="result-arrow"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                    >
                                        <path
                                            d="M6 3l5 5-5 5"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
