# Simon Game - React Version

A modern React.js implementation of the classic Simon Game - a memory game where players need to remember and reproduce sequences of colored buttons.

## Features

- 🎮 Classic Simon Game gameplay
- 🔊 Sound effects for each color button with volume control
- 📱 Fully responsive design for mobile and desktop
- 🏆 High score tracking with localStorage persistence (per difficulty)
- ⌨️ Comprehensive keyboard controls
- 🎨 Modern UI with smooth animations and visual feedback
- ♿ Full accessibility features with ARIA labels and screen reader support
- 🛡️ Error boundary for graceful error handling
- 🎯 Multiple difficulty levels (Easy, Normal, Hard)
- ⏸️ Pause/Resume functionality
- 🔄 Visual feedback for wrong answers
- 🎵 Enhanced audio experience with error handling

## Keyboard Controls

- **Enter** - Start game or restart after game over
- **Space** - Pause/Resume during game
- **R** - Reset game at any time
- **Esc** - Reset game (during active game)
- **Any key** - Start game (when not started)

## Accessibility Features

- Screen reader announcements for game state changes
- ARIA labels for all interactive elements
- Keyboard navigation support
- High contrast visual feedback
- Focus management

## How to Play

1. Press any key to start the game
2. Watch the sequence of colored buttons that light up
3. Repeat the sequence by clicking the buttons in the same order
4. Each level adds one more color to the sequence
5. If you make a mistake, the game ends and shows your score

## Technologies Used

- React.js 18+ with Hooks
- Vite for fast development and building
- CSS3 with animations and responsive design
- Local Storage for high score persistence
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AkshayS734/Simon-Game.git
   cd simon-game-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── GameButton.jsx        # Individual color button component
│   ├── GameButton.css        # Button styling with animations
│   ├── SimonGame.jsx         # Main game component
│   ├── SimonGame.css         # Game layout and styling
│   ├── SettingsPanel.jsx     # Game settings modal
│   ├── SettingsPanel.css     # Settings panel styling
│   ├── ErrorBoundary.jsx     # Error boundary component
│   └── ErrorBoundary.css     # Error boundary styling
├── hooks/
│   └── useSimonGame.js       # Custom hook for game logic
├── App.jsx                   # Root component with error boundary
├── App.css                   # App-level styles
├── index.css                 # Global styles
└── main.jsx                  # Entry point
```

## Game Logic

The game logic is encapsulated in a custom React hook (`useSimonGame`) that manages:

- Game state (level, patterns, game status)
- Sequence generation and validation
- Audio playback with error handling
- High score tracking
- Game reset functionality

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Original Version

This is a React.js conversion of the original vanilla JavaScript Simon Game. The original version can be found at: https://github.com/AkshayS734/Simon-Game

## Author

**Akshay Shukla**
- GitHub: [@AkshayS734](https://github.com/AkshayS734)

---

*Enjoy playing the Simon Game! 🎮*+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
