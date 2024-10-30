  import { AlignEndHorizontal, Calendar, CircleDollarSign, LogOut, Shirt, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

  export function Navbar() {

    const navigate = useNavigate()

    function handleExit () {
      sessionStorage.clear()
      navigate('/')
    }

    return (
      <div className="h-full w-14 bg-gradient-to-b from-[#0D35FE] to-[#5CC3FF] py-6 flex flex-col items-center fixed space-y-8 justify-center" id="Navbar">
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

        <a onClick={handleExit} className="w-full flex justify-center py-5 cursor-pointer hover:bg-white">
          <LogOut size={24} />
        </a>
      </div>
    )
  }