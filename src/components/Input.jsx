export function Input(props) {
  return (
    <div className="w-full bg-[#F3F4F6] flex gap-3 px-3 py-2 rounded-lg">
      <div className="text-[#7C7C8A]">

      {props.icon}
      </div>
      <input placeholder={props.placeholder} type="text" className="bg-transparent outline-none border-none " />
    </div>
  )
}