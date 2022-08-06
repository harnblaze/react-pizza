import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

function Home({searchValue}) {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentPage, setCurrentPAge] = useState(1);
  const [activeSort, setActiveSort] = useState({
    sortName: "популярности",
    sortProperty: "rating",
  });
  const [order, setOrder] = useState(true);

  const changeCategory = (id) => {
    setActiveCategory(id);
  };

  const changeSort = (sort) => {
    setActiveSort(sort);
  };

  const changeOrder = (order) => {
    setOrder(order);
  };

  const changePage = (page) => {
    setCurrentPAge(page)
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://62e2d90a3891dd9ba8f0e998.mockapi.io/items?category=${
        activeCategory || ""
      }&page=${currentPage}&limit=4&sortBy=${activeSort.sortProperty}&order=${order ? "asc" : "desc"}&search=${searchValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [activeCategory, activeSort, order, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={activeCategory}
          onChangeCategory={changeCategory}
        />
        <Sort
          activeSort={activeSort}
          onChangeSort={changeSort}
          order={order}
          onChangeOrder={changeOrder}
        />
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
      <Pagination currentPage={currentPage} onChangePage={changePage}/>
    </div>
  );
}

export default Home;
