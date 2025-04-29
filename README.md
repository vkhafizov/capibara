# Capy-gotchi: A Capybara Tamagotchi Mobile App

A virtual pet game where you care for your own capybara! Feed, play, hydrate, and give rest to your pet to keep it happy and healthy.

![Capy-gotchi App](https://via.placeholder.com/600x300)

## Features

- 🦫 Raise your own virtual capybara pet
- 🍪 Feed your capybara to maintain hunger levels
- 🎮 Play with your pet to keep happiness high
- 💧 Give water to prevent dehydration
- 😴 Toggle sleep mode to restore energy
- 📊 Monitor your pet's vital statistics
- 💾 Auto-save game progress
- 📱 Mobile-optimized interface
- 🔔 Push notifications (optional)

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React Icons
- Local Storage API

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/capy-gotchi.git
cd capy-gotchi
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Development

### Project Structure

```
capybara-tamagotchi/
├── src/
│   ├── components/     # UI components
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React context for game state
│   ├── assets/         # Images and sounds
│   └── utils/          # Helper functions
```

### Game Mechanics

The capybara has four main stats that decrease over time:
- **Hunger**: Feed your pet to increase this stat
- **Happiness**: Play with your pet to increase this stat
- **Energy**: Let your pet sleep to recover energy
- **Hydration**: Give water to increase this stat

If any stat reaches zero, your capybara will pass away and you'll need to start over.

## Mobile Installation

### As a PWA
1. Visit the app URL on your mobile device
2. Add to home screen when prompted
3. Launch from your home screen for a full-screen experience

### Building Native Apps
This project can be wrapped with Capacitor or Cordova to create native mobile apps for iOS and Android.

## License

MIT

## Credits

Created with ❤️ by [Your Name]