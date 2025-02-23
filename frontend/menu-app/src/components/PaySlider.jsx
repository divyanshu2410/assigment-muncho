import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PaySlider = ({ totalPrice }) => {
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  const handleComplete = () => {
    setIsPaid(true);
    setTimeout(() => navigate("/order-confirmed"), 600);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "360px",
        background: "#4B23A0",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 250 }}
        onDragEnd={(event, info) => {
          if (info.point.x > 200) {
            handleComplete();
          }
        }}
        style={{
          width: "50px",
          height: "50px",
          background: "#fff",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "absolute",
          left: "10px",
        }}
      >
        <ArrowRight color="#4B23A0" size={24} />
      </motion.div>

      <p style={{ color: "#fff", fontSize: "18px", fontWeight: "bold" }}>
        {isPaid ? "Processing..." : `PAY NOW  $${totalPrice}`}
      </p>
    </div>
  );
};

export default PaySlider;
