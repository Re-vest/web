import endereco from '../assets/endereco.svg'
import Contato from '../assets/contato.svg'
import Email from '../assets/email.svg'
import Whats from '../assets/whats.svg'
import Facebook from '../assets/facebook.svg'
import Instagram from '../assets/instagram.svg'

export function Footer() {
  return (
    <footer id='contato' className="h-[464px] bg-blue-950 flex items-center gap-10 py-20 px-40 text-white">

      <div className='flex flex-col justify-between gap-20 h-4/5 w-3/5'>
        {/* CONTATOS */}
        <div className='w-full flex justify-between'>
          <div className='flex gap-6 items-center'>
            <img src={endereco} alt="asd" className='w-10'/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>Contato</span>
              <p className='text-lg'>(11)97836-4836</p>
            </div>
          </div>

          <div className='flex gap-8 items-center'>
            <img src={Contato} alt="asd" className='w-10'/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>Email</span>
              <p className='text-lg'>deaninialexandra@gmail.com</p>
            </div>
          </div>
        </div>

        {/* REDES SOCIAIS */}
        <div className='w-full flex gap-16'>
          <div className='h-full flex flex-col gap-3'>
            <h1 className='font-rhodium text-3xl'>Re-Vest</h1>
            <span className='text-sm'>Uma peça de cada vez</span>
          </div>

          <div className='flex flex-col gap-2'>
            <span>Nos siga!</span>
            <div className='flex items-center gap-4'>
            <img src={Whats} alt="" />
            <img src={Facebook} alt="" />
            <img src={Instagram} alt="" />

          </div>
        </div>
      
        </div>
      
      </div>

      <div className='h-full w-2/5 items-center justify-start'>

        {/* MAPA */}
        <div className="mt-4">
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

        <div className='flex'>
          <div className='flex flex-col'>
            <div className='flex'>
              <img src={Email} alt="asd" className='w-5'/>
              <span className='font-bold text-2xl pl-5'>Endereço</span>
            </div>
            <p className='text-lg'>Avenida Souza Ramos, 513 - Guaianases, São Paulo, 08490490</p>

          </div>
        </div>
        
      </div>

    </footer>
  )
}