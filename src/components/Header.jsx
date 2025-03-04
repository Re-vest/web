import { Button } from "./Button";
import Logo from '../assets/logo.png'

export function Header() {
  return (
    <header className="w-full lg:px-24 px-15 lg:py-10 py-5 flex items-center justify-between lg:p-0 p-5 z-30">
              <img src={Logo} alt="Logo escrito revest com uma roupa" className="w-14 lg:w-20" />
              <ul className="gap-24 sm:gap-15 hidden md:flex">
                <li><a href="#about">Sobre nós</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
        
              <a href="/login">
        
              <Button text="Login" />

              </a>
        
            </header>
  )
}