class VacuumCleaner {
  constructor() {
    this.position = 0; // 0 for left room, 1 for right room
  }

  perceive(environment) {
    return {
      position: this.position,
      isDirty: environment.rooms[this.position]
    };
  }

  act(perception) {
    if (perception.isDirty) {
      return 'SUCK';
    } else if (perception.position === 0) {
      return 'MOVE_RIGHT';
    } else {
      return 'MOVE_LEFT';
    }
  }
}

class Environment {
  constructor() {
    this.rooms = [false, false]; // false means clean, true means dirty
  }

  applyAction(action, agentPosition) {
    switch (action) {
      case 'SUCK':
        this.rooms[agentPosition] = false;
        break;
      case 'MOVE_LEFT':
        return 0;
      case 'MOVE_RIGHT':
        return 1;
    }
    return agentPosition;
  }

  randomize() {
    this.rooms[0] = Math.random() < 0.3; // 30% chance of being dirty
    this.rooms[1] = Math.random() < 0.3;
  }
}

function simulate(steps) {
  const agent = new VacuumCleaner();
  const environment = new Environment();
  let totalDirt = 0;

  console.log("Simulation Start");
  console.log("----------------");

  for (let i = 0; i < steps; i++) {
    if (i % 5 === 0) { // Randomize environment every 5 steps
      environment.randomize();
    }

    const perception = agent.perceive(environment);
    const action = agent.act(perception);

    console.log(`Step ${i + 1}:`);
    console.log(`  Position: ${perception.position === 0 ? 'Left' : 'Right'}`);
    console.log(`  Environment: [${environment.rooms[0] ? 'Dirty' : 'Clean'}, ${environment.rooms[1] ? 'Dirty' : 'Clean'}]`);
    console.log(`  Action: ${action}`);

    if (action === 'SUCK') {
      totalDirt++;
    }

    agent.position = environment.applyAction(action, agent.position);

    console.log("----------------");
  }

  console.log(`Simulation End. Total dirt cleaned: ${totalDirt}`);
}

// Run the simulation for 20 steps
simulate(20);

