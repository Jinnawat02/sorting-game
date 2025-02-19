import { useState } from 'react';
import './App.css';
import BubbleSort from './components/BubbleSort';
import InsertionSort from './components/InsertionSort';
import MergeSort from './components/MergeSort';
import SelectionSort from './components/SelectionSort';
import Swal from 'sweetalert2'; // Import SweetAlert2

function App() {
  const [selectedSort, setSelectedSort] = useState(null);
  const [isGameActive, setIsGameActive] = useState(false); // State for the game
  const [randomAlgorithm, setRandomAlgorithm] = useState(null); // Random algorithm for the game
  const [guess, setGuess] = useState(''); // Track the user's guess

  // Function to start the game
  const startGame = () => {
    setIsGameActive(true);
    const algorithms = ['bubble', 'insertion', 'merge', 'selection'];
    const randomIndex = Math.floor(Math.random() * algorithms.length);
    setRandomAlgorithm(algorithms[randomIndex]); // Randomly select an algorithm
  };

  // Function to end the game
  const endGame = () => {
    setSelectedSort(null)
    setIsGameActive(false);
    setRandomAlgorithm(null); // Reset the random algorithm when the game ends
    setGuess(''); // Clear the guess when game ends
  };

  // Function to check if the guess is correct
  const checkGuess = () => {
    if (guess === randomAlgorithm) {
      Swal.fire({
        icon: 'success',
        title: 'Correct!',
        text: 'You guessed the right algorithm!',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Wrong Guess',
        text: 'Try again!',
      });
    }
    setGuess(''); // Clear the guess after checking
  };

  // Mapping of selectedSort to components
  const sortingComponents = {
    bubble: <BubbleSort isGameActive={isGameActive} />,
    insertion: <InsertionSort isGameActive={isGameActive} />,
    merge: <MergeSort isGameActive={isGameActive} />,
    selection: <SelectionSort isGameActive={isGameActive} />,
  };
  
  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen">
      <h1 className="text-black text-2xl font-bold">Sorting Algorithm Visualizer</h1>

      {/* Hide sorting buttons when the game is active */}
      {!isGameActive && (
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedSort('bubble')}
            className={`px-6 py-3 rounded-lg shadow-md transition-colors ${selectedSort === 'bubble' ? 'bg-gray-400 text-white' : 'bg-gray-900 text-white hover:bg-gray-600'}`}
          >
            Bubble Sort
          </button>
          <button
            onClick={() => setSelectedSort('insertion')}
            className={`px-6 py-3 rounded-lg shadow-md transition-colors ${selectedSort === 'insertion' ? 'bg-gray-400 text-white' : 'bg-gray-900 text-white hover:bg-gray-600'}`}
          >
            Insertion Sort
          </button>
          <button
            onClick={() => setSelectedSort('merge')}
            className={`px-6 py-3 rounded-lg shadow-md transition-colors ${selectedSort === 'merge' ? 'bg-gray-400 text-white' : 'bg-gray-900 text-white hover:bg-gray-600'}`}
          >
            Merge Sort
          </button>
          <button
            onClick={() => setSelectedSort('selection')}
            className={`px-6 py-3 rounded-lg shadow-md transition-colors ${selectedSort === 'selection' ? 'bg-gray-400 text-white' : 'bg-gray-900 text-white hover:bg-gray-600'}`}
          >
            Selection Sort
          </button>
        </div>
      )}

      <div className="mt-6 p-4 bg-white rounded-lg shadow-lg w-full max-w-full flex justify-center items-center min-h-[300px]">
        {/* Display the randomly selected algorithm when the game is active */}
        {isGameActive && sortingComponents[randomAlgorithm]}

        {/* Render the selected sort component when game is not active */}
        {!isGameActive && selectedSort && sortingComponents[selectedSort]}

        {!isGameActive && !selectedSort && <p className="text-gray-500">Select a sorting algorithm to visualize</p>}
      </div>

      {/* Dropdown for guessing the sorting algorithm */}
      {isGameActive && (
        <div className="space-x-4 mt-6">
          <select
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="px-6 py-3 rounded-lg shadow-md bg-gray-200 text-black"
          >
            <option value="">Select your algorithm</option>
            <option value="bubble">Bubble Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="selection">Selection Sort</option>
          </select>

          <button
            onClick={checkGuess}
            className="px-6 py-3 rounded-lg shadow-md bg-indigo-500 text-white hover:bg-indigo-600 mt-4"
          >
            Submit Guess
          </button>
          <br />
          <br />
          <div className="space-x-4 mt-6">
            <button
              onClick={endGame}
              className="px-6 py-3 rounded-lg shadow-md bg-red-500 text-white hover:bg-red-600"
            >
              End Game
            </button>
            <button
              onClick={startGame} // Re-run the startGame function to select a new random algorithm
              className="px-6 py-3 rounded-lg shadow-md bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Next Random Algorithm
            </button>
          </div>
        </div>
      )}

      {/* Button for the game */}
      <div className="mt-6">
        {!isGameActive && (
          <button
            onClick={startGame}
            className="px-6 py-3 rounded-lg shadow-md bg-indigo-500 text-white hover:bg-indigo-600"
          >
            Play Guess the Sorting Algorithm Game
          </button>
        )}
      </div>



    </div>
  );
}

export default App;
