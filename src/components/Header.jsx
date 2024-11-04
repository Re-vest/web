import { Button } from "./Button";
import Logo from '../assets/logo.png'

export function Header() {
  return (
    <header className="w-full px-24 py-10 flex items-center justify-between z-30">
      <img src={Logo} alt="Logo escrito revest com uma roupa" className="w-20" />
      <ul className="flex gap-24">
        <li><a href="#about">Sobre nós</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>

      <a href="/login">

      <Button text="Login" />
      </a>

    </header>
  )
}