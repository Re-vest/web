export function Event({ event, handleClickEvent, titulo }) {
  const handleClick = (e) => {
    e.stopPropagation();
    handleClickEvent(event);
  }
  
  return(
    <div style={{ backgroundColor: event.cor }} onClick={handleClick} data-titulo={event.titulo} className=" w-full min-w-5 min-h-5 truncate border-[1px] rounded-lg hover:brightness-110 text-sm">
      {titulo}
    </div>
  )
}