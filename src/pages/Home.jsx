import {Header} from "../components/Header";
import data from '../assets/contribua.svg'
import { Feedback } from "../components/Feedback";
import { Footer } from "../components/Footer";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AtSign } from "lucide-react";

export function Home() {
  return (
    <>
      <div className="h-[785px] flex items-center flex-col gap-24 bg-home bg-cover text-white relative z-10">
        <Header />

        <h1 className="text-6xl flex flex-col items-center gap-9 z-30 font-rhodium">
          <p>
            Transformando <span className="text-yellow-600">vidas</span>,
          </p>
          <p>
            uma <span className="text-yellow-600">peça</span> de cada vez.
          </p>
        </h1>

        <span className="w-1/4 text-center text-lg z-30">
          O Re-Vest é um projeto onde você pode pedir roupas doadas online. Ele
          conecta quem precisa com quem quer ajudar, promovendo a reutilização
          de roupas e oferecendo conforto a todos.
        </span>
        <div className="absolute w-full h-full bg-gradient-to-br from-black to-transparent z-20" />
      </div>

      <div className="flex justify-center items-center mb-24 -mt-28">
        <div data-aos="flip-left" className="w-96 h-56 flex flex-col text-center items-center justify-center shadow-2xl drop-shadow-2xl shadow-blue-500 rounded-3xl gap-3 bg-white z-50 -mr-16">
          <img src={data} alt="icone" className="w-9" />
          <span className="text-4xl text-blue-500">Contribua</span>
          <p className="opacity-70 w-1/2 text-sm font-medium">Junte-se a nós e ajude a transformar ideias em realidade.</p>
        </div>

        <div data-aos="flip-left" className="w-[394px] h-[291px] flex flex-col text-center items-center justify-center shadow-2xl drop-shadow-2xl shadow-blue-500 rounded-3xl gap-3 bg-white z-[999]">
          <img src={data} alt="icone" className="w-9" />
          <span className="text-4xl text-blue-500">Catálogo</span>
          <p className="opacity-70 w-3/5 text-sm font-medium">Explore nossos produtos e encontre exatamente o que procura!</p>
        </div>

        <div data-aos="flip-left" className="w-96 h-56 flex flex-col text-center items-center justify-center shadow-2xl drop-shadow-2xl shadow-blue-500 rounded-3xl gap-3 bg-white z-50 -ml-12">
          <img src={data} alt="icone" className="w-9" />
          <span className="text-4xl text-blue-500">Data do evento</span>
          <p className="opacity-70 w-1/2 text-sm font-medium">Esteja informado e aproveite a oportunidade para participar!</p>
        </div>
      </div>

      <div className="h-[552px] bg-bazar bg-cover text-white" id="about">
        <div data-aos="fade-right" className="h-full w-1/2 bg-blue-950 rounded-tr-full rounded-br-full flex flex-col items-center justify-center relative">
        <div className="absolute h-[528px] w-[98%] left-0 border-yellow-600 border-r-2 border-b-2 border-t-2 rounded-tr-full rounded-br-full"></div>
          <div className="w-1/2 flex flex-col gap-2">
            <p className="">Bem vindo a nossa</p>
            <h2 className="text-4xl font-bold">Rede de doações</h2>
            <span>
              No coração do Re-Vest, encontramos a verdadeira essência da
              solidariedade e da comunidade. Cada doação é mais do que um
              simples gesto; é uma expressão de compaixão e um passo em direção
              a um mundo mais sustentável.{" "}
            </span>
          </div>
        </div>
      </div>

      <div className="h-[552px] bg-doacao bg-cover flex justify-end text-white">
        <div data-aos="fade-left" className="h-full w-1/2 bg-blue-950 rounded-tl-full rounded-bl-full flex flex-col items-center justify-center relative">
        <div className="absolute h-[528px] w-[98%] right-0 border-yellow-600 border-l-2 border-b-2 border-t-2 rounded-tl-full rounded-bl-full"></div>
          <div className="w-1/2 flex flex-col gap-2 ">
            <h2 className="text-4xl font-bold">Transforme vidas</h2>
            <span>
              Doar roupas é uma maneira poderosa de impactar positivamente a
              vida das pessoas. Cada peça de roupa que você oferece pode trazer
              conforto e dignidade a alguém que está passando por dificuldades.
              Seu gesto generoso ajuda a construir comunidades mais solidárias e
              a promover a igualdade.
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#F1FFFE] flex gap-5 justify-center items-center pt-24 pb-52">
        <Feedback name="Alexandra" responsability="Responsável pelas doações" message="O Re-Vest mudou minha vida. Consegui roupas para meus filhos quando mais precisei. É um projeto que realmente faz a diferença." />
        <Feedback name="Alexandra" responsability="Responsável pelas doações" message="O Re-Vest mudou minha vida. Consegui roupas para meus filhos quando mais precisei. É um projeto que realmente faz a diferença." />
      </div>

      <div className="flex justify-center -mt-[72px] z-30">

      {/* <div className="w-[70%] h-36 bg-white flex justify-between items-center gap-14 px-14 py-12 rounded-3xl shadow-2xl">
      <span className="font-bold text-3xl text-nowrap">Fique por dentro! </span>
      <Input icon={<AtSign width={24} />} placeholder="example@example.com" />
      <Button text="Salvar" />
      </div> */}
      </div>

      <div className="z-20 -mt-[72px]">
      <Footer />

      </div>


    </>
  );
}
