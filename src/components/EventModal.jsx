import { X } from "lucide-react";
import { Input } from "./Input";
import { Button } from "./Button";
import { useState } from "react";

export function EventModal({ setIsModalOpen, date, event, events, setEvents }) {
  console.log(event)
  function formatDateToString(date) {
    return`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  function formatStringToDate(string) {
    let date = new Date(string)
    date.setDate(date.getDate() + 1)
    date.setHours(0)
    return date
  }

  
  const [startEvent, setStartEvent] = useState(event.startAt ? formatDateToString(event.startAt) : formatDateToString(formatStringToDate(date)));
  const [endEvent, setEndEvent] = useState(event.endAt ? formatDateToString(event.endAt) : formatDateToString(formatStringToDate(date)));
  const [title, setTitle] = useState(event.title ? event.title : '');
  const [color, setColor] = useState(event.color ? event.color : '');
  const [description, setDescription] = useState(event.description ? event.description : '');
  
  function handleChangeEvent() {
    if(!event.id) {
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
      
      
    } else {
      const updateEvent = {
        id: event.id,
        title,
        startAt: formatStringToDate(startEvent),
        endAt: formatStringToDate(endEvent),
        description,
        color
      }

      console.log(updateEvent)

      const eventsUpdated = events.map(eventProps => {
        if (eventProps === event) {
          return updateEvent
        }
        else return eventProps
      })

      setEvents(eventsUpdated)
    }

    exit()
  }
  
  async function exit() {
    await setTitle('')
    await setDescription('')
    await setStartEvent('')
    await setEndEvent('')
    event = await {}
    console.log(title)
    await setIsModalOpen(false)
  }

  function deleteEvent() {
    setEvents(
      events.filter(ev => ev.id !== event.id)
    )
    exit()
  }

  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-[999]">
      <div className="relative bg-white w-1/2 flex flex-col gap-8 py-8 px-8 items-center rounded-2xl">
        <X className="absolute right-3 top-3" size={32} cursor={'pointer'} onClick={exit} />
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
            <input type="date" name='startAt' value={startEvent} onChange={e => setStartEvent(e.target.value)} />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="">Fim do evento</label>
            <input type="date" name="endAt" value={endEvent} onChange={e => setEndEvent(e.target.value)} />

          </div>

          </div>

          <div>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} />
          </div>
        </div>


        <div className="w-full flex gap-4 justify-end">
          {event.id && (
            <Button text={"Excluir"} onClick={deleteEvent} />

          )}
          <Button text={"Salvar"} secondary onClick={handleChangeEvent} />
        </div>
      </div>
    </div>
  )
}