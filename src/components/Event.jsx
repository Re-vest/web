export function Event({ event, handleClickEvent, title }) {
  const handleClick = (e) => {
    e.stopPropagation();
    handleClickEvent(event);
  }
  
  return(
    <div style={{ backgroundColor: event.color }} onClick={handleClick} data-title={event.title} className=" w-full min-w-5 min-h-5 truncate border-[1px] rounded-lg hover:brightness-110 text-sm">
      {title}
    </div>
  )
}