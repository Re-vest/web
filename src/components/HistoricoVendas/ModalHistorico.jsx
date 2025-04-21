import { X } from "lucide-react/dist/cjs/lucide-react"

export function ModalHistorico({ venda, setModal }) {

  const optionsCategoria = [
    { label: "Roupa", value: "ROUPA" },
    { label: "Acessório", value: "ACESSORIO" },
  ]

  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-[1000]">
      <div className="relative bg-white w-11/12 md:w-4/5 flex flex-col gap-8 py-8 px-8 items-center rounded-2xl ">
        <X className="absolute right-3 top-3" size={32} cursor={'pointer'} onClick={e => {
          setModal(false)
        }} />

        <div className="w-full overflow-x-scroll">
        <table className="w-full mt-5">
          <thead>
            <tr>
              <th className="sticky top-0 bg-gray-200 z-10 p-2.5 text-center">Código ID</th>
              <th className="sticky top-0 bg-gray-200 z-10 p-2.5 text-center">Nome</th>
              <th className="sticky top-0 bg-gray-200 z-10 p-2.5 text-center">Descrição</th>
              <th className="sticky top-0 bg-gray-200 z-10 p-2.5 text-center">Categoria</th>
              <th className="sticky top-0 bg-gray-200 z-10 p-2.5 text-center">Preço</th>
            </tr>
          </thead>

          <tbody>
            {venda.carrinho.map(produto => (
              <tr className="h-12" key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{optionsCategoria.find(option => option.value === produto.categoria).label}</td>
                <td>{produto.preco.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>
    </div>
  )
}