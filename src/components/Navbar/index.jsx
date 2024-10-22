import { AlignEndHorizontal, Calendar, Shirt, UsersRound } from "lucide-react";

export function Navbar() {
  return (
    <div className="h-full w-14 bg-gray-500 py-6 flex flex-col items-center" id="Navbar">
      <div className="w-full flex justify-center py-5 cursor-pointer hover:bg-white">
        <AlignEndHorizontal size={24} />

      </div>
      <div className="w-full flex justify-center py-5 cursor-pointer hover:bg-white">
        <Shirt size={24} />

      </div>
      <div className="w-full flex justify-center py-5 cursor-pointer hover:bg-white">
        <Calendar size={24} />

      </div>

    </div>
  )
}