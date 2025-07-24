import { type ChangeEvent, useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/context";

import { Container } from "../../../components/Container";
import { DashboardHeader } from "../../../components/PanelHeader";
import Input from "../../../components/Input";
import { FiUpload, FiTrash2 } from "react-icons/fi";

import { newVehicleSchema, type FormData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import { toastStyle } from "../../../styles/toastStyle";

import { v7 as uuidV7 } from "uuid";
import { storage, db } from "@/services/firebaseConnection";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

interface ImageItemProps {
  uid: string; // dono da imagem
  name: string; // id da imagem
  previewURL: string;
  url: string;
}

function NewVehicle() {
  const { user } = useContext(AuthContext);

  const [vehicleImages, setVehicleImages] = useState<ImageItemProps[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // limpa os inputs do formulário
  } = useForm<FormData>({
    resolver: zodResolver(newVehicleSchema),
    mode: "onChange",
  });

  async function handleAddFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        // envia para o storage
        await handleUploadImage(image);
      } else {
        toast.error("Envie uma imagem do tipo PNG ou JPEG", {
          style: toastStyle,
        });
        return;
      }
    }
  }

  async function handleUploadImage(image: File) {
    if (!user?.uid) {
      return;
    }

    const currentUID = user?.uid;
    const uidImage = uuidV7();

    const uploadsRef = ref(storage, `images/${currentUID}/${uidImage}`);

    uploadBytes(uploadsRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((dowloadURL) => {
            const imageItem = {
              name: uidImage,
              uid: currentUID,
              previewURL: URL.createObjectURL(image),
              url: dowloadURL,
            };
            setVehicleImages((images) => [...images, imageItem]);
            toast.success("Imagem adicionada com sucesso!", {
              style: toastStyle,
            });
          })
          .catch(() => {
            toast.error("Ops, algo deu errado!", {
              style: toastStyle,
            });
          });
      })
      .catch(() => {
        toast.error("Ops, algo deu errado!", {
          style: toastStyle,
        });
      });
  }

  async function handleDeleteImage(item: ImageItemProps) {
    const imagePath = `images/${item.uid}/${item.name}`; // caminho da imagem no storage

    const imageRef = ref(storage, imagePath);

    await deleteObject(imageRef)
      .then(() => {
        setVehicleImages(
          vehicleImages.filter((vehicle) => vehicle.url !== item.url)
        );
      })
      .catch(() => {
        toast.error("Ops, algo deu errado!", {
          style: toastStyle,
        });
      });
  }

  async function onSubmit(data: FormData) {
    if (vehicleImages.length === 0) {
      toast.error("Emvie alguma imagem do veículo!", {
        style: toastStyle,
      });
      return;
    }

    const vehicleImagesList = vehicleImages.map((vehicle) => {
      return {
        uid: vehicle.uid,
        name: vehicle.name,
        url: vehicle.url,
      };
    });

    await addDoc(collection(db, "vehicles"), {
      brand: data.brand,
      model: data.model,
      year: data.year,
      km: data.km,
      whatsapp: data.whatsapp,
      city: data.city,
      price: data.price,
      description: data.description,
      creationDate: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: vehicleImagesList,
    })
      .then(() => {
        toast.success("Veículo cadastrado com sucesso!", {
          style: toastStyle,
        });
        reset();
        setVehicleImages([]);
      })
      .catch(() => {
        toast.error("Ops, algo deu errado!", {
          style: toastStyle,
        });
      });
  }

  return (
    <Container>
      <DashboardHeader />

      <div className="w-full bg-white rounded-lg p-3 flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 border-gray-600 w-40 md:w-48 rounded-lg h-32">
          <label
            htmlFor="newImageInput"
            className="cursor-pointer w-40 md:w-48 h-full flex items-center justify-center"
          >
            <FiUpload size={30} color="#000000" />
          </label>
          <div hidden>
            <input
              type="file"
              name="newImageInput"
              id="newImageInput"
              accept="image/*"
              onChange={handleAddFile}
            />
          </div>
        </button>

        {vehicleImages.map((item) => (
          <div
            key={item.name}
            className="w-full h-32 flex items-center justify-center relative"
          >
            <img
              src={item.previewURL}
              alt="Foto do veículo"
              className="rounded-lg w-full h-32 object-cover"
            />
            <button
              className="absolute  text-white hover:text-red-600 transition-colors duration-300"
              onClick={() => handleDeleteImage(item)}
            >
              <FiTrash2 size={26} />
            </button>
          </div>
        ))}
      </div>

      <div className="w-full bg-white rounded-lg p-3 flex flex-col sm:flex-row items-center gap-2 mt-2 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col py-2 gap-4"
        >
          <Input
            type="text"
            name="brand"
            label="Marca do veículo"
            register={register}
            error={errors.brand?.message}
            placeholder="Ex: Honda"
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
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.description?.message}
              </p>
            )}
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
