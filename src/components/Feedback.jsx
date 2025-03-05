import Aspas from '../assets/aspas.svg'

export function Feedback({name, responsability, message}) {
  return (
    <div data-aos="fade-up" className="bg-white rounded-3xl flex flex-col lg:gap-15 gap-5 lg:py-16 py-10 lg:px-14 px-8 lg:w-[504px] w-4/5 lg:h-[427px] h-[250px] drop-shadow-2xl">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-lg lg:text-2xl font-bold">{name}</span>
          <span className="opacity-50 lg:text-sm text-[12px]">{responsability}</span>
        </div>
        <img src={Aspas} alt="" className='lg:w-[50px] w-[30px]' />
      </div>

      <div className='w-full h-full flex items-center text-center'>

      <p className="italic font-medium lg:text-lg text-[12px] opacity-70">"{message}"</p>
      </div>

    </div>
  )
}