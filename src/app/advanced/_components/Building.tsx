import type { Environment, Position } from "@/models/Environment";
import type { Schedule } from "@/models/Schedule";
import Room from "./Room";

interface BuildingProps {
  environment: Environment;
  agentPosition: Position;
  schedule: Schedule;
}

export default function Building({
  environment,
  agentPosition,
  schedule,
}: BuildingProps) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: environment.floors }).map((_, floor) => (
        <div key={floor} className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Floor {floor + 1}</h2>
          <div className="grid grid-cols-3 gap-2">
            {environment.rooms[floor].map((row, y) =>
              row.map((room, x) => (
                <Room
                  key={`${floor}-${y}-${x}`}
                  isDirty={room.isDirty}
                  isOccupied={schedule.isRoomOccupied({
                    floor,
                    y,
                    x,
                  })}
                  isActive={
                    agentPosition.floor === floor &&
                    agentPosition.y === y &&
                    agentPosition.x === x
                  }
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
