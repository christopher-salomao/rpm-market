import { Container } from "../../../components/Container";
import { DashboardHeader } from "../../../components/PanelHeader";
// import Input from "../../../components/Input";
import { FiUpload } from "react-icons/fi";

function NewVehicle() {
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

      <div className="w-full bg-white rounded-lg p-3 flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form></form>
      </div>
    </Container>
  );
}

export default NewVehicle;
