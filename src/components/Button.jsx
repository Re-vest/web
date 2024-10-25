export function Button({ text, icon, secondary = false, style, onClick }) {
  return (
    <button style={style} data-secondary={secondary} onClick={e => onClick(e)} className="h-fit px-8 py-3 flex items-center gap-3 bg-yellow-600 rounded-lg text-blue-950 data-[secondary=true]:bg-blue-500 data-[secondary=true]:text-white">
      {icon}
      {text}
    </button> 
  )
} 