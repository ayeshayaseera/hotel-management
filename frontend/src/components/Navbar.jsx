import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">

      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
      >
        <span className="logo-icon">🏨</span>
        <span>StayNest</span>
      </div>

      <div className="navbar-links">
        <button
          type="button"
          onClick={() => navigate("/")}
        >
          Hotels
        </button>
      </div>

    </nav>
  );
}

export default Navbar;