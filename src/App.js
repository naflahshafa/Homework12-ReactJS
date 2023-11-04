import * as React from 'react';
import './index.css';
// import './App.css';

// Board yang menggambarkan papan permainan
function Board() {
  // Menggunakan React Hook useState untuk menyimpan status papan permainan
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);

  // Fungsi selectSquare dipanggil saat kotak pada papan permainan diklik
  function selectSquare(square) {
    // Memeriksa apakah ada pemenang atau kotak sudah diisi
    if (calculateWinner(squares) || squares[square]) {
      return;
    }

    // Mengganti isi kotak dengan "X" atau "O" sesuai giliran
    const newSquares = squares.slice();
    newSquares[square] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  // Fungsi restart digunakan untuk mengatur ulang papan permainan
  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // Fungsi renderSquare digunakan untuk membuat elemen tombol kotak
  function renderSquare(i) {
    return (
      <button className="bg-blue-300 border-2 border-blue-600 font-bold mr-[-1px] mt-[-1px] p-5 text-3xl w-16 h-16 hover:bg-blue-500" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  // Menghitung pemenang, giliran selanjutnya, dan status permainan
  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue);

  // Mengembalikan tampilan papan permainan
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="text-black p-4 inline-block">
        {status}
      </div>

      <div className="board-row flex justify-center">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row flex justify-center">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row flex justify-center">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="bg-blue-500 text-white p-4 mt-10 rounded" onClick={restart}>
        Restart
      </button>

    </div>
  );
}
  

/**
 * Komponen 'Game' yang memuat papan permainan
Komponen Game ini hanya menggabungkan Board ke dalam struktur tampilan game. Terdapat tiga fungsi yang digunakan untuk mengelola logika permainan:
calculateStatus(winner, squares, nextValue): Fungsi ini digunakan untuk menghitung status permainan, apakah ada pemenang, hasil seri, atau giliran pemain selanjutnya.
calculateNextValue(squares): Fungsi ini digunakan untuk menghitung giliran pemain selanjutnya ('X' atau 'O') berdasarkan isi kotak pada papan permainan.
calculateWinner(squares): Fungsi ini digunakan untuk memeriksa apakah ada pemenang pada permainan dengan memeriksa semua kemungkinan kombinasi yang menghasilkan pemenang.
 */

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Function App memanggil komponen Game dan akan dirender saat aplikasi dijalankan
function App() {
  return <Game />;
}

export default App;
