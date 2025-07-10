import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Logo" className="w-24 object-contain" />
      </Link>

    </header>
  );
}

export default Header;
