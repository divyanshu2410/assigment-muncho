import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "../pages/Home";
import Category from "../pages/Category";
import Cart from "../pages/Cart";
import OrderConfirmation from "../pages/OrderConfirmed";

const ReloadHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
      navigate("/");
    }
  }, []);

  return null;
};

const AppRoutes = () => {
  return (
    <Router>
      <ReloadHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmed" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
