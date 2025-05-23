import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Grafico } from "../../components/Dashboard/Grafico";
import dash from "../../styles/dashboard.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { CarrouselEvents } from "../../components/Dashboard/CarrouselEvents";
import { AtividadesRecentes } from "../../components/Voluntarios/AtividadesRecentes";
import { NavbarMobile } from "../../components/NavbarMobile";
import { CardDash } from "../../components/Dashboard/CardDash";
import { ShoppingBasket } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import { Shirt } from "lucide-react";
import { Bell } from "lucide-react";
import DashCategoria from "../../components/Dashboard/DashCategoria";

export function Dashboard() {
  const navigate = useNavigate();
  const [climaPorDia, setClimaPorDia] = useState([]);
  const [events, setEvents] = useState([]);
  const [categoriaMaisVendida, setCategoriaMaisVendida] = useState();
  const [totalArrecadado, setTotalArrecadado] = useState(0.0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [atividades, setAtividade] = useState([]);
  const [mostrarAtividades, setMostrarAtividades] = useState(false);
  const [totalVendido, setTotalVendido] = useState(0);
  const [totalVendidoEvento, setTotalVendidoEvento] = useState(0);
  const [valorTotalEvento, setValorTotalEvento] = useState(0.0);
  const [ticketMedio, setTicketMedio] = useState(0.0);

  const getQuantidadeVendaDia = async () => {

    const response = await api.get(`vendas/quantidade-vendas-dia?eventoId=${events[currentIndex].id}`)

    if (response.status === 200) {
      setTotalVendido(response.data)
    } else {
      setTotalVendido(0)
    }
  }

  const getTicketMedio = async () => {

    try {

      const response = await api.get(`vendas/ticket-medio-evento?eventoId=${events[currentIndex].id}`)

      if (response.status === 200) {
        setTicketMedio(response.data.toFixed(2))
      } else {
        setTotalVendido(0)
      }
    } catch (e) {
      setTicketMedio(0)
    }

  }

  const getQuantidadeVendaEvento = async () => {

    const response = await api.get(`vendas/quantidade-vendas-evento?eventoId=${events[currentIndex].id}`)

    if (response.status === 200) {
      setTotalVendidoEvento(response.data)
    } else {
      setTotalVendidoEvento(0)
    }
  }

  const getValorVendaDia = async () => {

    const response = await api.get(`vendas/valor-vendas-dia?eventoId=${events[currentIndex].id}`)

    if (response.status === 200) {
      setTotalArrecadado(response.data)
    } else {

      setTotalArrecadado(0.0)
    }
  }

  const getValorVendaNoEvento = async () => {

    const response = await api.get(`vendas/valor-vendas-evento?eventoId=${events[currentIndex].id}`)

    if (response.status === 200) {
      setValorTotalEvento(response.data)
    } else {

      setValorTotalEvento(0.0)
    }
  }

  const getWeather = async () => {
    try {

      api.get("/api").then((response) => {
        response.data.results.forecast.splice(-2);
        setTimeout(() => {
          setClimaPorDia(response.data.results.forecast);
        }, 300);
        // setCity(response.data.results.city);
        // response.data.results.forecast.map((clima) => {
        //   setSemana((prev) => [...prev, clima.weekday]);
        // });
      });
    } catch (e) {
      console.log(e);
    }
  }

  const getCategoria = async () => {
    try {
      const response = await api.get(`/vendas/categoria-mais-vendida?eventoId=${events[currentIndex].id}`);
      console.log(response.data);

      if (response.status === 200) setCategoriaMaisVendida(response.data[0].categoria);
      else setCategoriaMaisVendida('')
    } catch (e) {
      console.log(e);
    }
  }

  function formatStringToDate(string) {
    let date = new Date(string);
    date.setDate(date.getDate() + 1);
    date.setHours(0);
    return date;
  }

  const getHistorico = async () => {
    try {
      const response = await api.get("/historico");
      let histories = [];

      if (response.status !== 204) {
        histories = response.data;

        histories.map(async (history) => {
          try {
            const user = await api.get(`/usuarios/${history.idUsuario}`);

            history.nomeUsuario = user.data.nome;
          } catch (e) {
            console.log(e);
          }
        });

        setTimeout(() => {
          setAtividade(histories.reverse());
        }, 100);
      }
    } catch (e) {
      console.log(e);
    }
  }


  const getEvents = async () => {
    try {
      const response = await api.get("/eventos/eventos-ativos");

      let events = response.data.map((event) => {
        event.dataInicio = formatStringToDate(event.dataInicio);
        event.dataFim = formatStringToDate(event.dataFim);
        return event;
      });

      setEvents(events);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {

    if (!sessionStorage.TOKEN) {
      console.log('token');
      navigate('/login')
    }

    console.log(sessionStorage.TOKEN);

    getWeather();
    getEvents();
    getHistorico();

  }, []);

  useEffect(() => {

    if (events.length > 0) {
      getCategoria()
      getQuantidadeVendaDia()
      getValorVendaDia()
      getValorVendaNoEvento()
      getQuantidadeVendaEvento()
      getTicketMedio()
    }

  }, [events, currentIndex]);

  const urlSvg = "https://assets.hgbrasil.com/weather/icons/conditions/";

  // let ticketMedio = isNaN(valorTotalEvento / totalVendidoEvento) ? (0).toFixed(2) : (valorTotalEvento / totalVendidoEvento).toFixed(2)

  return (
    <div>
      <div className="hidden md:flex">
        <Navbar />
      </div>

      <div className="flex md:hidden">
        <NavbarMobile />
      </div>

      {mostrarAtividades && (
        <div className="absolute right-[7.05vw] top-2 bg-[#D0E0E9] shadow-lg rounded-xl p-4 w-[45vh] max-h-[16vw] overflow-y-auto border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Movimentações recentes</h3>
            <Bell
              onClick={() => setMostrarAtividades(false)}
              className="cursor-pointer"
            />
            <button
              onClick={() => setMostrarAtividades(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-bell text-xl"></i> {/* Ícone de sino */}
            </button>
          </div>
          {atividades.map((atividade) => (
            <AtividadesRecentes key={atividade.id} atividade={atividade} />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <header className="flex justify-between items-center font-bold text-2xl mt-12 px-4 md:px-28">
          <h1 className="hidden md:flex text-center sm:text-left">Dashboard</h1>
          <div className="w-full md:w-auto flex justify-between md:justify-normal items-center gap-4">
            <h1 className="text-nowrap">Olá, {sessionStorage.NAME}</h1>
            <Bell
              size={30}
              onClick={() => setMostrarAtividades(!mostrarAtividades)}
              className="cursor-pointer"
            />
          </div>
        </header>

        <div className='flex flex-col md:flex-row justify-between px-4 gap-12 md:px-28'>
          <div className={dash["esquerdo"]}>
            <CarrouselEvents
              events={events}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            <span>
              Performance de <strong>Bazar - Instituto Betel</strong> Hoje
            </span>
            <div className='grid grid-cols-2 gap-5 md:gap-0 md:flex flex-col items-center justify-center md:justify-between md:flex-row'>
              <CardDash
                icon={<ShoppingBasket />}
                title={"Total de Vendas"}
                value={totalVendido}
              />
              <CardDash
                icon={<CircleDollarSign />}
                title={"Valor arrecadado"}
                value={'R$ ' + totalArrecadado.toFixed(2)}
              />
              <CardDash
                icon={<Shirt />}
                title={"Top 1 categoria"}
                value={categoriaMaisVendida}
              />
              <CardDash
                icon={
                  <img
                    src={
                      climaPorDia.length
                        ? `${urlSvg}${climaPorDia[0].condition}.svg`
                        : `${urlSvg}cloud.svg`
                    }
                    alt=""
                  />
                }
                title={"Api Clima"}
                value={
                  climaPorDia.length ? climaPorDia[0].max + "° C" : "Carregando"
                }
              />
            </div>
            {events.length ? (
              <div className={dash["grafico"]}>
                <Grafico currentIndex={currentIndex} events={events} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={dash["direito"]}>
            <div className={dash["cards"]}>
              <div className={dash["vendas"]}>
                <p>Valor arrecadado no evento</p>
                <h2>R$ {valorTotalEvento.toFixed(2)}</h2>
                {/* <p>1,7% a mais que na última edição</p> */}
              </div>

              <div className={dash["vendas"]}>
                <p>
                  Ticket Médio
                </p>
                <h2>R$  {ticketMedio}</h2>
              </div>
              <div className={dash["grafico-barra"]}>
                {
                  events.length > 0 && (
                    <DashCategoria
                      events={events}
                      currentIndex={currentIndex}
                    />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
