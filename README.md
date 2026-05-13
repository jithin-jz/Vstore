# Modern Digital Products Store

A sleek, modern e-commerce platform for digital products built with React, Vite, Tailwind CSS, and Sanity CMS. Features a responsive design, category filtering, search functionality, and PWA capabilities.

## 🚀 Features

- **Modern Stack**: React 19 + Vite + Tailwind CSS v4
- **Headless CMS**: Sanity.io for product management
- **Responsive Design**: Mobile-first approach with smooth animations
- **PWA Ready**: Installable web app with offline capabilities
- **Category Filtering**: Browse products by Design, Tools, AI, and Streaming
- **Real-time Search**: Instant product search functionality
- **Smooth Scrolling**: Lenis scroll library for buttery-smooth navigation
- **Modern UI**: Inspired by Stripi design language with custom gradients

## 📁 Project Structure

```
store/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API and Sanity client
│   ├── lib/          # Utility functions
│   ├── assets/       # Images and static files
│   ├── App.jsx       # Main application component
│   ├── main.jsx      # Application entry point
│   └── index.css     # Global styles
├── studio/           # Sanity CMS studio
├── sanity/           # Sanity configuration
├── public/           # Static assets
└── dist/            # Production build
```

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity.io
- **Smooth Scrolling**: Lenis
- **PWA**: Vite PWA Plugin
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd store
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your Sanity project credentials.

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
npm run preview
```

## 📦 Sanity CMS Setup

This project uses Sanity.io as a headless CMS. To set up the Sanity studio:

1. Navigate to the studio directory:
```bash
cd studio
```

2. Install Sanity CLI (if not installed):
```bash
npm install -g @sanity/cli
```

3. Log in to Sanity:
```bash
sanity login
```

4. Start the Sanity studio:
```bash
sanity start
```

5. Access the studio at [http://localhost:3333](http://localhost:3333)

## 🎨 Design System

The project uses a custom design system inspired by Stripi:
- **Primary Color**: Electric Indigo (#533afd)
- **Typography**: Sohne font family with negative letter-spacing
- **Components**: Tight-radius pills, near-white card surfaces
- **Gradients**: Atmospheric gradient mesh backgrounds

See `DESIGN.md` for detailed design specifications.

## 📱 PWA Features

- Installable on mobile and desktop
- Offline fallback with mock data
- Service worker for caching
- Web app manifest

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is licensed under the MIT License.
