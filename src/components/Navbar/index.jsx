import { AlignEndHorizontal, Calendar, CircleDollarSign, LogOut, Shirt, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

  export function Navbar() {

    const navigate = useNavigate()

    function handleExit () {
      sessionStorage.clear()
      navigate('/login')
    }

    return (
      <div className="h-full w-20 bg-[#0D35FE] py-6 flex flex-col items-center fixed space-y-8 justify-center rounded-br-lg rounded-tr-lg" id="Navbar">
        <a href="/dashboard" className="w-full flex justify-center py-5 cursor-pointer hover:bg-[#ffc600] text-white hover:text-black">
          <AlignEndHorizontal size={24} />

        </a>
        <a href="/estoque" className="relative w-full flex justify-center py-5 cursor-pointer hover:bg-[#ffc600] text-white hover:text-black group">
          <Shirt size={24} />
          {/* <span className="opacity-0 group-hover:opacity-100 absolute -right-14 bg-black rounded-md text-white p-1">Estoque</span> */}

        </a>
        <a href="/eventos" className="w-full flex justify-center py-5 cursor-pointer hover:bg-[#ffc600] text-white hover:text-black">
          <Calendar size={24} />

        </a>

        {sessionStorage.PERFIL !== 'ADMINISTRADOR' ? (<></>) : (

        <a href="equipe" className="w-full flex justify-center py-5 cursor-pointer hover:bg-[#ffc600] text-white hover:text-black">
          <UsersRound size={24} />

        </a>
        ) }


        <a href="vendas" className="w-full flex justify-center py-5 cursor-pointer hover:bg-[#ffc600] text-white hover:text-black">
          <CircleDollarSign size={24} />
        </a>

        <a onClick={handleExit} className="w-full flex justify-center py-5 cursor-pointer hover:bg-[#ffc600] text-white hover:text-black">
          <LogOut size={24} />
        </a>
      </div>
    )
  }