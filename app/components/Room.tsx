interface RoomProps {
  isDirty: boolean
  isActive: boolean
}

export default function Room({ isDirty, isActive }: RoomProps) {
  return (
    <div
      className={`w-32 h-32 border-4 ${isActive ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}
    >
      {isDirty ? <div className="w-16 h-16 bg-brown-500 rounded-full"></div> : null}
    </div>
  )
}

