import { Container } from "../../../components/Container";
import { DashboardHeader } from "../../../components/PanelHeader";
import Input from "../../../components/Input";
import { FiUpload } from "react-icons/fi";

import { newVehicleSchema, type FormData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function NewVehicle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(newVehicleSchema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <DashboardHeader />

      <div className="w-full bg-white rounded-lg p-3 flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 border-gray-600 w-40 md:w-48 rounded-lg h-32">
          <label
            htmlFor="newImageInput"
            className="cursor-pointer w-full h-full flex items-center justify-center"
          >
            <FiUpload size={30} color="#000000" />
          </label>
          <div hidden>
            <input
              type="file"
              name="newImageInput"
              id="newImageInput"
              accept="image/*"
            />
          </div>
        </button>
      </div>

      <div className="w-full bg-white rounded-lg p-3 flex flex-col sm:flex-row items-center gap-2 mt-2 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col py-2 gap-4"
        >
          <Input
            type="text"
            name="name"
            label="Marca do veículo"
            register={register}
            error={errors.name?.message}
            placeholder="Ex: Honda Civic"
          />
          <Input
            type="text"
            name="model"
            label="Modelo"
            register={register}
            error={errors.model?.message}
            placeholder="Ex: 1.5 16v Turbo Gasolina Touring 4p Cvt"
          />

          <div className="flex gap-2 *:grow">
            <Input
              type="text"
              name="year"
              label="Ano"
              register={register}
              error={errors.year?.message}
              placeholder="Ex: 2020/2021"
            />

            <Input
              type="text"
              name="km"
              label="Km rodados"
              register={register}
              error={errors.km?.message}
              placeholder="Ex: 48.598"
            />
          </div>

          <div className="flex gap-2 *:grow">
            <Input
              type="text"
              name="whatsapp"
              label="Telefone / WhatsApp"
              register={register}
              error={errors.whatsapp?.message}
              placeholder="Ex: 11912345678"
            />

            <Input
              type="text"
              name="city"
              label="Cidade"
              register={register}
              error={errors.city?.message}
              placeholder="Ex: Belo Horizonte - MG"
            />
          </div>

          <Input
            type="text"
            name="price"
            label="Valor em R$"
            register={register}
            error={errors.price?.message}
            placeholder="Ex: 152.000"
          />

          <div className="relative mb-1">
            <label
              htmlFor="description"
              className="absolute -top-3.5 left-2 bg-white px-1.5 z-10 font-bold text-md text-zinc-800 cursor-text"
            >
              Descrição
            </label>
            <textarea
              id="description"
              className={`px-2 py-1 ${
                errors.description ? "border-red-600" : "border-zinc-500"
              } rounded-sm outline-none w-full pr-10 resize-y border  h-24`}
              {...register("description")}
              name="description"
              placeholder="Digite a descrição do completo do veículo aqui..."
            />
            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description?.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-red-600 px-3 h-10 rounded-sm hover:bg-red-700 transition-colors duration-300 border-2 border-zinc-900 text-white font-medium text-lg"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}

export default NewVehicle;
