import { Navbar } from "../../components/Navbar";
import { ContinuousCalendar } from "../../components/ContinuousCalendar";
import { EventModal } from "../../components/EventModal";
import { useState } from "react";

export function CalendarPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState('');

  const [events, setEvents] = useState([
    {
      id: Math.random(),
      title: 'Bazar',
      startAt: new Date(2024, 0, 1),
      endAt: new Date(2024, 0, 5),
      description: 'Dia de bazar',
      color: '#ffd900'
    }
  ]);

  const [eventOnModal, setEventOnModal] = useState({})

  function handleClickEvent(event) {
    setEventOnModal(event ? event : {})
    setIsModalOpen(true)
  }

  return (
    <div className="h-full w-full flex">
      <Navbar />

      {isModalOpen ? <EventModal setIsModalOpen={setIsModalOpen} event={eventOnModal} date={date} setEvents={setEvents} /> : <></>}
    
      <div className="w-full flex justify-between pt-10 pl-10">

          <div className="w-60 flex flex-col gap-5 overflow-y-scroll">
            <h2 className="font-semibold text-2xl">Gerenciar Eventos</h2>
            {events.map((event, index) => {
              const date = `${String(event.startAt.getDate()).padStart(2, '0')}/${String(event.startAt.getMonth() + 1).padStart(2, '0')}/${event.startAt.getFullYear()}`
              return (
                <div onClick={() => handleClickEvent(event)} key={index} className="px-5 py-3 border-l-4 flex gap-5 cursor-pointer" style={{ borderLeft: `4px solid ${event.color}` }}>
                  <p className="">{date}</p>
                  <p className="truncate hover:text-clip">{event.title}</p>
                </div>
              )
            })}
          </div>
        <ContinuousCalendar handleClickEvent={handleClickEvent} setIsModalOpen={setIsModalOpen} setDate={setDate} events={events} />


        </div>
    </div>
  )
}