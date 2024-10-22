import React from "react";

export const Voluntario = ({ volunteer, selecionaVoluntario }) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={volunteer.selecionado}
          onChange={() => selecionaVoluntario(volunteer.id)}
        />
      </td>
      <td className="idVoluntario">{volunteer.id}</td>
      <td className="nomeVoluntario">{volunteer.voluntario}</td>
      <td>
        <span className={`status ${volunteer.status.toLowerCase()}`}>
          {volunteer.status}
        </span>
      </td>
      <td className="permissaoVoluntario">{volunteer.permissao}</td>
      <td className="acoesVoluntario">
        <button className="acoes-btn">...</button>
      </td>
    </tr>
  );
};