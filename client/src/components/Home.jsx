import React from "react";
import styles from "../css/Home.module.css";

import HorseList from "./HorseList";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <HorseList />
    </div>
  );
};

export default Home;
