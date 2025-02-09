interface VacuumCleanerProps {
  position: number
}

export default function VacuumCleaner({ position }: VacuumCleanerProps) {
  return (
    <div className={`absolute ${position === 0 ? "left-1/3" : "right-1/3"} transform -translate-x-1/2`}>
      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  )
}

