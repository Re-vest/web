export function Input({
  value,
  icon,
  placeholder,
  onChange = () => { },
  type = "text",
  maxLength,
  required = false,
  register = () => {},
  name,
  error = false,
}) {
  return (
    <div data-error={error} className="h-fit w-full bg-[#F3F4F6] flex items-center gap-3 px-3 py-2 rounded-lg focus-within:ring-2 ring-yellow-500 data-[error=true]:ring-2 data-[error=true]:ring-red-500">
      <div className="text-[#7C7C8A]">{icon}</div>
      <input
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="w-full bg-transparent outline-none border-none"
        {...register(name, { required })}
      />
    </div>
  );
}
