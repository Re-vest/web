export function Button({ text, icon, secondary = false, onClick }) {
  return (
    <button onClick={onClick} data-secondary={secondary} className="px-8 py-3 flex justify-center items-center gap-3 bg-yellow-600 rounded-lg text-blue-950 data-[secondary=true]:bg-blue-500 data-[secondary=true]:text-white">
      {icon}
      {text}
    </button> 
  )
} 