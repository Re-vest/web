import { X } from "lucide-react";
import { Input } from "./Input";
import { Button } from "./Button";

export function EventModal({ setIsModalOpen, date, setEvents }) {
  console.log(date)
  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-[999]">
      <div className="relative bg-white w-1/2 flex flex-col gap-8 py-8 px-8 items-center rounded-2xl">
        <X className="absolute right-3 top-3" size={32} cursor={'pointer'} onClick={() => setIsModalOpen(false)} />
        <p className="text-4xl">Criar evento</p>
        <Input placeholder={"Adicionar título"} setValue={setEvents} />

        <input type="date" value={date}  />

        <div className="w-full flex gap-4 justify-end">
          <Button text={"Salvar"} secondary />
        </div>
      </div>
    </div>
  )
}