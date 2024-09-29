import { FaLock, FaAt ,FaArrowRight } from "react-icons/fa";
import "../../styles/form.css";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";

const Login = () => {
  return (
    <div className="container-pai">
      <div className="image">
        <img src="src\assets\doacao.jpg" alt="" />
      </div>

      <div className="container">
        <form>
          <h1>Entrar na Conta</h1>

          <Input placeholder="E-mail" icon={<FaLock/>}/>

          <Input placeholder="Senha" icon={<FaAt/>}/>

          <Button text="Entrar" />

          <div className="recall-forget">
            <a href="#">Esqueceu da senha ou nome de usuário?</a>
          </div>
          <div className="create-account">
            <a href="/cadastro">Criar Sua Conta</a><FaArrowRight/>
          </div>

          <div className="signup-link">
            <p></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;