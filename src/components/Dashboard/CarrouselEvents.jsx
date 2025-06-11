import { useEffect } from 'react';
import dash from '../../styles/dashboard.module.css'
import { ArrowLeftCircle, ArrowRightCircle, CalendarDays } from 'lucide-react';

export function CarrouselEvents({ events, currentIndex, setCurrentIndex }) {

  const findCurrentEventIndex = (events) => {
    const now = new Date(); // Obtém a data e hora atual
    const index = events.findIndex(event => {
      const start = event.dataInicio;

      const end = event.dataFim;

      return now >= start && now <= end; // Verifica se o evento está ocorrendo agora
    });

    setCurrentIndex(index > -1 ? index : 0)
  };


  useEffect(() => {
    findCurrentEventIndex(events)
  }, [events])

  const nextEvent = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevEvent = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {(events && events.length > 0) ? (
        <div className='w-full flex justify-center md:justify-between items-center p-4 md:p-8 rounded-md' style={{
          border: `3px solid ${events[currentIndex].cor ? events[currentIndex].cor : '#DDD'}`
        }}>
          <button onClick={prevEvent}>
            <ArrowLeftCircle size={32} />

          </button>
          <div className={dash["evento-info"]}>

            <CalendarDays  size={34} />
            <div className={dash["evento-texto"]}>
              <h3>
                <strong>{events[currentIndex].titulo}</strong>
              </h3>
              <p>{events[currentIndex].descricao}</p>
            </div>
          </div>

          <div className={dash["evento-datas"]}>
            <div>
              <strong>Início:</strong>
              <span>{events[currentIndex].dataInicio.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: "short",
                year: "2-digit"
              })}</span>

            </div>
            <div>
              <strong>Fim:</strong>
              <span>{events[currentIndex].dataFim.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: "short",
                year: "2-digit"
              })}</span>
            </div>
          </div>

          <button onClick={nextEvent}>
            <ArrowRightCircle size={32} />

          </button>

        </div>
      ) : (
        <div></div>
      )}

    </>

  )
}