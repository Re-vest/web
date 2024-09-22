export function Button(props) {
  return (
    <button className="px-8 py-3 bg-yellow-600 rounded-lg text-blue-950">
      {props.text}
    </button>
  )
}