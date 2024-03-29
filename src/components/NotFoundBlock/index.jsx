import React from "react";

import styles from "./NotFound.module.scss";

function NotFound() {
  return (
    <div className={styles.root}>
      <h1>
        <span className="icon">😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалени данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
}

export default NotFound;
