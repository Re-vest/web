export function Event({ event, handleClickEvent, titulo }) {
  const handleClick = (e) => {
    e.stopPropagation();
    handleClickEvent(event);
  }
  
  return(
    <div style={{ backgroundColor: event.cor }} onClick={handleClick} data-titulo={event.titulo} className="w-2 h-2 md:w-full md:min-w-5 md:min-h-5 truncate border-[1px] rounded-lg hover:brightness-110 text-sm ">
      {titulo}
    </div>
  )
}