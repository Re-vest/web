import { Button } from "./Button";

export function Header() {
  return (
    <header className="w-full px-24 py-10 flex items-center justify-between z-30">
      <h1>Logo</h1>
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