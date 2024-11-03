export function Input({ 
  
    icon,
    placeholder,
    onChange,
    value,
    type,
    maxLength,
    required = false,
  
  }) {
    return (
      <div className="h-fit w-full bg-[#F3F4F6] flex items-center gap-3 px-3 py-2 rounded-lg">
        <div className="text-[#7C7C8A]">
  
        {icon}
        </div>
        <input 
  
          className="w-full bg-transparent outline-none border-none "
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
  
        />
      </div>
    )
  }