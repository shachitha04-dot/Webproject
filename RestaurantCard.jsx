import { useState } from 'react';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const {
        id,
        name,
        description,
        cuisine,
        rating = 4.5,
        priceRange = '$$',
        image,
        location
    } = restaurant;

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1"
            >
                <path d="M8 1l2.163 4.382L15 6.09l-3.5 3.409.827 4.817L8 12.18l-4.327 2.136.827-4.817L1 6.09l4.837-.708L8 1z" />
            </svg>
        ));
    };

    return (
        <div className="restaurant-card glass-card">
            <div className="restaurant-card-image-wrapper">
                {!imageLoaded && <div className="restaurant-card-skeleton skeleton"></div>}
                <img
                    src={image || '/api/placeholder/400/300'}
                    alt={name}
                    className="restaurant-card-image"
                    onLoad={() => setImageLoaded(true)}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                />
                <div className="restaurant-card-overlay"></div>

                {cuisine && (
                    <span className="restaurant-cuisine-badge badge badge-secondary">
                        {cuisine}
                    </span>
                )}
            </div>

            <div className="restaurant-card-content">
                <div className="restaurant-header">
                    <h3 className="restaurant-card-title">{name}</h3>
                    <span className="restaurant-price">{priceRange}</span>
                </div>

                <div className="restaurant-rating">
                    <div className="restaurant-stars">{renderStars(rating)}</div>
                    <span className="restaurant-rating-value">{rating.toFixed(1)}</span>
                </div>

                <p className="restaurant-card-description">{description}</p>

                <div className="restaurant-card-details">
                    <div className="restaurant-detail-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M8 14s6-4.686 6-8.5C14 2.462 11.314 0 8 0S2 2.462 2 5.5C2 9.314 8 14 8 14z"
                                fill="currentColor"
                            />
                            <circle cx="8" cy="5.5" r="1.5" fill="white" />
                        </svg>
                        <span className="restaurant-detail-text">{location}</span>
                    </div>
                </div>

                <div className="restaurant-card-actions">
                    <a href={`/restaurants/${id}`} className="btn btn-primary btn-sm">
                        View Menu
                    </a>
                    <button className="btn btn-outline btn-sm">
                        Reserve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
