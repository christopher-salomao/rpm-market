import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

import { Spinner } from "@/components/Spinner";
import { Container } from "@/components/Container";
import { FaWhatsapp } from "react-icons/fa";

import type { VehicleProps } from "@/interfaces/VehicleProps";

function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<VehicleProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVehicle() {
      if (!id) navigate("/", { replace: true });

      const docRef = doc(db, "vehicles", id!);
      getDoc(docRef).then((snapshot) => {
        setVehicle({
          id: snapshot.id,
          name: snapshot.data()?.name,
          model: snapshot.data()?.model,
          year: snapshot.data()?.year,
          km: snapshot.data()?.km,
          whatsapp: snapshot.data()?.whatsapp,
          city: snapshot.data()?.city,
          price: snapshot.data()?.price,
          description: snapshot.data()?.description,
          creationDate: snapshot.data()?.creationDate,
          owner: snapshot.data()?.owner,
          uid: snapshot.data()?.uid,
          images: snapshot.data()?.images,
        });
        setLoading(false);
      });
    }

    loadVehicle();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <h1>Slider</h1>

      {vehicle && (
        <main className="w-full bg-white rounded p-6 my-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 text-3xl font-bold">
            <h1>{vehicle?.name}</h1>
            <h2 className="text-red-500">
              {Number(vehicle.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>
          </div>
          <p>{vehicle?.model}</p>
          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>Cidade</p>
                <strong>{vehicle?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{vehicle?.year}</strong>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p>Quilômetros rodados</p>
                <strong>{vehicle?.km} km</strong>
              </div>
            </div>
          </div>

          <h2 className="font-bold">Descrição:</h2>
          <p className="mb-4">{vehicle?.description}</p>

          <h2 className="font-bold">Telefone / WhatsApp:</h2>
          <p>{vehicle?.whatsapp}</p>

          <a
            href=""
            className="w-full flex items-center justify-center px-4 py-2 text-white text-xl font-medium border gap-2 mt-4 bg-green-600 rounded-md drop-shadow"
          >
            Conversar com o vendedor
            <FaWhatsapp size={24} />
          </a>
        </main>
      )}
    </Container>
  );
}

export default VehicleDetail;
