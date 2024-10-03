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
      endAt: new Date(2024, 0, 5)
    },
    {
      id: Math.random(),
      title: 'Bazar 2',
      startAt: new Date(2024, 0, 1),
      endAt: new Date(2024, 0, 5)
    }
  ]);

  return (
    <div className="h-full w-full flex">
      <Navbar />

      {isModalOpen ? <EventModal setIsModalOpen={setIsModalOpen} date={date} /> : <></>}

    
      <div className="w-full flex justify-between gap-5 py-10 px-10">


          <div className="flex flex-col gap-5">
            {events.map((event, index) => {
              const date = `${String(event.startAt.getDate()).padStart(2, '0')}/${String(event.startAt.getMonth()+1).padStart(2, '0')}/${event.startAt.getFullYear()}`
              return (
                <div key={index} className="px-5 py-3 border-l-4 flex gap-5">
                  <p className="">{date}</p>
                  <p>{event.title}</p>
                </div>
              )
            })}
          </div>
        <ContinuousCalendar setIsModalOpen={setIsModalOpen} setDate={setDate} />


        </div>
    </div>
  )
}