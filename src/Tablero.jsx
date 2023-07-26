import React from "react";
import "./tablero.css";
const Tablero = ({ tablero, filas, columnas }) => {
  return (
    <div
      className="tablero-container"
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${filas},20px)`,
        gridTemplateColumns: `repeat(${columnas},20px)`,
      }}
    >
      {tablero
        ? tablero.map((row, i, tableroArr) => {
            return row.map((cell, j, rowArr) => {
              return (
                <div
                  key={`${i}${j}`}
                  className={`${i}${j} ${cell === 1 ? "alive" : "dead"}`}
                ></div>
              );
            });
          })
        : ""}
    </div>
  );
};

export default Tablero;
