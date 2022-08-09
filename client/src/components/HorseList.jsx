import React from "react";
import { io } from "socket.io-client";

import styles from "../css/HorseList.module.css";

const socket = io.connect("http://localhost:3002");

const HorseList = () => {
  const [horses, setHorses] = React.useState([]);
  const [ticking, setTicking] = React.useState(false);

  const onClickStart = () => {
    if (!ticking) {
      socket.emit("start");
      setTicking(true);
    }
  };

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected by socket: ", socket.id);
    });

    socket.on("ticker", (data) => {
      setHorses(data);
      console.log("tick");
    });

    socket.on("disconnect", () => setTicking(false));
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.btnWrapper}>
        <button onClick={onClickStart}>Start</button>
      </div>
      <ul>
        {!ticking && <h3>Horses not Found, click on "Start" button</h3>}
        {horses.map((horse) => {
          return (
            <li key={horse.name}>
              <div className={styles.horseInfo}>
                <h2>{horse.name}</h2>
                <h2>Distance: {horse.distance}</h2>
              </div>
              <input
                type="range"
                min={0}
                max={1000}
                value={horse.distance}
                readOnly
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HorseList;
