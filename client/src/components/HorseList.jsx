import React from "react";
import { io } from "socket.io-client";

import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../redux/slices/horseSlice";

import styles from "../css/HorseList.module.css";

const socket = io.connect("http://localhost:3002");

const HorseList = () => {
  const horses = useSelector((state) => state.horses.items);
  const [ticking, setTicking] = React.useState(false);
  const dispatch = useDispatch();

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
      dispatch(setItems(data));
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
                <h2>
                  {horse.distance === 1000
                    ? "Finished"
                    : "Distance: " + horse.distance}
                </h2>
              </div>
              <progress min={0} max={1000} value={horse.distance}></progress>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HorseList;
