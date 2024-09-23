import endereco from '../assets/endereco.svg'
import Contato from '../assets/contato.svg'
import Email from '../assets/email.svg'
import Whats from '../assets/whats.svg'
import Facebook from '../assets/facebook.svg'
import Instagram from '../assets/instagram.svg'

export function Footer() {
  return (
    <footer className="h-[464px] bg-blue-950 flex flex-col items-center justify-between py-24 px-48 text-white">
      <div className='w-full flex justify-between'>
      <div className='flex gap-8 items-center'>
        <img src={endereco} alt="asd" />

        <div className='flex flex-col'>
          <span className='font-bold text-2xl'>Endereço</span>
          <p className='text-lg'>Rua Haddock Lobo, 595 São Paulo - SP</p>
        </div>
      </div>

      <div className='flex gap-8 items-center'>
        <img src={Contato} alt="asd" />

        <div className='flex flex-col'>
          <span className='font-bold text-2xl'>Contato</span>
          <p className='text-lg'>(11) xxxxx-xxxx</p>
        </div>
      </div>

      <div className='flex gap-8 items-center'>
        <img src={Email} alt="asd" />

        <div className='flex flex-col'>
          <span className='font-bold text-2xl'>Email</span>
          <p className='text-lg'>support@revest.com</p>
        </div>
      </div>

      </div>

      <div className='flex gap-16'>
        <div className='h-full flex flex-col gap-3'>
          <h1 className='font-rhodium text-3xl'>Re-Vest</h1>
          <span className='text-sm'>Uma peça de cada vez</span>
        </div>

        <div className='flex flex-col gap-2'>
          <span>Nos siga!</span>
          <div className='flex items-center gap-8'>
          <img src={Whats} alt="" />
          <img src={Facebook} alt="" />
          <img src={Instagram} alt="" />

          </div>
        </div>
      </div>
    </footer>
  )
}