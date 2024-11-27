import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft } from "lucide-react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  async function handleLogin(data) {
    try {
      const response = await api.post("/usuarios/login", {
        email: data.email,
        senha: data.senha,
      });

      console.log(response.data);

      sessionStorage.ID_USER = response.data.userId;
      sessionStorage.TOKEN = response.data.token;
      sessionStorage.PERFIL = response.data.perfilUsuario;
      sessionStorage.NAME = response.data.nome;

      if (sessionStorage.PERFIL === "CLIENTE") {
        alert("Usuário não possui privilégios suficientes");
        return;
      }

      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  }

  const ErrorMessage = ({ message }) => (
    <span className="text-red-500 text-sm">{message}</span>
  );

  return (
    <div className="w-full h-full flex flex-col lg:flex-row justify-center">
      {/* Conteúdo principal */}
      <div className="w-full lg:w-1/2 flex flex-col px-8 lg:px-28 py-10 lg:py-20 gap-12 lg:gap-32">
        <a href="/" className="flex items-center gap-2 hover:underline">
          <MoveLeft size={18} /> Voltar
        </a>
        <div className="flex flex-col gap-8 lg:gap-10">
          {/* Texto centralizado em telas menores */}
          <h2 className="text-2xl lg:text-4xl font-bold text-center lg:text-left">
            Acesse a plataforma
          </h2>
          <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">E-mail</label>
              <Input
                placeholder="example@example.com"
                register={register}
                name="email"
                required
                error={errors.email ? true : false}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="senha">Senha</label>
              <Input
                type="password"
                placeholder="Insira sua senha"
                register={register}
                name="senha"
                required
                error={errors.senha ? true : false}
              />
              {errors.senha && <ErrorMessage message={errors.senha.message} />}
            </div>
            <Button type="submit" text={"Entrar"} />
            <p>Não possui uma conta? <a href="/cadastro" className="text-blue-500 hover:underline">Criar Conta</a></p>
          </form>
        </div>
      </div>

      {/* Oculta a imagem em telas menores */}
      <div className="hidden lg:block lg:w-1/2 h-full bg-home bg-no-repeat bg-cover bg-center" />
    </div>
  );
};

export default Login;
