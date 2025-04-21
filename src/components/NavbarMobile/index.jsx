import { AlignEndHorizontal, Calendar, CircleDollarSign, LogOut, Shirt, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";

export function NavbarMobile() {

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  function handleExit() {
    sessionStorage.clear()
    setUser({})
    navigate('/login')
  }

  return (
    <div className="z-[1000] fixed w-full bottom-0 h-14 bg-[#0D35FE] flex items-center" id="Navbar">
      <a href="/dashboard" className="w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white text-white hover:text-black">
        <AlignEndHorizontal className="w-5" />
      </a>
      <a href="/estoque" className="relative w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white text-white hover:text-black group">
        <Shirt className="w-5" />
        <span className="opacity-0 group-hover:opacity-100 absolute -top-14 bg-black rounded-md text-white p-1">Estoque</span>
      </a>
      <a href="/eventos" className="w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white text-white hover:text-black">
        <Calendar className="w-5" />

      </a>

      {user.perfil !== 'ADMINISTRADOR' ? (<></>) : (
        <a href="equipe" className="w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white text-white hover:text-black">
          <UsersRound className="w-5" />
        </a>
      )}


      <a href="vendas" className="w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white text-white hover:text-black">
        <CircleDollarSign className="w-5" />
      </a>

      <a onClick={handleExit} className="w-full h-full flex justify-center items-center py-5 cursor-pointer hover:bg-white text-white hover:text-black">
        <LogOut className="w-5" />
      </a>
    </div>
  )
}