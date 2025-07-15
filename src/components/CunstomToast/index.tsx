import toast from "react-hot-toast";

export function showConfirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const toastId = toast.custom((t) => (
      <div
        className={`bg-black border border-gray-200 shadow-lg rounded-lg p-4 w-80 flex flex-col gap-4 transition-all ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <p className="text-white font-medium text-center">{message}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              toast.dismiss(toastId);
              resolve(false);
            }}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Não
          </button>
          <button
            onClick={() => {
              toast.dismiss(toastId);
              resolve(true);
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 transition"
          >
            Sim
          </button>
        </div>
      </div>
    ));
  });
}
