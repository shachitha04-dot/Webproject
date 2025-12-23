import { useState } from 'react';
import './EventCard.css';

const EventCard = ({ event }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const {
        id,
        title,
        description,
        date,
        location,
        price,
        image,
        category
    } = event;

    const formatDate = (dateString) => {
        const eventDate = new Date(dateString);
        const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
        const day = eventDate.getDate();
        return { month, day };
    };

    const formattedDate = formatDate(date);

    return (
        <div className="event-card glass-card">
            <div className="event-card-image-wrapper">
                {!imageLoaded && <div className="event-card-skeleton skeleton"></div>}
                <img
                    src={image || '/api/placeholder/400/300'}
                    alt={title}
                    className="event-card-image"
                    onLoad={() => setImageLoaded(true)}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                />
                <div className="event-card-overlay"></div>

                {/* Date Badge */}
                <div className="event-date-badge">
                    <span className="event-date-month">{formattedDate.month}</span>
                    <span className="event-date-day">{formattedDate.day}</span>
                </div>

                {/* Category Badge */}
                {category && (
                    <span className="event-category-badge badge badge-primary">
                        {category}
                    </span>
                )}
            </div>

            <div className="event-card-content">
                <h3 className="event-card-title">{title}</h3>

                <p className="event-card-description">{description}</p>

                <div className="event-card-details">
                    <div className="event-detail-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M8 14s6-4.686 6-8.5C14 2.462 11.314 0 8 0S2 2.462 2 5.5C2 9.314 8 14 8 14z"
                                fill="currentColor"
                            />
                            <circle cx="8" cy="5.5" r="1.5" fill="white" />
                        </svg>
                        <span className="event-detail-text">{location}</span>
                    </div>

                    <div className="event-detail-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M11.742 1.223a.5.5 0 0 1 .06.638l-3.5 6a.5.5 0 0 1-.858-0.514l3.5-6a.5.5 0 0 1 .798-.124zm-7.484 0a.5.5 0 0 1 .798.124l3.5 6a.5.5 0 0 1-.858.514l-3.5-6a.5.5 0 0 1 .06-.638zM2 9.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="event-detail-text">${price}</span>
                    </div>
                </div>

                <div className="event-card-actions">
                    <a href={`/events/${id}`} className="btn btn-primary btn-sm event-btn-details">
                        View Details
                    </a>
                    <button className="btn btn-outline btn-sm event-btn-book">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
