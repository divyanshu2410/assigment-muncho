import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ margin: "10px" }}>
        Home
      </Link>
      <Link to="/menu" style={{ margin: "10px" }}>
        Menu
      </Link>
      <Link to="/cart" style={{ margin: "10px" }}>
        Cart
      </Link>
    </nav>
  );
};

export default Navbar;
