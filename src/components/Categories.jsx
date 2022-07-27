import React, { useState } from "react";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const clickCategoryHandler = (id) => {
    setActiveCategory(id);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, id) => (
          <li
            onClick={() => clickCategoryHandler(id)}
            className={activeCategory === id ? "active" : ""}
            key={category}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
