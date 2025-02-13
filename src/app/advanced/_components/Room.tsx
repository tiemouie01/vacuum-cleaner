import VacuumCleaner from "@/components/VacuumCleaner";

interface RoomProps {
  isDirty: boolean;
  isOccupied: boolean;
  isActive: boolean;
}

export default function Room({ isDirty, isOccupied, isActive }: RoomProps) {
  return (
    <div
      className={`w-16 h-16 border-2 flex items-center justify-center
          ${isActive ? "border-blue-500" : "border-gray-300"}
          ${isDirty ? "bg-brown-500" : "bg-green-200"}`}
    >
      {isActive && <VacuumCleaner />}
      {isOccupied && <div className="text-2xl">👤</div>}
    </div>
  );
}
