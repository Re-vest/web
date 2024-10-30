import AtividadeCss from "../../styles/atividade.module.css"

const atividades = [
    { date: '28/08', action: 'Victor Hugo realizou uma venda' },
    { date: '28/08', action: 'Samuel Oliveira adicionou um item' },
    { date: '28/08', action: 'Gustavo Antunes removeu um item' },
  ];
  
  export const Atividade = () => (
    <div className={AtividadeCss["atividades"]}>
      <h4>Atividades Recentes</h4>
      <ul>
        <li>
          <span>{atividades[0].date}</span> - {atividades[0].action}
        </li>
        <li>
          <span>{atividades[1].date}</span> - {atividades[1].action}
        </li>
        <li>
          <span>{atividades[2].date}</span> - {atividades[2].action}
        </li>
      </ul>
    </div>
  );
  