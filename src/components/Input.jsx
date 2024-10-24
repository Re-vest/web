export function Input({ icon, placeholder, onChange }) {
  return (
    <div className="h-fit w-full bg-[#F3F4F6] flex items-center gap-3 px-3 py-2 rounded-lg">
      <div className="text-[#7C7C8A]">

      {icon}
      </div>
      <input 
      placeholder={placeholder} 
      type="text" className="w-full bg-transparent outline-none border-none "
      onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}