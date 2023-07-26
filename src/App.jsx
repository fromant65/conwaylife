import { useEffect, useState } from "react";
import "./App.css";
import Tablero from "./Tablero";
import "./tablero.css";
const filas = 30;
const columnas = 30;

function App() {
  const [tablero, setTablero] = useState(null);
  const [generacion, setGeneracion] = useState(0);
  useEffect(() => {
    tablero && generacion % 100 !== 0
      ? setTablero(updateTablero(tablero, filas, columnas))
      : setTablero(crearTablero(filas, columnas));
    setGeneracion(generacion + 1);
  }, [tablero, generacion]);

  return (
    <div>
      <Tablero tablero={tablero} filas={filas} columnas={columnas} />
    </div>
  );
}

function crearTablero(x, y) {
  let tablero = new Array(x);
  for (let row = 0; row < x; row++) {
    tablero[row] = new Array(y);
    for (let col = 0; col < y; col++) {
      //Tablero random
      tablero[row][col] = Math.round(Math.random());

      //Glider
      /*
      if (
        (row === 4 && col === 4) ||
        (row === 4 && col === 6) ||
        (row === 5 && col === 5) ||
        (row === 5 && col === 6) ||
        (row === 6 && col === 5)
      ) {
        tablero[row][col] = 1;
      } else {
        tablero[row][col] = 0;
      }
      */
    }
  }
  return tablero;
}

function updateTablero(tablero, x, y) {
  let newTablero = tablero.map((fila) => fila.slice());
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      let cell = tablero[i][j];
      let count = contarVecinos(tablero, i, j);
      if (count < 2 || count > 3) {
        newTablero[i][j] = 0;
      } else if ((count === 2 || count === 3) && cell === 1) {
        newTablero[i][j] = 1;
      } else if (count === 3 && cell === 0) {
        newTablero[i][j] = 1;
      }
    }
  }
  return newTablero;
}

function contarVecinos(tablero, x, y) {
  let count = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let cellX = (x + i + filas) % filas;
      let cellY = (y + j + columnas) % columnas;
      count += tablero[cellX][cellY];
    }
  }
  count -= tablero[x][y];
  return count;
}

export default App;
