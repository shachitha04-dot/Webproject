import { useState } from 'react';
import './SportsCard.css';

const SportsCard = ({ sports }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const {
        id,
        name,
        description,
        sportType,
        facilities = [],
        pricePerHour,
        image,
        location
    } = sports;

    return (
        <div className="sports-card glass-card">
            <div className="sports-card-image-wrapper">
                {!imageLoaded && <div className="sports-card-skeleton skeleton"></div>}
                <img
                    src={image || '/api/placeholder/400/300'}
                    alt={name}
                    className="sports-card-image"
                    onLoad={() => setImageLoaded(true)}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                />
                <div className="sports-card-overlay"></div>

                {sportType && (
                    <span className="sports-type-badge badge badge-primary">
                        {sportType}
                    </span>
                )}
            </div>

            <div className="sports-card-content">
                <h3 className="sports-card-title">{name}</h3>

                <p className="sports-card-description">{description}</p>

                {facilities.length > 0 && (
                    <div className="sports-facilities">
                        {facilities.slice(0, 3).map((facility, index) => (
                            <span key={index} className="sports-facility-tag">
                                {facility}
                            </span>
                        ))}
                        {facilities.length > 3 && (
                            <span className="sports-facility-more">
                                +{facilities.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                <div className="sports-card-details">
                    <div className="sports-detail-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M8 14s6-4.686 6-8.5C14 2.462 11.314 0 8 0S2 2.462 2 5.5C2 9.314 8 14 8 14z"
                                fill="currentColor"
                            />
                            <circle cx="8" cy="5.5" r="1.5" fill="white" />
                        </svg>
                        <span className="sports-detail-text">{location}</span>
                    </div>

                    <div className="sports-detail-item sports-price">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M11.742 1.223a.5.5 0 0 1 .06.638l-3.5 6a.5.5 0 0 1-.858-0.514l3.5-6a.5.5 0 0 1 .798-.124zm-7.484 0a.5.5 0 0 1 .798.124l3.5 6a.5.5 0 0 1-.858.514l-3.5-6a.5.5 0 0 1 .06-.638zM2 9.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="sports-detail-text">${pricePerHour}/hr</span>
                    </div>
                </div>

                <div className="sports-card-actions">
                    <a href={`/sports/${id}`} className="btn btn-primary btn-sm">
                        View Details
                    </a>
                    <button className="btn btn-outline btn-sm">
                        Book Slot
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SportsCard;
