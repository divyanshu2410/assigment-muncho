import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./CategoryDropdown.css"; // Import CSS file
import { FaRegSquareCaretUp } from "react-icons/fa6";
import { FaRegSquareCaretDown } from "react-icons/fa6";

const CategoryDropdown = ({ categories, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(
    categories[0] || "FOOD"
  );

  const menuItems = ["Appetizers", "South Indian", "Chinese", "North Indian"];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    onSelectCategory(category);
  };

  const icons = [<FaRegSquareCaretUp />, <FaRegSquareCaretDown />];

  return (
    <div>
      <div style={{ paddingBottom: "20px", display: "flex", gap: "10px" }}>
        <div className="dropdown">
          <button onClick={() => setOpen(false)} className="dropdown-btn">
            <FaRegSquareCaretUp color="green" size={30} />
            {false ? (
              <IoIosArrowUp className="icon" />
            ) : (
              <IoIosArrowDown className="icon" />
            )}
          </button>

          {open && (
            <div className="dropdown-menu">
              {icons?.map((icons) => (
                <div key={icons} className="dropdown-item">
                  {icons}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>
      <div className="category-container">
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-button">
            {selectedCategory}
            {isOpen ? (
              <IoIosArrowUp className="icon" />
            ) : (
              <IoIosArrowDown className="icon" />
            )}
          </button>

          {isOpen && (
            <div className="dropdown-menu">
              {categories?.map((category) => (
                <div
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="dropdown-item"
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="menu-container">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`menu-item ${index === 0 ? "active" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
