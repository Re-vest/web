export function Event({ color, title }) {
  return(
    <div style={{ backgroundColor: color }} data-title={title} className="z-[999] w-full min-w-5 min-h-5 truncate border-[1px] rounded-lg hover:brightness-110 text-sm">
      {title}
    </div>
  )
}