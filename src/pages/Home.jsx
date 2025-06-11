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
      <div className="h-[600px] sm:h-[700px] lg:h-[785px] flex items-center flex-col sm:gap-16 lg:gap-24 gap-10 bg-home bg-cover text-white relative z-10">
        <Header />

        <h1 className="text-2xl md:text-5xl lg:text-6xl flex flex-col items-center gap-2 md:gap-6 z-30 font-rhodium ">
          <p>
            Transformando <span className="text-yellow-600">vidas,</span>
          </p>
          <p>
            uma <span className="text-yellow-600">peça</span> de cada vez.
          </p>
        </h1>

        <span className="w-3/4 lg:w-2/4 text-center lg:text-lg text-sm z-30">

          O Revest é um sistema de gestão feito especialmente para o projeto social que
          é conduzido pelo Instituto Batista Betel, onde, através de vendas em um bazar,
          é capaz de custear diversos serviços, como cursos e doação de cestas básicas
          para a comunidade.
        </span>
        <div className="absolute w-full h-full bg-gradient-to-br from-black to-transparent z-20"/>
      </div>

    {/*Cards [DESKTOP]*/}
      <div className="md:flex justify-center items-center mb-24 -mt-28 hidden ">
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

      {/*Cards [RESPONSIVO]*/}
      <div className="flex justify-between items-center mb-15 -mt-28 ml-5 mr-5 flex-col sm:p-10 sm:gap-4 md:hidden">
      <div 
        data-aos="flip-left" 
        className="w-70 h-40 flex flex-col text-center items-center p-5 shadow-2xl drop-shadow-2xl shadow-blue-500 rounded-3xl gap-2 bg-white z-50 sm:w-3/4 sm:h-auto sm:mb-4">
        <img src={data} alt="icone" className="w-7" />
        <span className="text-xl text-blue-500">Contribua</span>
        <p className="opacity-70 w-7/8 text-sm font-medium">Junte-se a nós e ajude a transformar ideias em realidade.</p>
      </div>

      <div 
        data-aos="flip-left" 
        className="w-90 h-40 flex flex-col text-center items-center p-5 shadow-2xl drop-shadow-2xl shadow-blue-500 rounded-3xl gap-2 bg-white sm:mb-4 z-[999]">
        <img src={data} alt="icone" className="w-7" />
        <span className="text-xl text-blue-500">Catálogo</span>
        <p className="opacity-70 w-7/8 text-sm font-medium">Explore nossos produtos e encontre exatamente o que procura!</p>
      </div>

      <div 
        data-aos="flip-left" 
        className="w-70 h-40 flex flex-col text-center items-center p-5 shadow-2xl drop-shadow-2xl shadow-blue-500 rounded-3xl gap-2 bg-white z-50 sm:w-3/4 sm:h-auto sm:mb-4">
        <img src={data} alt="icone" className="w-7" />
        <span className="text-xl text-blue-500">Data do evento</span>
        <p className="opacity-70 w-7/8 text-sm font-medium">Esteja informado e aproveite a oportunidade para participar!</p>
      </div>
    </div>


      {/*About [DESKTOP]*/}
      <div className="h-[552px] bg-bazar bg-cover text-white hidden md:flex" id="about">
        <div data-aos="fade-right" className="h-full w-1/2 bg-blue-950 rounded-tr-full rounded-br-full flex flex-col items-center justify-center relative">
        <div className="absolute h-[528px] w-[98%] left-0 border-yellow-600 border-r-2 border-b-2 border-t-2 rounded-tr-full rounded-br-full"></div>
          <div className="w-1/2 flex flex-col gap-2">
            <p className="">Bem vindo ao nosso</p>
            <h2 className="text-4xl font-bold">Bazar Solidário</h2>
            <span>
            No coração do bazar, encontramos a verdadeira essência da solidariedade e da comunidade.  
            Cada peça vendida ou doada não é apenas um item, mas uma nova oportunidade para quem precisa.  
            Juntos, damos um novo propósito aos produtos e contribuímos para um mundo mais sustentável.{" "}
            </span>
          </div>
        </div>
      </div>

      {/*About [RESPONSIVO]*/}
      <div className="h-[382px] bg-bazar text-white mt-10 md:hidden flex" id="about">
        <div data-aos="fade-right" className="h-full md:w-1/2 w-full bg-blue-950 rounded-tr-full rounded-br-full flex flex-col items-center justify-center relative">
        <div className="absolute h-[368px] w-[98%] left-0 border-yellow-600 border-r-2 border-b-2 border-t-2 rounded-tr-full rounded-br-full"></div>
          <div className="w-3/4 flex flex-col gap-2 md:text-2xl text-sm">
            <p className="">Bem vindo ao nosso</p>
            <h2 className=" text-2xl font-bold">Bazar Solidário</h2>
            <span className="md:text-2xl text-sm">
            No coração do bazar, encontramos a verdadeira essência da solidariedade e da comunidade.  
            Cada peça vendida ou doada não é apenas um item, mas uma nova oportunidade para quem precisa.  
            Juntos, damos um novo propósito aos produtos e contribuímos para um mundo mais sustentável.{" "}
            </span>
          </div>
        </div>
      </div>

      {/*About 2 [Desktop] */}
      <div className="h-[552px] bg-doacao bg-cover flex justify-end text-white hidden md:flex">
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

      {/*About 2 [RESPONSIVO]*/}
      <div className="h-[382px] bg-doacao text-white md:hidden flex">
        <div data-aos="fade-left" className="h-full md:w-1/2 w-full bg-blue-950 rounded-tl-full rounded-bl-full flex flex-col items-center justify-center relative">
        <div className="absolute h-[368px] w-[98%] right-0 border-yellow-600 border-l-2 border-b-2 border-t-2 rounded-tl-full rounded-bl-full"></div>
          <div className="w-3/4 flex flex-col gap-2 md:text-2xl text-sm">
            <h2 className=" text-2xl font-bold text-right">Transforme vidas</h2>
            <span className="md:text-2xl text-sm text-right">
              Doar roupas é uma maneira poderosa de impactar positivamente a
              vida das pessoas. Cada peça de roupa que você oferece pode trazer
              conforto e dignidade a alguém que está passando por dificuldades.
              Seu gesto generoso ajuda a construir comunidades mais solidárias e
              a promover a igualdade.
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#F1FFFE] flex gap-5 md:flex-row flex-col justify-center items-center lg:pt-24 pt-10 pb-52">

        <Feedback name="Lurdes" responsability="Cliente do bazar" message="O Re-Vest mudou minha vida. Consegui roupas para meus filhos quando mais precisei. É um projeto que realmente faz a diferença." />

        <Feedback name="Alexandra" responsability="Responsável pelo projeto" message="Fazer parte desse projeto é muito importante pra mim e ver a diferença que ele faz na vida de tanta gente faz tudo valer ainda mais a pena." />

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
