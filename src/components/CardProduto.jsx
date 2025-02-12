export function CardProduto({ image, nome, preco }) {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg w-full">
      <img src={image} alt={'foto'} className="w-16 h-16 rounded-lg" />
      <div className="ml-4">
        <p className="text-gray-700 font-medium">{nome}</p>
        <p className="text-black font-bold">R$ {preco}</p>
      </div>
    </div>
  )
}