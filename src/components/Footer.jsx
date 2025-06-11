import endereco from '../assets/endereco.svg'
import Contato from '../assets/contato.svg'
import Email from '../assets/email.svg'
import Whats from '../assets/whats.svg'
import Facebook from '../assets/facebook.svg'
import Instagram from '../assets/instagram.svg'

export function Footer() {
  return (
    <footer id='contato' className="lg:h-[464px] h-[600px] bg-blue-950 flex flex-col lg:flex-row items-center gap-5 lg:gap-10 py-10 lg:py-20  px-10 lg:px-40 text-white">

      <div className='flex flex-col justify-between gap-5 lg:gap-20 h-4/5 lg:w-3/5 w-full'>
        {/* CONTATOS */}
        <div className='w-full flex flex-col justify-between lg:flex-row'>
          <div className='flex gap-4 lg:gap-6 items-center'>
            <img src={endereco} alt="asd" className='w-5 lg:w-10'/>
            <div className='flex flex-col'>
              <span className='font-bold text-md lg:text-2xl'>Contato</span>
              <p className='text-sm lg:text-lg'>(11)97836-4836</p>
            </div>
          </div>

          <div className='flex gap-4 lg:gap-6 items-center'>
            <img src={Contato} alt="asd" className='w-5 lg:w-10'/>
            <div className='flex flex-col'>
              <span className='font-bold text-md lg:text-2xl'>Email</span>
              <p className='text-sm lg:text-lg'>deaninialexandra@gmail.com</p>
            </div>
          </div>
        </div>

        {/* REDES SOCIAIS */}
        <div className='w-full flex gap-10 lg:gap-16 flex-col lg:flex-row'>
          <div className='h-full flex flex-col gap-3'>
            <h1 className='font-rhodium text-3xl -mb-4'>Re-Vest</h1>
            <span className='text-sm'>Uma peça de cada vez</span>
          </div>

          <div className='flex flex-col gap-2'>
            <span>Nos siga!</span>
            <div className='flex items-center gap-4'>
            <img src={Whats} alt="" className='w-10 lg:w-[60px]'/>
            <img src={Facebook} alt="" className='w-10 lg:w-[60px]'/>
            <img src={Instagram} alt="" className='w-10 lg:w-[60px]'/>

          </div>
        </div>
      
        </div>
      
      </div>

      <div className='h-full lg:w-2/5 lg:items-center justify-start'>

        {/* MAPA DESKTOP */}
        <div className="mt-2 lg:mb-1 hidden lg:flex">
          <iframe
            title="Mapa do Google"
            width="100%"
            height="200"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.608680074322!2d-46.411805124817896!3d-23.582493878785293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce6587c0b44df3%3A0x3ec44ca94332d137!2sIgreja%20Batista%20Betel%20Cidade%20Tiradentes!5e0!3m2!1spt-BR!2sbr!4v1741116642940!5m2!1spt-BR!2sbr"
          ></iframe>
        </div>

        {/* MAPA RESPONSIVO */}
        <div className="mb-2 lg:hidden flex">
          <iframe
            title="Mapa do Google"
            width="100%"
            height="150"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.608680074322!2d-46.411805124817896!3d-23.582493878785293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce6587c0b44df3%3A0x3ec44ca94332d137!2sIgreja%20Batista%20Betel%20Cidade%20Tiradentes!5e0!3m2!1spt-BR!2sbr!4v1741116642940!5m2!1spt-BR!2sbr"
          ></iframe>
        </div>

        <div className='flex lg:w-4/5'>
          <div className='flex w-full flex-col'>
            <div className='flex'>
              <img src={Email} alt="asd" className='w-5'/>
              <span className='font-bold text-md lg:text-2xl lg:pl-5 pl-3'>Endereço</span>
            </div>
            <p className='text-sm lg:text-lg'>Avenida Souza Ramos, 513 - Guaianases, São Paulo, 08490490</p>

          </div>
        </div>
        
      </div>

    </footer>
  )
}