import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Category from "../pages/Category";
import Cart from "../pages/Cart";
import OrderConfirmation from "../pages/OrderConfirmed";

const AppRoutes = () => {
  return (
    <Router>
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
