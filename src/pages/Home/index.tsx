import { useState } from "react";

import { Container } from "../../components/Container";
import { FaSearch } from "react-icons/fa";

function Home() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <Container>
      <form className="w-full max-w-5xl bg-white p-4 rounded-lg flex items-center justify-between gap-4 mt-6">
        <input
          type="text"
          placeholder="Digite o modelo do veículo..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="grow border border-zinc-500 px-2 h-9 rounded-sm outline-none"
        />
        <button
          type="submit"
          className="bg-red-600 px-3 h-9 rounded-sm cursor-pointer hover:bg-red-700 transition-colors duration-300"
        >
          <FaSearch size={24} color="#ffffff" />
        </button>
      </form>

      <h1 className="text-2xl font-medium mt-6 mb-4">
        Veículos novos e usados em todo o Brasil
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white px-2 py-4 rounded-lg hover:scale-101 transition-all duration-300">
          <img
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202503/20250324/jaguar-fpace-2-0-16v-turbo-diesel-prestige-awd-4p-automatico-wmimagem19432660035.webp?s=fill&w=552&h=414&q=60"
            alt="Veículo"
            className="w-full max-h-72 object-contain rounded mb-2"
          />
          <p className="font-bold mt-1 mb-2">
            Jaguar F-Pace 2.0 16v Turbo Diesel
          </p>
          <div className="flex flex-col border-b-2 border-zinc-300">
            <span className="text-zinc-700 mb-6">Ano 2018/2018 • 49.500km</span>
            <strong className="text-red-600 text-xl mb-2">R$ 179.900</strong>
          </div>
          <div className="mt-2">
            <span className="text-zinc-700">Belo Horizonte - MG</span>
          </div>
        </section>


      </main>
    </Container>
  );
}

export default Home;
