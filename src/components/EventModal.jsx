import { X } from "lucide-react";
import { Input } from "./Input";
import { Button } from "./Button";
import { useContext, useState } from "react";
import api from '../api'
import { UserContext } from '../Contexts/UserContext'

export function EventModal({ setIsModalOpen, date, event, events, setEvents }) {

  const { user } = useContext(UserContext)
  function formatDateToString(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  function formatStringToDate(string) {
    let date = new Date(string)
    date.setDate(date.getDate() + 1)
    date.setHours(0)
    return date
  }

  const [startEvent, setStartEvent] = useState(event.dataInicio ? formatDateToString(event.dataInicio) : date);
  const [endEvent, setEndEvent] = useState(event.dataFim ? formatDateToString(event.dataFim) : date);
  const [titulo, setTitulo] = useState(event.titulo ? event.titulo : '');
  const [cor, setCor] = useState(event.cor ? event.cor : '#DDD');
  const [descricao, setDescricao] = useState(event.descricao ? event.descricao : '');


  async function handleChangeEvent() {
    if (!event.id) {

      try {
        const response = await api.post(`/eventos?idUsuario=${sessionStorage.ID_USER}`,
          {
            titulo,
            descricao,
            cor,
            dataInicio: startEvent,
            dataFim: endEvent
          }
        )
  
        const dataInicio = new Date(response.data.dataInicio)
        dataInicio.setHours(0)
        dataInicio.setDate(dataInicio.getDate() + 1)
  
        const dataFim = new Date(response.data.dataFim)
        dataFim.setHours(0)
        dataFim.setDate(dataFim.getDate() + 1)
  
        const newEvents = {
          id: response.data.id,
          titulo: response.data.titulo,
          dataInicio: dataInicio,
          dataFim: dataFim,
          descricao: response.data.descricao,
          cor: response.data.cor
        }
  
        setEvents(prev => [...prev, newEvents])
        swal("Sucesso", "Evento criado com sucesso", "success", {
          timer: 1000,
          button: {
            visible: false,
          },
        });

      } catch (e) {
        console.log(e);
        
      }



    } else {

      const response = await api.put(`/eventos/${event.id}?idUsuario=${sessionStorage.ID_USER}`, {
        titulo,
        descricao,
        dataInicio: startEvent,
        dataFim: endEvent,
        cor
      })

      const dataInicio = new Date(response.data.dataInicio)
      dataInicio.setHours(0)
      dataInicio.setDate(dataInicio.getDate() + 1)

      const dataFim = new Date(response.data.dataFim)
      dataFim.setHours(0)
      dataFim.setDate(dataFim.getDate() + 1)

      const updateEvent = {
        id: response.data.id,
        titulo: response.data.titulo,
        dataInicio: dataInicio,
        dataFim: dataFim,
        descricao: response.data.descricao,
        cor: response.data.cor
      }

      const eventsUpdated = events.map(eventProps => {
        if (eventProps === event) {
          return updateEvent
        }
        else return eventProps
      })

      setEvents(eventsUpdated)
      swal("Sucesso", "Evento atualizado com sucesso", "success", {
        timer: 1000,
        button: {
          visible: false,
        },
    })}

    exit()
  }

  async function exit() {
    await setIsModalOpen(false)
  }

  async function deleteEvent() {
    await api.delete(`/eventos/${event.id}?idUsuario=${sessionStorage.ID_USER}`)

    setEvents(
      events.filter(ev => ev.id !== event.id)
    )
    swal("Sucesso", "Evento excluído com sucesso", "success", {
      timer: 1000,
      button: {
        visible: false,
      }}) ,
    exit()
  }

  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-[1000]">
      <div className="relative bg-white w-11/12 md:w-1/2 flex flex-col gap-8 py-8 px-8 items-center rounded-2xl">
        <X className="absolute right-3 top-3" size={32} cursor={'pointer'} onClick={exit} />
        <p className="text-4xl">Criar evento</p>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Título</label>
          <Input placeholder={"Adicionar título"} value={titulo} onChange={setTitulo} />

        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Descrição</label>
          <textarea className="bg-[#F3F4F6] px-6 py-2" name="" id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)}></textarea>
        </div>


        <div className="w-full flex flex-col items-center justify-center gap-10">
          <div className="w-full flex justify-center gap-10">
            <div className="flex flex-col gap-3">
              <label htmlFor="">Inicio do evento</label>
              <input type="date" name='dataInicio' value={startEvent} onChange={e => setStartEvent(e.target.value)} />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="">Fim do evento</label>
              <input type="date" name="dataFim" value={endEvent} onChange={e => setEndEvent(e.target.value)} />

            </div>

          </div>

          <div>
            <input type="color" value={cor} onChange={e => setCor(e.target.value)} />
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