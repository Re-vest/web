import { CalendarDays } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Grafico } from "../../components/Dashboard/Grafico";
import { Atividade } from "../../components/Dashboard/Atividade";
import dash from "../../styles/dashboard.module.css";

export function Dashboard() {
  return (
    <div className={dash["h-full w-full flex"]}>
      <Navbar />
      <div className={dash["container"]}>
        <div className={dash["esquerdo"]}>
          <h1>Dashboard</h1>
          <div className={dash["header"]}>
            <div className={dash["evento-info"]}>
              <CalendarDays size={34} />
              <div className={dash["evento-texto"]}>
                <h3>
                  <strong>Próximo Evento</strong>
                </h3>
                <p>Bazar - Instituto Betel</p>
              </div>
            </div>
            <div className={dash["evento-datas"]}>
              <div>
                <strong>Início:</strong>
                <span>25 Agosto</span>
              </div>
              <div>
                <strong>Fim:</strong>
                <span>31 Agosto</span>
              </div>
            </div>
          </div>
          <div className={dash["grafico"]}>
            <Grafico />
          </div>
          <div className={dash["atividades"]}>
            <Atividade />
          </div>
        </div>
        <div className={dash["direito"]}>
          <div className={dash["bem-vindo"]}><h1>Olá, Vitor Tigre</h1></div>
          <div className={dash["cards"]}>
            <div className={dash["vendas"]}>
              <p>Total de vendas na semana</p>
              <h2>R$ 477,90</h2>
              <p>1,7% a mais que na última edição</p>
            </div>
            <div className={dash["categoria"]}>
              <p>
                Categoria de peça mais <br />
                vendida em relação ao clima
              </p>
              <h2>Categoria J</h2>
              <p>X vendas até o momento</p>
            </div>
            <div className={dash["monitoramento"]}>
              <h2>
                Monitoramento <br />
                de equipe
              </h2>
              <p>Admins Ativos: 2</p>
              <p>Voluntários Ativos: 7</p>
              <p>Equipe total: 9 pessoas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
