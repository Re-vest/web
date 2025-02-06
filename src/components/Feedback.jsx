import Aspas from '../assets/aspas.svg'

export function Feedback({name, responsability, message}) {
  return (
    <div data-aos="fade-up" className="bg-white rounded-3xl flex flex-col gap-16 py-16 px-14 w-[504px] h-[427px] drop-shadow-2xl">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">{name}</span>
          <span className="opacity-50 text-sm">{responsability}</span>
        </div>
        <img src={Aspas} alt="" />
      </div>

      <div className='w-full h-full flex items-center text-center'>

      <p className="italic font-medium text-lg opacity-70">"{message}"</p>
      </div>

    </div>
  )
}