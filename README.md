# Intelligent Vacuum Cleaner Simulation

A Next.js-based simulation of an intelligent vacuum cleaner agent, demonstrating both basic and advanced AI cleaning behaviors. This project showcases different levels of complexity in autonomous agent decision-making and environment interaction.

## Features

### Basic Version (Home Page)

- Simple 2-room environment simulation
- Basic reflex agent behavior:
  - Cleans when room is dirty
  - Moves between rooms in a fixed pattern
- Room states:
  - Clean/Dirty visualization
  - Random dirt generation every 5 steps
- Real-time statistics:
  - Step counter
  - Current action display
  - Total dirt cleaned counter
- Interactive controls:
  - Start/Stop simulation
  - Step-by-step execution
  - Reset functionality

### Advanced Version (/advanced)

- Multi-floor building simulation (2 floors, 3x3 rooms each)
- Sophisticated learning agent with:
  - Dirt prediction capabilities
  - Cleaning time optimization
  - Adaptive movement patterns
- Dynamic environment features:
  - Variable dirt levels per room
  - Room occupancy scheduling
  - Multiple floors navigation
- Enhanced visualization:
  - Building layout display
  - Agent position tracking
  - Room occupancy indicators
- Detailed performance metrics:
  - Time tracking
  - Total dirt cleaned
  - Current position coordinates

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/tiemouie01/vacuum-cleaner](https://github.com/tiemouie01/vacuum-cleaner)
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Navigation

- Use the navigation menu at the top to switch between Basic and Advanced simulations
- Basic simulation: [http://localhost:3000/](http://localhost:3000/)
- Advanced simulation: [http://localhost:3000/advanced](http://localhost:3000/advanced)

### Controls

Both versions feature similar control mechanisms:

- **Start/Stop**: Toggle the automatic simulation
- **Step**: Manually advance the simulation by one step
- **Reset**: Return the environment to its initial state

## Technical Details

### Technologies Used

- Next.js 14
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- shadcn/ui

### Project Structure

- `src/app/`: Main application pages and routing
- `src/components/`: Reusable React components
- `src/models/`: Core simulation logic and classes
- `src/lib/`: Utility functions and helpers

### Key Components

- `Environment`: Manages the simulation space and room states
- `LearningAgent`: Implements the intelligent cleaning algorithm
- `Schedule`: Handles room occupancy and timing
- `Building`: Renders the multi-floor visualization
