const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const settings = require("./data/theme.json");
const menu = require("./data/menu.json");

app.get("/api/theme", (req, res) => {
  res.json(settings);
});

app.get("/api/menu", (req, res) => {
  res.json(menu);
});

app.get("/api/food-list", (req, res) => {
  res.json(menu);
  // const categoryId = req.params.categoryId;

  // const categoryData = menu.categories.find((cat) => cat.id === categoryId);

  // if (!categoryData) {
  //   return res.status(404).json({ message: "Category not found" });
  // }

  // const additionalData = {
  //   additionalInfo: "This category contains delicious food items!",
  //   timestamp: new Date().toISOString(),
  // };

  // const updatedCategory = { ...categoryData, ...additionalData };

  // res.json(updatedCategory);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
