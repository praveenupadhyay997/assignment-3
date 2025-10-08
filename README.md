# Flowboard - Task Management Application

## Overview
Flowboard is a modern, responsive task management application built with React, TypeScript, and Redux. It provides a Kanban-style board for organizing tasks into customizable columns with drag-and-drop functionality.

## Features

- 🎨 **Themes**: Light and dark mode support
- 🔍 **Search & Filter**: Quickly find tasks with real-time search
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **Drag & Drop**: Intuitive task management
- 💾 **Persistent Storage**: Tasks are saved in the browser's localStorage
- 🧪 **Tested**: Comprehensive test coverage for core functionality

## Tech Stack

- **Frontend**: React 18, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Styled Components
- **Testing**: Jest, React Testing Library
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd assignment-3/flowboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run all tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
flowboard/
├── src/
│   ├── components/     # Reusable UI components
│   ├── features/       # Feature modules
│   ├── store/          # Redux store configuration
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   └── main.tsx        # Application entry point
├── public/            # Static assets
└── tests/             # Test files
```

## Testing

The project includes comprehensive test coverage for all major components and features. See [TEST_STRATEGY.md](TEST_STRATEGY.md) for detailed information about the testing approach and coverage.

To run tests:
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- path/to/test/file.test.tsx
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Styled Components](https://styled-components.com/)
- [React DnD](https://react-dnd.github.io/react-dnd/)
