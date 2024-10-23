export function Input({ placeholder, id, type, autoComplete}) {
  return (
    <div className="flex-1">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          placeholder={placeholder} 
          id={id}
          type={type}
          autoComplete={autoComplete}
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
