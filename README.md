# SlideX - Presentation Creation Platform

SlideX is a modern web application for creating beautiful presentations and slideshows. Built with React 19, TypeScript, and Vite, it provides a seamless experience for creating, editing, and managing presentations.

## Features

- **Modern UI/UX**: Clean and intuitive interface built with Radix UI and Tailwind CSS
- **Presentation Management**: Create, edit, and organize your presentations
- **Outline Creation**: Structured approach to building presentation outlines
- **Visual Editor**: Rich editing experience for slide content
- **User Authentication**: Secure authentication powered by Clerk
- **Cloud Storage**: Firebase integration for saving and syncing your work
- **Responsive Design**: Works across desktop and mobile devices

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS with Radix UI components
- **Routing**: React Router v7
- **Authentication**: Clerk
- **Backend**: Firebase (Firestore for data storage)
- **UI Components**: Radix UI, Lucide React Icons
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Build for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

## Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable UI components
│   ├── custom/       # Application-specific components
│   └── ui/           # Generic UI components
├── config/           # Configuration files (Firebase)
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── workspace/        # Main application views
│   ├── pricing/      # Pricing page
│   └── project/      # Project-related views
│       ├── outline/  # Presentation outline editor
│       └── editor/   # Slide editor
├── App.tsx           # Main application component
└── main.tsx          # Entry point
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production-ready application
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the built application locally

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
