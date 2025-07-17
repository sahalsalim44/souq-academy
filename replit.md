# SOUQ Academy - IT Training Institute Platform

## Overview

SOUQ Academy is a comprehensive IT training institute web application that showcases courses, manages enrollments, and provides an admin dashboard. The application is built with a modern full-stack architecture using React for the frontend, Express.js for the backend, and PostgreSQL with Drizzle ORM for data management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **API Design**: RESTful API endpoints
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement with Vite middleware integration

### Database Schema
The application uses five main data tables:
- `users`: Admin authentication (username, password)
- `enrollments`: Course enrollment data (name, phone, course)
- `brochure_downloads`: Brochure download requests (name, email, phone)
- `hire_requests`: Company hiring requests (company details, job requirements)
- `testimonials`: Student testimonials (name, position, testimonial)
- `contact_messages`: General contact form submissions

## Key Components

### Public-Facing Features
- **Home Page**: Multi-section landing page with hero, courses, about, testimonials, and contact
- **Course Catalog**: Three main courses (Java Fullstack, Python Fullstack, Digital Marketing)
- **Enrollment System**: Course-specific enrollment with phone validation
- **Brochure Downloads**: Lead generation through brochure requests
- **Testimonials**: Dynamic testimonial display with star ratings
- **Contact Forms**: Multiple contact points (general contact, hiring requests)

### Admin Dashboard
- **Authentication**: Simple username/password login system
- **Data Management**: View and manage all form submissions
- **Testimonial Management**: Add and delete testimonials
- **Analytics**: View enrollment and engagement metrics

### UI Components
- **Modals**: Course details, enrollment forms, brochure downloads
- **Cards**: Course cards, testimonial cards with consistent styling
- **Navigation**: Fixed header with smooth scrolling, mobile-responsive menu
- **Forms**: Consistent form styling with validation feedback

## Data Flow

1. **User Interaction**: Users interact with course cards, enrollment buttons, and contact forms
2. **Form Submission**: Forms are validated client-side using Zod schemas
3. **API Requests**: TanStack Query manages API calls to Express endpoints
4. **Database Operations**: Drizzle ORM handles database interactions
5. **Response Handling**: Success/error feedback via toast notifications
6. **Admin Access**: Administrators can view all submissions through the admin dashboard

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive component library for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **Lucide Icons**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component system built on Radix UI

### Backend Services
- **Neon Database**: PostgreSQL database hosting (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database operations with schema validation
- **Express Middleware**: JSON parsing, URL encoding, error handling

### Development Tools
- **Vite**: Build tool with HMR and TypeScript support
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reloading**: Automatic refresh for both frontend and backend changes
- **Environment Variables**: DATABASE_URL for PostgreSQL connection

### Production Build
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Static Assets**: Served through Express static middleware
- **Database**: Requires PostgreSQL instance with connection string

### Key Configuration Files
- **drizzle.config.ts**: Database schema and migration configuration
- **vite.config.ts**: Frontend build configuration with path aliases
- **package.json**: Scripts for development, build, and deployment
- **tsconfig.json**: TypeScript configuration with path mapping

The application follows a monorepo structure with shared schema definitions, enabling type safety across frontend and backend while maintaining clear separation of concerns.