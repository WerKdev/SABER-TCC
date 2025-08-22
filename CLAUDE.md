# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SABER (Sistema de Análise e Benefício Educacional em Relatório) is an intelligent educational platform that uses AI to analyze student performance, generate personalized reports, correct essays, and provide insights to help teachers apply targeted interventions more effectively. The system is currently transitioning from a Python/Tkinter desktop application to a web-based platform.

## Architecture

The project follows a multi-user role-based architecture with three main user types:

### Frontend Structure
- **Main Landing Pages**: `src/main/` - Public-facing pages including login, subscriptions, and support
- **Student Portal**: `src/aluno/` - Student dashboard, activities, calendar, communications, documents, and performance tracking
- **Teacher Portal**: `src/professor/` - Class management, student tracking, essay correction, reports, and administrative tools
- **Administrator Portal**: `src/administrador/` - System administration features

Each portal follows the same structure:
- `pages/` - HTML templates
- `scripts/` - JavaScript functionality 
- `styles/` - CSS stylesheets

### Backend Components
- **Chat Server**: `src/chat/` - Express.js server with Cohere AI integration for educational chatbot
- **Common Assets**: `src/common/` - Shared scripts and styles (menu, password change, exit popup)

## Development Commands

### Chat Server (AI Component)
```bash
cd src/chat
npm install
npm start          # Start production server
npm run dev        # Start with nodemon for development
```

### Main Application
The main application is currently client-side HTML/CSS/JS. Serve from the root directory:
- Open `index.html` directly in browser for basic testing
- Use a local server (like `python -m http.server` or VS Code Live Server) for full functionality

## Key Technologies

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5.3.0
- **Charts**: Chart.js for performance visualization 
- **Icons**: Bootstrap Icons, Google Material Symbols
- **Backend**: Node.js with Express
- **AI Integration**: Cohere API for educational chat
- **Package Management**: npm

## Important Files

- `index.html` - Main landing page
- `src/chat/server.js` - AI chatbot backend using Cohere
- `src/chat/static/` - Chat interface frontend
- `src/common/` - Shared components across user roles

## Environment Setup

The chat server requires environment variables:
```bash
# Create src/chat/.env
COHERE_API_KEY=your_cohere_api_key_here
PORT=3000
```

## Code Conventions

- **File Naming**: kebab-case for HTML/CSS files, camelCase for JavaScript
- **CSS**: Custom properties for theming, BEM-like naming conventions
- **JavaScript**: Modern ES6+ features, addEventListener for event handling
- **HTML**: Semantic markup, accessibility attributes included
- **Bootstrap**: Utility classes used extensively for responsive design

## User Roles & Features

### Students (`src/aluno/`)
- Dashboard with performance charts and metrics
- Activity management and submission
- Calendar integration
- Communications and announcements
- Document access
- Essay writing and feedback

### Teachers (`src/professor/`)
- Multiple class management
- Student performance analytics
- Essay correction and status tracking
- Report generation
- Attendance tracking
- Communication tools

### Common Features
- Dark/light theme toggle
- Responsive mobile design
- Profile management
- Support system integration
- Menu navigation with role-based access

## Development Notes

- The system uses Chart.js extensively for data visualization
- Theme switching is implemented across all portals
- Mobile-first responsive design approach
- No build process currently required for the main application
- AI chat component runs as separate Express server