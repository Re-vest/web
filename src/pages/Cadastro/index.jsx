import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft } from "lucide-react";
import api from '../../api'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  nome: z.string().min(1, "Campo obrigatório"),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
})

const Cadastro = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: {
    errors,
  } } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema)
  })

  async function handleLogin(data) {
    try {
      const response = await api.post('/usuarios', {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        perfil: 'CLIENTE'
      })

      sessionStorage.ID_USER = response.data.userId
      sessionStorage.TOKEN = response.data.token
      sessionStorage.PERFIL = response.data.perfilUsuario
      sessionStorage.NAME = response.data.nome

      swal("Sucesso", "Usuário cadastrado com sucesso", "success");
      
      navigate('/login')
      
    } catch(e) {
      swal("Erro ao cadastrar", e.response.data, "error");
      console.log(e)
    }
  }

  const ErrorMessage = ({message}) => (<span className="text-red-500 text-sm">{message}</span>)

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-1/2 flex flex-col px-28 py-20 gap-32">
        <a href="/login" className="flex items-center gap-2 hover:underline"><MoveLeft size={18} /> Voltar</a>
        <div className="flex flex-col gap-10">
          <h2 className="text-4xl font-bold">Crie sua Conta</h2>
          <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor=""><span className="text-red-500">*</span> Nome</label>
              <Input placeholder="Victor" register={register} name='nome' required error={errors.nome ? true : false} />
              {errors.nome && <ErrorMessage message={errors.nome.message} />}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor=""><span className="text-red-500">*</span> Email</label>
              <Input placeholder="example@example.com" register={register} name='email' required error={errors.email ? true : false} />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor=""><span className="text-red-500">*</span> Senha</label>
              <Input type="password" placeholder="example@example.com" register={register} name='senha' required error={errors.senha ? true : false} />
              {errors.senha && <ErrorMessage message={errors.senha.message} />}
            </div>

            <Button type="submit" secondary text={"Registrar-se"} />
          </form>

        </div>

      </div>

      <div className="h-full w-1/2 bg-doacao bg-no-repeat bg-cover bg-center" />
    </div>
  );
};

export default Cadastro;