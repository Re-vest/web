import { useEffect, useState, use, useCallback } from "react";
import { CalendarDays, CloudSunRain, Sun } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Grafico } from "../../components/Dashboard/Grafico";
import { Atividade } from "../../components/Dashboard/Atividade";
import dash from "../../styles/dashboard.module.css";
import { useNavigate } from "react-router-dom";
import api from '../../api'
import { CarrouselEvents } from "../../components/Dashboard/CarrouselEvents";

export function Dashboard() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [climaPorDia, setClimaPorDia] = useState([])
  const [events, setEvents] = useState([])
  const [city, setCity] = useState('')
  const [categoriaMaisVendida, setCategoriaMaisVendida] = useState()
  const [semana, setSemana] = useState([])
  const getWeather = useCallback(async () => {

    try {
      api.get("/api").then(response => {
        response.data.results.forecast.splice(-2)
        setClimaPorDia(response.data.results.forecast)
        setCity(response.data.results.city)
        response.data.results.forecast.map(clima => {
          setSemana(prev => [...prev, clima.weekday])

        })
      })
    } catch (e) {
      console.log(e);

    }
  }, [])


  const getCategoria = useCallback(async () => {
    try {
      const response = await api.get('/produtos/categoria-mais-vendida')
      setCategoriaMaisVendida(Object.keys(response.data)[0])
    } catch (e) {
      console.log(e);
    }
  }, [])
  console.log(categoriaMaisVendida)

  function formatStringToDate(string) {
    let date = new Date(string)
    date.setDate(date.getDate() + 1)
    date.setHours(0)
    return date
  }

  const getEvents = useCallback(async () => {
    try {

      const response = await api.get("/eventos")

      let events = response.data.map(event => {
        event.dataInicio = formatStringToDate(event.dataInicio)
        event.dataFim = new formatStringToDate(event.dataFim)
        return event
      })

      setEvents(events)
    } catch (e) {
      console.log(e);

    }

  }, [])
  useEffect(() => {
    // if(!sessionStorage.TOKEN) {
    //   sessionStorage.clear()
    //   navigate('/')
    // }

    getWeather()
    getEvents()
    getCategoria()

    setIsLoading(false)

  }, [])

  const urlSvg = 'https://assets.hgbrasil.com/weather/icons/conditions/'
  const WeatherDay = ({ semana, condition, temp }) => {
    return (
      <div className="w-full border-l-2 border-[#DDD] px-3 flex flex-col gap-3 items-center">
        <p>{semana}</p>
        <img src={`${urlSvg}${condition}.svg`} alt="" />
        <p>{temp}º</p>
      </div>
    )
  }


  return (
    <div>
      <Navbar />
      <div className={dash["container"]}>
        <div className={dash["esquerdo"]}>
          <h1>Dashboard</h1>
          {events.length > 0 ?? (
            <div>asd</div>
          )}
          <CarrouselEvents events={events} />
          <div className={dash["grafico"]}>
            <Grafico semana={semana} />
          </div>
          <div className="flex flex-col items-center p-16 border-2 border-[#DDD]  rounded-lg">
            <div className="w-full flex justify-between">
              <h2>{climaPorDia.length ? climaPorDia[0].weekday : ('Carregando')}</h2>
              <p className="text-sm">{city}</p>
            </div>

            <div className="flex gap-4 items-center">
              <h2 className="text-3xl">
                {climaPorDia.length ? `${climaPorDia[0].max} º` : 'carregando'}
              </h2>

              <img src={climaPorDia.length ? `${urlSvg}${climaPorDia[0].condition}.svg` : `${urlSvg}cloud.svg`} alt="" />
            </div>

            <div className="w-full flex flex-col gap-8">
              <p className="flex gap-4"><Sun size={24} /> Clima</p>
              <div className="w-full flex justify-between">
                {
                  climaPorDia.map((day, index) =>
                    index !== 0 ? (
                      <WeatherDay key={day.id} semana={day.weekday} condition={day.condition} temp={day.max} />

                    ) : <div></div>
                  )}
              </div>
            </div>
          </div>

        </div>
        <div className={dash["direito"]}>
          <div className={dash["bem-vindo"]}><h1>Olá, {sessionStorage.NAME}</h1></div>
          <div className={dash["cards"]}>
            <div className={dash["vendas"]}>
              <p>Total de vendas na semana</p>
              <h2>R$ 477,90</h2>
              {/* <p>1,7% a mais que na última edição</p> */}
            </div>
            <div className={dash["categoria"]}>
              <p>
                Categoria de peça mais <br />
                vendida
              </p>
              <h2>{categoriaMaisVendida}</h2>
            </div>
            {/* <div className={dash["monitoramento"]}>
              <h2>
                Monitoramento <br />
                de equipe
              </h2>
              <p>Admins Ativos: 2</p>
              <p>Voluntários Ativos: 7</p>
              <p>Equipe total: 9 pessoas</p>
            </div> */}
            <Atividade />
          </div>
        </div>
      </div>
    </div>
  );
}
