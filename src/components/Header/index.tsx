import { Link } from "react-router-dom";
import { FiUser, FiLogIn } from "react-icons/fi";
import logo from "../../assets/logo.png";

function Header() {
  const signed = false;
  const loadingAuth = false;

  return (
    <header className="w-full flex items-center justify-center px-4 py-2 bg-white drop-shadow mb-4">
      <div className="w-full max-w-7xl flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo do site" className="w-18 object-contain" />
        </Link>

        {!loadingAuth && signed && (
          <Link to={"/dashboard"} className="border-2 rounded-full p-1">
            <FiUser size={28} />
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to={"/login"}>
            <FiLogIn size={28} />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
