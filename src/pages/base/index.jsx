import { Plus } from "lucide-react";
import { Button } from "../../components/Button";
import { Navbar } from "../../components/Navbar";

export function Base() {
  return (
    <div className="h-full w-full flex">
      <Navbar />
      <Button text={"Salvar"} secondary />
    {/* Comece sua tela aqui */}
    </div>
  )
}