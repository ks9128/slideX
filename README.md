# SlideX - AI-Powered Presentation Generator

**A modern web application for creating beautiful presentations and slideshows using AI**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Installation](#️-installation--setup) • [API Documentation](#-api-documentation--testing) • [Contributing](#-contributing)

---

## Overview

SlideX is a modern web application for creating beautiful presentations and slideshows. Built with React 19, TypeScript, and Vite, it provides a seamless experience for creating, editing, and managing presentations using the power of AI.

[![SlideX Demo](https://img.youtube.com/vi/xgTlJS_-94A/maxresdefault.jpg)](https://youtu.be/xgTlJS_-94A)

## Features

### AI-Powered Generation

- **Smart Presentation Creation**: Generate complete presentations from simple topic prompts
- **Outline Generation**: AI creates structured slide outlines with relevant content
- **Design Automation**: Automatically apply beautiful templates and styling

### Design & Customization

- **Multiple Templates**: Choose from various design styles and color schemes
- **Visual Editor**: Rich editing experience for slide content
- **Export Options**: Download presentations as PowerPoint files

### User Management

- **Secure Authentication**: Protected by Clerk authentication
- **Cloud Storage**: Save and access presentations from anywhere
- **Credit System**: Freemium model with paid plans for unlimited access

### Responsive Experience

- **Cross-Device Compatibility**: Works flawlessly on desktop, tablet, and mobile
- **Modern UI/UX**: Clean and intuitive interface built with Radix UI and Tailwind CSS

## Tech Stack

| Category             | Technology                 |
| -------------------- | -------------------------- |
| **Frontend**         | React 19, TypeScript, Vite |
| **Styling**          | Tailwind CSS, Radix UI     |
| **Routing**          | React Router v7            |
| **Authentication**   | Clerk                      |
| **Backend**          | Firebase (Firestore)       |
| **AI Engine**        | Google Gemini AI           |
| **State Management** | React Context API          |
| **Form Handling**    | React Hook Form, Zod       |

## Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### 1. Clone the Repository

```bash
git clone <repository-url>
cd slidex
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

### 4. Start the Application

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## API Documentation & Testing

SlideX uses Firebase as its backend service. The application interacts with Firebase APIs for:

### Authentication

- User registration and login
- Session management with Clerk
- Secure access to user resources

### Data Management

- `projects` collection: Store presentation data
- `users` collection: Manage user profiles and credits
- Real-time data synchronization

### AI Integration

- Google Gemini API for content generation
- Live streaming for real-time slide creation
- Template-based design generation

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style and structure
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Issues & Support

- **Bug Reports**: [GitHub Issues](https://github.com/ks9128/slidex/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/ks9128/slidex/discussions)

## Contact

- **GitHub**: [@ks9128](https://github.com/ks9128)
- **LinkedIn**: [Khalid Saifullah](https://www.linkedin.com/in/khalidsaifullah-ks/)
- **Project Link**: [SlideX Repository](https://github.com/ks9128/slidex)

---

**If you found this project helpful, please give it a star on GitHub!**

Made with ❤️ by Khalid Saifullah
