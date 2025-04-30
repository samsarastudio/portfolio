# Modern Portfolio Web Application

A sleek, modern portfolio website built with Next.js and Express.js, featuring a beautiful carousel, admin dashboard, and project management system.

## Features

- 🎨 Modern, responsive design with dark theme
- 🎮 Interactive project carousel with smooth animations
- 📱 Mobile-friendly layout
- 🔐 Secure admin dashboard
- 📊 Project management system
- 🎯 Category-based project filtering
- 🖼️ Image and video support
- ⚡ Fast performance with Next.js
- 🔄 Real-time updates

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Authentication**: JWT
- **Data Storage**: CSV (easily upgradable to database)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-web-app.git
   cd portfolio-web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   JWT_SECRET=your-secret-key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

4. Start the development servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio-web-app/
├── components/          # React components
│   ├── AdminDashboard.js
│   ├── ProjectCarousel.js
│   ├── ProjectCard.js
│   ├── Navbar.js
│   ├── Hero.js
│   ├── Skills.js
│   └── Contact.js
├── pages/              # Next.js pages
│   ├── index.js
│   └── admin.js
├── public/             # Static assets
│   ├── project-images/
│   └── project-videos/
├── backend/            # Express server
│   ├── server.js
│   └── data/
├── styles/             # Global styles
└── package.json
```

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- Add new projects
- Edit existing projects
- Delete projects
- Manage project categories
- Upload project images and videos

Default admin credentials:
- Username: admin
- Password: admin123

## Adding Projects

1. Log in to the admin dashboard
2. Click "Add New Project"
3. Fill in the project details:
   - Title
   - Category
   - Description
   - Technologies
   - Image URL
   - Video URL (optional)
4. Click "Add Project"

## Customization

### Styling
- Edit `tailwind.config.js` for theme customization
- Modify components in the `components/` directory
- Update global styles in `styles/`

### Configuration
- Update environment variables in `.env.local`
- Modify API endpoints in `backend/server.js`
- Adjust carousel settings in `components/ProjectCarousel.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@example.com or open an issue in the repository.
