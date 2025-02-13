import type { Environment, Position } from "./Environment";

export class Schedule {
  occupiedRooms: Set<string>;

  constructor(environment: Environment) {
    this.occupiedRooms = new Set();
    this.generateRandomSchedule(environment);
  }

  generateRandomSchedule(environment: Environment) {
    for (let floor = 0; floor < environment.floors; floor++) {
      for (let y = 0; y < environment.height; y++) {
        for (let x = 0; x < environment.width; x++) {
          if (Math.random() < 0.2) {
            // 20% chance a room is occupied
            this.occupiedRooms.add(this.positionToString({ x, y, floor }));
          }
        }
      }
    }
  }

  isRoomOccupied(position: Position): boolean {
    return this.occupiedRooms.has(this.positionToString(position));
  }

  private positionToString(position: Position): string {
    return `${position.floor},${position.y},${position.x}`;
  }

  updateOccupancy(time: number) {
    // Simulate changes in room occupancy over time
    if (time % 10 === 0) {
      // Every 10 time units
      this.occupiedRooms.clear();
      // Randomly occupy some rooms
      // This is a simplification; in a real scenario, you'd use a more sophisticated scheduling system
      for (let i = 0; i < 5; i++) {
        const floor = Math.floor(Math.random() * 2);
        const y = Math.floor(Math.random() * 3);
        const x = Math.floor(Math.random() * 3);
        this.occupiedRooms.add(this.positionToString({ floor, y, x }));
      }
    }
  }
}
