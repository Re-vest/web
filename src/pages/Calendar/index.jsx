import { Navbar } from "../../components/Navbar";
import { ContinuousCalendar } from "../../components/ContinuousCalendar";
import { EventModal } from "../../components/EventModal";
import { useContext, useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { NavbarMobile } from "../../components/NavbarMobile";
import { UserContext } from "../../Contexts/UserContext";

export function CalendarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [eventosFuturos, setEventosFuturos] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!sessionStorage.TOKEN || sessionStorage.PERFIL === "CLIENTE") {
      navigate("/login");
    } else {
      try {
        api.get("/eventos", {}).then((response) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const allEvents = response.data.map((event) => {
            const dataInicio = new Date(event.dataInicio);
            dataInicio.setHours(0);
            dataInicio.setDate(dataInicio.getDate() + 1);

            const dataFim = new Date(event.dataFim);
            dataFim.setHours(0);
            dataFim.setDate(dataFim.getDate() + 1);

            return {
              id: event.id,
              titulo: event.titulo,
              descricao: event.descricao,
              dataInicio,
              dataFim,
              cor: event.cor,
            };
          });

          // Divide os eventos
          const futureEvents = allEvents.filter((e) => e.dataFim >= today);

          // Armazena todos os eventos
          setEvents(allEvents);
          setEventosFuturos(futureEvents);  
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [events]);

  const exampleEvent = {
    id: null,
    titulo: "",
    dataInicio: new Date(),
    dataFim: new Date(),
    descricao: "",
    cor: "#000",
  };

  const [eventOnModal, setEventOnModal] = useState({});

  function handleClickEvent(event) {
    setEventOnModal(event ? event : {});
    setIsModalOpen(true);
  }

  return (
    <div className="h-full w-full flex flex-col lg:flex-row">
      <div className="hidden md:flex">
        <Navbar />
      </div>

      <div className="flex md:hidden">
        <NavbarMobile />
      </div>

      {isModalOpen && (
        <EventModal
          setIsModalOpen={setIsModalOpen}
          event={eventOnModal}
          date={date}
          setEvents={setEvents}
          events={events}
        />
      )}

      <div className="w-full h-full flex flex-col lg:flex-row md:justify-between pt-10 pl-0 md:pl-16 md:ml-10 ">
        <div
          className="w-full md:w-60 text-center flex flex-col gap-5 overflow-y-scroll"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <h2 className="font-semibold text-2xl">Eventos</h2>
          {eventosFuturos.map((event, index) => {
            const date = `${String(event.dataInicio.getDate()).padStart(
              2,
              "0"
            )}/${String(event.dataInicio.getMonth() + 1).padStart(
              2,
              "0"
            )}/${event.dataInicio.getFullYear()}`;

            return (
              <div
                onClick={() => handleClickEvent(event)}
                key={index}
                className="px-5 py-3 border-l-4 flex gap-5 cursor-pointer"
                style={{ borderLeft: `4px solid ${event.cor}` }}
              >
                <p className="">{event.dataInicio.toLocaleDateString()}</p>
                <p className="truncate hover:text-clip">{event.titulo}</p>
              </div>
            );
          })}
        </div>
        <ContinuousCalendar
          handleClickEvent={handleClickEvent}
          setIsModalOpen={setIsModalOpen}
          setDate={setDate}
          events={events}
        />
      </div>
    </div>
  );
}
