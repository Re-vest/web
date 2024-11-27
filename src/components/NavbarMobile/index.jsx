import { AlignEndHorizontal, Calendar, CircleDollarSign, LogOut, Shirt, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

  export function NavbarMobile() {

    const navigate = useNavigate()

    function handleExit () {
      sessionStorage.clear()
      navigate('/login')
    }

    return (
      <div className="z-[1000] fixed w-full bottom-0 h-14 bg-gradient-to-b from-[#0D35FE] to-[#5CC3FF] flex items-center" id="Navbar">
        <a href="/dashboard" className="w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white">
          <AlignEndHorizontal size={24} />
        </a>
        <a href="/estoque" className="relative w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white group">
          <Shirt size={24} />
          <span className="opacity-0 group-hover:opacity-100 absolute -top-14 bg-black rounded-md text-white p-1">Estoque</span>

        </a>
        <a href="/eventos" className="w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white">
          <Calendar size={24} />

        </a>

        {sessionStorage.PERFIL !== 'ADMINISTRADOR' ? (<></>) : (

        <a href="equipe" className="w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white">
          <UsersRound size={24} />

        </a>
        ) }


        <a href="vendas" className="w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white">
          <CircleDollarSign size={24} />
        </a>

        <a onClick={handleExit} className="w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white">
          <LogOut size={24} />
        </a>
      </div>
    )
  }