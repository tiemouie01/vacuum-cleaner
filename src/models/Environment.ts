export interface Position {
  x: number;
  y: number;
  floor: number;
}

export class Room {
  isDirty: boolean;
  dirtAmount: number;
  cleaningTime: number;

  constructor() {
    this.isDirty = Math.random() < 0.5;
    this.dirtAmount = this.isDirty ? Math.floor(Math.random() * 10) + 1 : 0;
    this.cleaningTime = this.dirtAmount * 2; // Each dirt unit takes 2 time units to clean
  }

  clean(time: number): number {
    const cleanedDirt = Math.min(this.dirtAmount, time / 2);
    this.dirtAmount -= cleanedDirt;
    this.isDirty = this.dirtAmount > 0;
    return cleanedDirt;
  }
}

export class Environment {
  rooms: Room[][][];
  width: number;
  height: number;
  floors: number;

  constructor(width: number, height: number, floors: number) {
    this.width = width;
    this.height = height;
    this.floors = floors;
    this.rooms = Array(floors)
      .fill(null)
      .map(() =>
        Array(height)
          .fill(null)
          .map(() =>
            Array(width)
              .fill(null)
              .map(() => new Room())
          )
      );
  }

  getRoom(position: Position): Room {
    return this.rooms[position.floor][position.y][position.x];
  }

  isValidPosition(position: Position): boolean {
    return (
      position.floor >= 0 &&
      position.floor < this.floors &&
      position.y >= 0 &&
      position.y < this.height &&
      position.x >= 0 &&
      position.x < this.width
    );
  }
}
