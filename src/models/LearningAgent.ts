import type { Environment, Position, Room } from "./Environment";
import type { Schedule } from "./Schedule";

export class LearningAgent {
  position: Position;
  schedule: Schedule;
  dirtPredictions: Map<string, number>;
  cleaningTimePredictions: Map<string, number>;
  private previousPositions: Position[];

  constructor(environment: Environment, schedule: Schedule) {
    this.position = { x: 0, y: 0, floor: 0 };
    this.schedule = schedule;
    this.dirtPredictions = new Map();
    this.cleaningTimePredictions = new Map();
    this.previousPositions = [];

    // Initialize predictions
    for (let floor = 0; floor < environment.floors; floor++) {
      for (let y = 0; y < environment.height; y++) {
        for (let x = 0; x < environment.width; x++) {
          const key = this.positionToString({ x, y, floor });
          this.dirtPredictions.set(key, 0.5); // 50% chance of being dirty initially
          this.cleaningTimePredictions.set(key, 10); // Initial guess of 10 time units
        }
      }
    }
  }

  act(
    environment: Environment,
    currentTime: number
  ): {
    newEnvironment: Environment;
    newAgent: LearningAgent;
    dirtCleaned: number;
  } {
    let dirtCleaned = 0;
    const currentRoom = environment.getRoom(this.position);

    if (currentRoom.isDirty && !this.schedule.isRoomOccupied(this.position)) {
      // Clean the room
      dirtCleaned = currentRoom.clean(5); // Clean for 5 time units
      this.updatePredictions(this.position, currentRoom);
    } else {
      // Move to next room
      this.position = this.findNextRoom(environment);
    }

    // Update schedule
    this.schedule.updateOccupancy(currentTime);

    return { newEnvironment: environment, newAgent: this, dirtCleaned };
  }

  private findNextRoom(environment: Environment): Position {
    let bestPosition = this.position;
    let bestScore = this.evaluatePosition(this.position);

    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 0, floor: 1 },
      { x: 0, y: 0, floor: -1 }, // Stairs
    ];

    for (const dir of directions) {
      const newPos = {
        x: this.position.x + (dir.x || 0),
        y: this.position.y + (dir.y || 0),
        floor: this.position.floor + (dir.floor || 0),
      };

      if (
        environment.isValidPosition(newPos) &&
        !this.schedule.isRoomOccupied(newPos)
      ) {
        const score = this.evaluatePosition(newPos);
        if (score > bestScore) {
          bestScore = score;
          bestPosition = newPos;
        }
      }
    }

    // Update position history
    this.previousPositions.push(this.position);
    if (this.previousPositions.length > 5) {
      this.previousPositions.shift(); // Keep last 5 positions
    }

    return bestPosition;
  }

  private evaluatePosition(position: Position): number {
    const key = this.positionToString(position);
    const dirtiness = this.dirtPredictions.get(key) || 0;
    const cleaningTime = this.cleaningTimePredictions.get(key) || 10;

    // Base score is the dirt-to-cleaning-time ratio
    let score = dirtiness / cleaningTime;

    // Add penalty for recently visited positions
    const visitCount = this.previousPositions.filter(
      (pos) =>
        pos.x === position.x &&
        pos.y === position.y &&
        pos.floor === position.floor
    ).length;

    // Apply a significant penalty for revisiting positions
    score -= visitCount * 0.3;

    // Add small random noise to break ties and prevent oscillation
    score += Math.random() * 0.1;

    return score;
  }

  private updatePredictions(position: Position, room: Room) {
    const key = this.positionToString(position);
    const oldDirtPrediction = this.dirtPredictions.get(key) || 0.5;
    const oldCleaningTimePrediction =
      this.cleaningTimePredictions.get(key) || 10;

    // Update dirtiness prediction
    const newDirtPrediction =
      0.8 * oldDirtPrediction + 0.2 * (room.isDirty ? 1 : 0);
    this.dirtPredictions.set(key, newDirtPrediction);

    // Update cleaning time prediction
    const newCleaningTimePrediction =
      0.8 * oldCleaningTimePrediction + 0.2 * room.cleaningTime;
    this.cleaningTimePredictions.set(key, newCleaningTimePrediction);
  }

  private positionToString(position: Position): string {
    return `${position.floor},${position.y},${position.x}`;
  }
}
