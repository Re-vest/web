export function Button({ text, icon, secondary = false, onClick }) {
  return (
    <button 
      onClick={onClick} 
      data-secondary={secondary} 
      className="
        px-6 py-2 flex justify-center items-center gap-3 
        bg-yellow-600 rounded-lg text-blue-950 
        data-[secondary=true]:bg-blue-500 
        data-[secondary=true]:text-white
        hover:bg-blue-500
        hover:text-white
        data-[secondary=true]:hover:bg-yellow-500 
        data-[secondary=true]:hover:text-blue-950
        duration-200
        text-nowrap
        md:px-7 md:py-2.5 sm:text-sm 
        lg:px-8 lg:py-3 md:text-base
      "
    >
      {icon}
      {text}
    </button>
  );
}
