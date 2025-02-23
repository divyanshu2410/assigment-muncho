import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        background: "#1a1a1a",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Confetti width={width} height={height} />
      <div style={{ fontSize: "25px" }}>Your Order Has Been Placed! 🎉</div>
      {/* <div>Redirecting to Home...</div> */}
    </div>
  );
};

export default OrderConfirmation;
