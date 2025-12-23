# District Frontend

A modern, premium frontend application inspired by District.in, built with React and Vite.

## Features

✨ **Modern Design**
- Premium dark theme with vibrant gradients
- Glassmorphism effects
- Smooth animations and micro-interactions
- Fully responsive design

🎯 **Core Functionality**
- Events browsing and booking
- Restaurant listings and reservations
- Sports venues and slot booking
- Advanced search with autocomplete
- User reviews and ratings

🛠️ **Tech Stack**
- React 18
- Vite (for fast development)
- Vanilla CSS with custom design system
- Fetch API for backend communication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```
VITE_API_URL=http://localhost:3000
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── common/
│   │   ├── SearchBar.jsx
│   │   └── SearchBar.css
│   ├── cards/
│   │   ├── EventCard.jsx
│   │   ├── EventCard.css
│   │   ├── RestaurantCard.jsx
│   │   ├── RestaurantCard.css
│   │   ├── SportsCard.jsx
│   │   └── SportsCard.css
│   └── modals/
├── pages/
│   ├── HomePage.jsx
│   └── HomePage.css
├── services/
│   └── api.service.js
├── assets/
│   └── images/
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Design System

The application uses a comprehensive design system with:

- **Colors**: Premium dark theme with primary (#6366f1), secondary (#f59e0b), and accent (#ec4899) colors
- **Typography**: Inter for body text, Outfit for headings
- **Spacing**: Consistent spacing scale from xs to 3xl
- **Components**: Reusable button styles, glass cards, badges, and more

## API Integration

The frontend connects to the backend API running on `localhost:3000`. API services are centralized in `src/services/api.service.js`.

### Available API Methods

- **Events**: `eventsAPI.getAll()`, `getById()`, `create()`, `update()`, `delete()`
- **Restaurants**: `restaurantsAPI.getAll()`, `getById()`, `create()`, `update()`, `delete()`
- **Sports**: `sportsAPI.getAll()`, `getById()`, `create()`, `update()`, `delete()`
- **Bookings**: `bookingsAPI.getAll()`, `getById()`, `create()`, `update()`, `cancel()`
- **Reviews**: `reviewsAPI.getByItem()`, `create()`, `update()`, `delete()`

## Customization

### Changing Colors

Edit the CSS custom properties in `src/index.css`:

```css
:root {
  --color-primary: #6366f1;
  --color-secondary: #f59e0b;
  --color-accent: #ec4899;
  /* ... */
}
```

### Adding Your Logo

Replace the logo placeholder in `src/components/layout/Header.jsx`:

```jsx
<div className="logo-icon">
  <img src="/your-logo.png" alt="Logo" />
</div>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loading for images
- Code splitting
- Optimized animations
- Minimal dependencies

## License

MIT
