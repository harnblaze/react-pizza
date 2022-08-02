import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://62e2d90a3891dd9ba8f0e998.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(12)].map((_, id) => <Skeleton key={id} />)
          : pizzas.map((pizza) => (
              <PizzaBlock
                title={pizza.title}
                price={pizza.price}
                imageUrl={pizza.imageUrl}
                sizes={pizza.sizes}
                types={pizza.types}
                key={pizza.id}
              />
            ))}
      </div>
    </>
  );
}

export default Home;
