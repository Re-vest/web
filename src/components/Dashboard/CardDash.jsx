import card from "../../styles/dash.module.css";

export function CardDash({ icon, title, value }) {
  return (
    <div className={card["info-card"]}>
      <div className={card["info-card-icon"]}>{icon}</div>
      <div className={card["informacoes"]}>
        <p className={card["info-card-title"]}>{title}</p>
        <p className={card["info-card-value"]}>{value}</p>
      </div>
    </div>
  );
}
