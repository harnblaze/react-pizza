import React from "react";

export default function Categories({ categoryId, onChangeCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, id) => (
          <li
            onClick={() => onChangeCategory(id)}
            className={categoryId === id ? "active" : ""}
            key={category}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
