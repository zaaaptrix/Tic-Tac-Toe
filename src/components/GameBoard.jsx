

export default function GameBoard({onSelectSquare, board}){

    // const[gameBoard, setBoard] = useState(initialGameBoard);

    // Not recommended as states should be updated in an immutable way
    /*// function handleSquares(rowIndex, colIndex){
    //     setBoard((prevGameBoard) => {
    //         prevGameBoard[rowIndex][colIndex] = 'X';
    //         return prevGameBoard;
    //     });
    // }*/

    // function handleSquares(rowIndex, colIndex){
    //     setBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }


    //Lifting the state

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => 
              <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) =>
                        <li key={colIndex}>
                          <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                        </li>
                    )}  
                </ol>
              </li>
            )}
        </ol>
    );
}