import { Button } from "./Button";

export function Header() {
  return (
    <header className="w-full px-24 py-10 flex items-center justify-between z-30">
      <h1>Logo</h1>
      <ul className="flex gap-24">
        <li><a href="">Blog</a></li>
        <li><a href="">About Us</a></li>
        <li><a href="">Contact</a></li>
      </ul>

      <Button text="Entrar" />
    </header>
  )
}