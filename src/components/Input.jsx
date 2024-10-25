export function Input({
  value,
  icon,
  placeholder,
  onChange,
  type = "text",
  maxLength,
  required = false,}) {
  return (
    <div className="h-fit w-full bg-[#F3F4F6] flex items-center gap-3 px-3 py-2 rounded-lg">
      <div className="text-[#7C7C8A]">{icon}</div>
      <input
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        required={required}
        className="w-full bg-transparent outline-none border-none "
      />
    </div>
  );
}
