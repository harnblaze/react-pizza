import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeCategory } from "../redux/slices/filterSlice";
import { AppContext } from "../App";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

function Home() {
  const dispatch = useDispatch();
  const { categoryId, sort, order } = useSelector((state) => state.filterSlice);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPAge] = useState(1);

  const searchValue = useContext(AppContext);

  const onChangeCategory = (id) => {
    dispatch(changeCategory(id));
  };

  const changePage = (page) => {
    setCurrentPAge(page);
  };

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://62e2d90a3891dd9ba8f0e998.mockapi.io/items?${category}&page=${currentPage}&limit=4&sortBy=${
        sort.sortProperty
      }&order=${order ? "asc" : "desc"}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sort, order, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
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
      <Pagination currentPage={currentPage} onChangePage={changePage} />
    </div>
  );
}

export default Home;
