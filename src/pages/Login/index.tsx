import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";

import logo from "../../assets/logo.png";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type FormData } from "./schema";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

import toast from "react-hot-toast";
import { toastStyle } from "../../styles/toastStyle";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  async function onSubmit(data: FormData) {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success("Login realizado com sucesso!", {
          style: toastStyle,
        });
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          toast.error("Verifique se o e-mail e senha estão corretos!", {
            style: toastStyle,
          });
          return;
        }

        toast.error("Erro ao realizar o login!", {
          style: toastStyle,
        });
      });
  }

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-3 gap-4">
      <Link to={"/"} className="w-full max-w-40 mb-6">
        <img src={logo} alt="Logo do site" className="w-full object-contain" />
      </Link>

      <form
        className="bg-white max-w-xl w-full py-6 px-4 rounded-lg flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="email"
          placeholder="Digite o seu e-mail"
          name="email"
          label="E-mail"
          error={errors.email?.message}
          register={register}
        />

        <Input
          type="password"
          placeholder="Digite a sua senha"
          name="password"
          label="Senha"
          error={errors.password?.message}
          register={register}
        />

        <button
          type="submit"
          className="bg-red-600 px-3 h-10 rounded-sm cursor-pointer hover:bg-red-700 transition-colors duration-300 border-2 border-zinc-900 text-white font-medium text-lg"
        >
          Entrar
        </button>
      </form>
      <Link
        to={"/cadastro"}
        className="text-zinc-600 hover:text-zinc-800 transition-colors duration-300"
      >
        Novo por aqui? <strong>Cadastre-se</strong>
      </Link>
    </section>
  );
}

export default Login;
