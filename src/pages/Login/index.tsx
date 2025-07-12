import { Link } from "react-router-dom";
import Input from "../../components/Input";

import logo from "../../assets/logo.png";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type FormData } from "./schema";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-3 gap-4">
      <Link to={"/"} className="w-full max-w-40 mb-6">
        <img src={logo} alt="Logo do site" className="w-full object-contain" />
      </Link>

      <form
        className="bg-white max-w-xl w-full p-4 rounded-lg flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          name="email"
          error={errors.email?.message}
          register={register}
        />

        <Input
          type= "password"
          placeholder="Digite sua senha"
          name="password"
          error={errors.password?.message}
          register={register}
        />

        <button
          type="submit"
          className="bg-red-600 px-3 h-9 rounded-sm cursor-pointer hover:bg-red-700 transition-colors duration-300 text-white font-medium text-lg"
        >
          Entrar
        </button>
      </form>
    </section>
  );
}

export default Login;
