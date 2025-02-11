import VacuumCleaner from "./VacuumCleaner";
import { cn } from "@/lib/utils";

interface RoomProps {
  isDirty: boolean;
  isActive: boolean;
}

export default function Room({ isDirty, isActive }: RoomProps) {
  return (
    <div
      className={cn(
        "w-32 h-32 border-4",
        isActive ? "border-blue-500" : "border-gray-300",
        isDirty ? "bg-brown-500" : "bg-gray-100",
        "flex items-center justify-center"
      )}
    >
      {isActive ? <VacuumCleaner /> : null}
    </div>
  );
}
