export function Input({ icon, placeholder, setValue, type }) {
  return (
    <div className="h-fit w-full bg-[#F3F4F6] flex gap-3 px-3 py-2 rounded-lg">
      <div className="text-[#7C7C8A]">

      {icon}
      </div>
      <input placeholder={placeholder} type={type} className="w-full bg-transparent outline-none border-none" onChange={e => setValue(e.target.value)} />
    </div>
  )
}