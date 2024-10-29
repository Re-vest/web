import { AlignEndHorizontal, Calendar, CircleDollarSign, Shirt, UsersRound } from "lucide-react";

export function Navbar() {
  return (
    <div className="h-full w-14 bg-gray-500 py-6 flex flex-col items-center fixed" id="Navbar">
      <a href="/dashboard" className="w-full flex justify-center py-5 cursor-pointer hover:bg-white">
        <AlignEndHorizontal size={24} />

      </a>
      <a href="/estoque" className="relative w-full flex justify-center py-5 cursor-pointer hover:bg-white group">
        <Shirt size={24} />
        <span className="opacity-0 group-hover:opacity-100 absolute -right-14 bg-black rounded-md text-white p-1">aasd</span>

      </a>
      <a href="/eventos" className="w-full flex justify-center py-5 cursor-pointer hover:bg-white">
        <Calendar size={24} />

      </a>

      <a href="equipe" className="w-full flex justify-center py-5 cursor-pointer hover:bg-white">
        <UsersRound size={24} />

      </a>

      <a href="vendas" className="w-full flex justify-center py-5 cursor-pointer hover:bg-white">
        <CircleDollarSign size={24} />

      </a>
    </div>
  )
}