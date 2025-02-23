import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import ImageCarousel from "../components/ImageCarousel";
import { motion } from "framer-motion";
import CategoryDropdown from "../components/Dropdown";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryRefs = useRef({});

  useEffect(() => {
    fetch(`https://assigment-muncho.onrender.com/api/food-list`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data);
        const defaultCategory = data.categories.find(
          (cat) => cat.categoryName === "Liquor"
        )
          ? "Liquor"
          : data.categories[0]?.categoryName;
        setSelectedCategory(id);
        console.log("defaultCategory", id);
        setTimeout(() => scrollToCategory(id));
      });
  }, [id]);

  const scrollToCategory = (categoryName) => {
    // console.log("categoryName", categoryRefs.current);
    const categoryElement = categoryRefs.current[categoryName];
    // console.log("categoryElement", categoryElement);
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: prev[item.id] ? prev[item.id] + 1 : 1,
    }));
  };

  const removeFromCart = (item) => {
    setCart((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[item.id] > 1) {
        updatedCart[item.id] -= 1;
      } else {
        delete updatedCart[item.id];
      }
      return updatedCart;
    });
  };

  const totalPrice = Object.entries(cart).reduce((total, [itemId, qty]) => {
    console.log("categoryData.categories 1123213", categoryData.categories);
    const item = categoryData.categories
      .flatMap((cat) => cat.items)
      .find((i) => i.id === itemId);
    return total + (item ? item.price * qty : 0);
  }, 0);

  if (!categoryData)
    return <p style={{ color: "#fff", textAlign: "center" }}>Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "#000",
        minHeight: "100vh",
        width: "100vw",
        color: "#fff",
        overflow: "scroll",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          background: "#5a2ec7",
          height: "60px",
          fontSize: "30px",
        }}
      >
        <div
          onClick={() => navigate(`/`)}
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IoIosArrowBack />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          ATLANTIS
        </div>
      </div>

      <ImageCarousel />

      <div style={{ padding: "10px" }}>
        <CategoryDropdown
          categories={categoryData.categories.map((cat) => cat.categoryName)}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            scrollToCategory(category);
          }}
        />
      </div>

      <div style={{ display: "grid", gap: "20px", padding: "10px" }}>
        {categoryData.categories.map((category) => (
          <div
            key={category.id}
            ref={(el) => (categoryRefs.current[category.categoryName] = el)}
          >
            <div
              style={{
                color: "#fff",
                fontSize: "22px",
                fontWeight: "bold",
                textAlign: "left",
                paddingBottom: "10px",
              }}
            >
              {category.categoryName}
            </div>

            <div style={{ display: "grid", gap: "15px" }}>
              {category.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    background: "#222",
                    borderRadius: "10px",
                    padding: "10px",
                    color: "#fff",
                    gap: "20px",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      borderRadius: "10px",
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <div style={{ fontSize: "18px" }}>{item.name}</div>
                    <div style={{ fontSize: "12px", color: "#aaa" }}>
                      {item.description}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>${item.price}</div>
                      <div>
                        {cart[item.id] ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <button
                              onClick={() => removeFromCart(item)}
                              style={{
                                background: "#444",
                                color: "#fff",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                border: "none",
                              }}
                            >
                              -
                            </button>
                            <span>{cart[item.id]}</span>
                            <button
                              onClick={() => addToCart(item)}
                              style={{
                                background: "#5a2ec7",
                                color: "#fff",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                border: "none",
                              }}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            style={{
                              // background: "#5a2ec7",
                              color: "#fff",
                              padding: "8px",
                              borderRadius: "5px",
                              border: "1px solid white",
                            }}
                          >
                            + ADD
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(cart).length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "95%",
            height: "60px",
            background: "#222",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#fff" }}>
            Total: ${totalPrice}
          </div>
          <button
            onClick={() =>
              navigate("/cart", {
                state: { cart: cart, categoryData: categoryData },
              })
            }
            style={{
              background: "#5a2ec7",
              color: "#fff",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Proceed to Cart
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Category;
