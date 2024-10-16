import { X } from "lucide-react";
import { Input } from "./Input";
import { Button } from "./Button";
import { useState } from "react";

export function EventModal({ setIsModalOpen, date, event, setEvents }) {
  const today = new Date()
  const dataEvent = date ? date : `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const [startEvent, setStartEvent] = useState(new Date(date));
  const [endEvent, setEndEvent] = useState(new Date(date));
  const [title, setTitle] = useState(event.title);
  const [color, setColor] = useState(event.color);
  const [description, setDescription] = useState(event.description);
  console.log(event)
  function handleChangeEvent() {
    const newEvents = {
      id: Math.random(),
      title,
      startAt: new Date(startEvent),
      endAt: new Date(endEvent),
      description,
      color
    }
    newEvents.startAt.setHours(0)
    newEvents.endAt.setHours(0)
    newEvents.startAt.setDate(newEvents.startAt.getDate() + 1)
    newEvents.endAt.setDate(newEvents.endAt.getDate() + 1)
    setEvents(prev => [...prev, newEvents])
    setIsModalOpen(false)
    event = {}
  }
  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-[999]">
      <div className="relative bg-white w-1/2 flex flex-col gap-8 py-8 px-8 items-center rounded-2xl">
        <X className="absolute right-3 top-3" size={32} cursor={'pointer'} onClick={() => {
          event = {}
          setIsModalOpen(false) 
          }} />
        <p className="text-4xl">Criar evento</p>
        <div className="w-full flex flex-col gap-2">
        <label htmlFor="">Título</label>
        <Input placeholder={"Adicionar título"} value={title} setValue={setTitle} />

        </div>

        <div className="w-full flex flex-col gap-2">
        <label htmlFor="">Descrição</label>
        <textarea className="bg-[#F3F4F6] px-6 py-2" name="" id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>


        <div className="w-full flex flex-col items-center justify-center gap-10">
          <div className="w-full flex justify-center gap-10">
          <div className="flex flex-col gap-3">
            <label htmlFor="">Inicio do evento</label>
            <input type="date" name='startAt' value={dataEvent} onChange={e => setStartEvent(new Date(e.target.value))} />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="">Fim do evento</label>
            <input type="date" name="endAt" value={dataEvent} onChange={e => setEndEvent(new Date(e.target.value))} />

          </div>

          </div>

          <div>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} />
          </div>
        </div>


        <div className="w-full flex gap-4 justify-end">
          <Button text={"Salvar"} secondary onClick={handleChangeEvent} />
        </div>
      </div>
    </div>
  )
}