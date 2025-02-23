import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [settings, setSettings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/theme")
      .then((res) => res.json())
      .then((data) => {
        // console.log("Data - ", data);
        setSettings(data);
      });
  }, []);

  if (!settings) return <p>Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: settings.theme.backgroundColor,
        color: settings.theme.textColor,
        minHeight: "100vh",
        textAlign: "center",
        overflow: "scroll",
      }}
    >
      <div style={{ marginTop: "60px" }}>
        <div style={{ fontSize: "20px", fontWeight: "300" }}>WELCOME TO</div>
        <div style={{ fontSize: "30px", fontWeight: "bold" }}>
          {settings.appTitle}
        </div>
      </div>

      <img
        src={settings.logo}
        alt="Atlantis Logo"
        style={{ width: "50%", margin: "20px auto" }}
      />

      <div style={{ fontSize: "18px", opacity: "0.7" }}>{settings.table}</div>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder={settings.searchPlaceholder}
          style={{
            padding: "10px",
            width: "100%",
            height: "20px",
            maxWidth: "350px",
            borderRadius: "8px",
            border: "none",
            background: "#333",
            color: "#fff",
            outline: "none",
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          padding: "20px",
        }}
      >
        {settings?.categories &&
          settings?.categories?.map((category) => (
            <motion.div
              key={category.id}
              onClick={() => navigate(`/category/${category.name}`)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              style={{
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              <img
                src={category.image}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>
          ))}
      </div>

      <div style={{ marginTop: "100px", paddingBottom: "40px" }}>
        <img
          src={settings.muncho_logo}
          style={{ width: "30%", height: "30%", objectFit: "cover" }}
        />
      </div>
    </motion.div>
  );
};

export default Home;
