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
      color: '#000'
    }
  ]);

  // console.log(events)

  return (
    <div className="h-full w-full flex">
      <Navbar />

      {isModalOpen ? <EventModal setIsModalOpen={setIsModalOpen} date={date} events={events} setEvents={setEvents} /> : <></>}

    
      <div className="w-full flex justify-between py-10 px-10">


          <div className="w-60 flex flex-col gap-5 overflow-y-scroll">
            {events.map((event, index) => {
              const date = `${String(event.startAt.getDate()).padStart(2, '0')}/${String(event.startAt.getMonth()+1).padStart(2, '0')}/${event.startAt.getFullYear()}`
              return (
                <div key={index} className="px-5 py-3 border-l-4 flex gap-5" style={{ borderLeft: `4px solid ${event.color}` }}>
                  <p className="">{date}</p>
                  <p className="truncate hover:text-clip">{event.title}</p>
                </div>
              )
            })}
          </div>
        <ContinuousCalendar setIsModalOpen={setIsModalOpen} setDate={setDate} events={events} />


        </div>
    </div>
  )
}