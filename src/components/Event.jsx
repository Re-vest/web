export function Event({ event, handleClickEvent, title }) {
  return(
    <div style={{ backgroundColor: event.color }} onClick={() => handleClickEvent(event)} data-title={event.title} className=" w-full min-w-5 min-h-5 truncate border-[1px] rounded-lg hover:brightness-110 text-sm">
      {title}
    </div>
  )
}