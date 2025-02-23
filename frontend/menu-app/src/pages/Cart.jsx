import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import PaySlider from "../components/PaySlider";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCart = location.state?.cart || {};
  const categoryData = location.state?.categoryData || {};
  const [cart, setCart] = useState(initialCart);

  const totalPrice = Object.entries(cart).reduce((total, [itemId, qty]) => {
    const item = categoryData.categories
      ?.flatMap((cat) => cat.items)
      ?.find((i) => i.id === itemId);
    return total + (item ? item.price * qty : 0);
  }, 0);

  const recommendedItems = categoryData?.categories
    ?.flatMap((cat) => cat.items)
    ?.filter((item) => !cart[item.id]);

  const updateQuantity = (itemId, delta) => {
    setCart((prevCart) => {
      const updatedQty = (prevCart[itemId] || 0) + delta;
      if (updatedQty <= 0) {
        const newCart = { ...prevCart };
        delete newCart[itemId];
        return newCart;
      }
      return { ...prevCart, [itemId]: updatedQty };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "#fff",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          background: "#5a2ec7",
          height: "60px",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
        }}
      >
        <div
          onClick={() => navigate(-1)}
          style={{ position: "absolute", left: "10px", cursor: "pointer" }}
        >
          <IoIosArrowBack />
        </div>
        CART
      </div>

      <div style={{ padding: "15px" }}>
        <h3>Ordered menu</h3>
        <div
          style={{
            background: "#222",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          {Object.entries(cart).flatMap(([itemId, qty]) =>
            categoryData?.categories
              ?.flatMap((cat) => cat.items)
              ?.filter((i) => i.id === itemId)
              ?.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "40px", borderRadius: "5px" }}
                    />
                    {item.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "transparent",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    {qty}x
                    <button
                      style={{
                        backgroundColor: "transparent",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                    <span>${item.price * qty}</span>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {recommendedItems && recommendedItems.length > 0 && (
        <div
          style={{ padding: "15px", marginTop: "40px", paddingBottom: "100px" }}
        >
          <h3 style={{ textAlign: "center" }}>Complete Your Meal With</h3>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "10px",
              padding: "10px",
            }}
          >
            {recommendedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  // width: "160px",
                  // height: "210px",
                  background: "#222",
                  borderRadius: "10px",
                  padding: "10px",
                  textAlign: "center",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ width: "100%", height: "100px", overflow: "hidden" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      // width: "100%",
                      // height: "100px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <h4
                  style={{ fontSize: "14px", margin: "5px 0", color: "#fff" }}
                >
                  {item.name}
                </h4>
                <p style={{ color: "#ddd", fontSize: "14px", margin: "5px 0" }}>
                  ${item.price}
                </p>
                <button
                  style={{
                    // background: "#5a2ec7",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    fontSize: "14px",
                    cursor: "pointer",
                    border: "1px solid white",
                    width: "100%",
                  }}
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  + ADD
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "95%",
          background: "#111",
          padding: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
          }}
        >
          <div>Final Bill</div>
          <div>${totalPrice}</div>
        </div>
        <div style={{ marginTop: "20px", paddingBottom: "20px" }}>
          <PaySlider totalPrice={totalPrice} />
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
