import React, { useEffect, useRef, useState } from "react";
import { changeSort, changeOrder } from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Sort() {
  const sortNames = [
    { sortName: "популярности", sortProperty: "rating" },
    { sortName: "цене", sortProperty: "price" },
    {
      sortName: "алфавиту",
      sortProperty: "title",
    },
  ];
  const { sort, order } = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();
  const sortRef = useRef();
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  useEffect(() => {
    const handleCLick = (event) => {
      if (!event.path.includes(sortRef.current)) {
        console.log(false);
        setIsOpenPopup(false);
      }
    };
    document.body.addEventListener("click", handleCLick);
    return () => document.body.removeEventListener("click", handleCLick);
  }, []);

  const togglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const onChangeSort = (sort) => {
    togglePopup();
    dispatch(changeSort(sort));
  };

  const onChangeOrder = () => {
    dispatch(changeOrder());
  };

  return (
    <div className="sort" ref={sortRef}>
      <div className={order ? "sort__label" : "sort__label sort__label_down"}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b onClick={onChangeOrder}>Сортировка по:</b>
        <span onClick={togglePopup}>{sort.sortName}</span>
      </div>
      {isOpenPopup && (
        <div className="sort__popup">
          <ul>
            {sortNames.map((sortType) => (
              <li
                onClick={() => onChangeSort(sortType)}
                className={sort.sortName === sortType.sortName ? "active" : ""}
                key={sortType.sortName}
              >
                {sortType.sortName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
