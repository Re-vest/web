import Modal from "./ModalEditar";

export const Voluntario = ({ 
    id = '',
    nome = '',
    permissao = '',
    editar,
    modalEditar,
    voluntarios,
    volunteer, 
    setVoluntarios
  }) => {
  

  return (
    <tr className="h-12">
      <td>{id}</td>
      <td>{nome}</td>
      <td>{permissao}</td>
        <td>
          <Modal volunteer={volunteer} editar={editar} modalEditar={modalEditar} setVoluntarios={setVoluntarios} voluntarios={voluntarios}/>
        </td>
    </tr>
  );
};