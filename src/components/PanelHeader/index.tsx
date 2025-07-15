import { Link } from "react-router-dom";

import { auth } from "../../services/firebaseConnection"
import { signOut, deleteUser, type User } from "firebase/auth";

import { showConfirm } from "../CunstomToast";

export function DashboardHeader() {
  async function handleLogout() {
    const confirmed = await showConfirm("Tem certeza que deseja sair?");
    if (confirmed) {
      await signOut(auth);
    }
  }

  async function handleDeleteUser() {
    const confirmed = await showConfirm("Tem certeza que deseja excluir sua conta? Essa acão não pode ser desfeita.");
    if (confirmed) {
      await deleteUser(auth.currentUser as User);
    }
  }

  return (
    <div className="flex items-center justify-between bg-zinc-900 w-full text-white py-3 px-4 rounded-lg mb-4">
      <div>
        <Link to={"/dashboard"} className="mr-4 hover:underline">
          Deshboard
        </Link>
        <Link to={"/dashboard/novo-veiculo"} className="hover:underline">
          Cadastrar veículo
        </Link>
      </div>
      <div className="text-red-500">
        <button onClick={handleLogout} className="mr-4 hover:underline">
          Sair
        </button>
        <button onClick={handleDeleteUser} className="hover:underline">Excluir conta</button>
      </div>
    </div>
  );
}
