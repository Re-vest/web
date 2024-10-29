import { Navbar } from "../../components/Navbar";
import { ContinuousCalendar } from "../../components/ContinuousCalendar";
import { EventModal } from "../../components/EventModal";
import { useEffect, useState } from "react";
import api from '../../api'

export function CalendarPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState('');
3
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/eventos', {
    }).then(response => {
      setEvents(response.data.map(event => {
        const dataInicio = new Date(event.dataInicio)
        dataInicio.setHours(0)
        dataInicio.setDate(dataInicio.getDate() + 1)

        const dataFim = new Date(event.dataFim)
        dataFim.setHours(0)
        dataFim.setDate(dataFim.getDate() + 1)
        
        return {
          id: event.id,
          titulo: event.titulo,
          descricao: event.descricao,
          dataInicio: dataInicio,
          dataFim: dataFim,
          cor: event.cor
        }
      }))
    })
  }, [])

  const exampleEvent = {
    id: null,
      titulo: '',
      dataInicio: new Date(),
      dataFim: new Date(),
      descricao: '',
      cor: '#000'
  }
  

  const [eventOnModal, setEventOnModal] = useState({})

  function handleClickEvent(event) {
    setEventOnModal(event ? event : {})
    setIsModalOpen(true)
  }

  return (
    <div className="h-full w-full flex">
      <Navbar />

      {isModalOpen &&  <EventModal setIsModalOpen={setIsModalOpen} event={eventOnModal} date={date} setEvents={setEvents} events={events} />}
    
      <div className="w-full flex justify-between pt-10 pl-10">

          <div className="w-60 flex flex-col gap-5 overflow-y-scroll">
            <h2 className="font-semibold text-2xl">Gerenciar Eventos</h2>
            {events.map((event, index) => {
              const date = `${String(event.dataInicio.getDate()).padStart(2, '0')}/${String(event.dataInicio.getMonth() + 1).padStart(2, '0')}/${event.dataInicio.getFullYear()}`
              return (
                <div onClick={() => handleClickEvent(event)} key={index} className="px-5 py-3 border-l-4 flex gap-5 cursor-pointer" style={{ borderLeft: `4px solid ${event.cor}` }}>
                  <p className="">{event.dataInicio.toLocaleDateString()}</p>
                  <p className="truncate hover:text-clip">{event.titulo}</p>
                </div>
              )
            })}
          </div>
        <ContinuousCalendar  handleClickEvent={handleClickEvent} setIsModalOpen={setIsModalOpen} setDate={setDate} events={events} />


        </div>
    </div>
  )
}