import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";

function Dashboard() {
  return (
    <section>
      <h1>Dashboard</h1>
      <button
        onClick={() => signOut(auth)}
        className="bg-red-600 px-3 h-10 rounded-sm cursor-pointer hover:bg-red-700 transition-colors duration-300 border-2 border-zinc-900 text-white font-medium text-lg"
      >
        Sair
      </button>
    </section>
  );
}

export default Dashboard;
