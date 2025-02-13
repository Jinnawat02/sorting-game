import { useState } from 'react';
import generateRandomArray from '../service/GenerateRandomArray';

const BubbleSort = () => {
  const [arr, setArr] = useState(generateRandomArray(6, 100));
  const [isSorting, setIsSorting] = useState(false);
  const [comparedIndices, setComparedIndices] = useState([-1, -1]);  // Store indices of compared elements
  const [swapResult, setSwapResult] = useState(null); // Track if swap was successful

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr.length - i - 1; j++) {
        setComparedIndices([j, j + 1]); // Highlight the elements being compared

        // Wait before the swap (to track comparison visually)
        await sleep(1000); // Reduced the delay for better interactivity

        // Compare and swap elements if necessary
        if (newArr[j] > newArr[j + 1]) {
          // Swap elements
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
          setSwapResult('success'); // Mark swap as successful
          setArr([...newArr]);
        } else {
          setSwapResult('fail'); // No swap, mark as failure
        }

        // Hold after swap (for visual tracking)
        await sleep(1000); // Hold for 1 second after the swap

        // Reset the states after comparison/swap
        setSwapResult(null);
        setComparedIndices([-1, -1]);
      }
    }
    setIsSorting(false);
  };

  const resetArray = () => {
    setArr(generateRandomArray(6, 100));  // Reset the array to a new random array
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-4">Bubble Sort Visualization</h1>

      {/* Visualizing the array state */}
      <div className="flex space-x-4">
        {arr.map((num, index) => {
          let bgColor = 'bg-blue-500'; // Default background color

          // Highlight elements being compared
          if (comparedIndices.includes(index)) {
            bgColor = 'bg-yellow-500'; // Yellow for elements being compared
          }

          // If the swap was successful, change the color to green
          if (swapResult === 'success' && (index === comparedIndices[0] || index === comparedIndices[1])) {
            bgColor = 'bg-green-500'; // Green for successful swap
          }

          // If no swap was needed, change the color to red
          if (swapResult === 'fail' && (index === comparedIndices[0] || index === comparedIndices[1])) {
            bgColor = 'bg-red-500'; // Red for failed swap (no swap made)
          }

          return (
            <div
              key={index}
              className={`h-24 w-24 flex items-center justify-center text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out ${bgColor}`}
            >
              {num}
            </div>
          );
        })}
      </div>

      {/* Labels and Instructions */}
      <div className="space-x-4 mt-4 text-lg">
        <span className="text-yellow-500">Yellow: Comparing</span>
        <span className="text-green-500">Green: Successful Swap</span>
        <span className="text-red-500">Red: No Swap</span>
      </div>

      {/* Action buttons for resetting and starting sorting */}
      <div className="space-x-4 mt-6">
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="p-3 bg-gray-900 text-white rounded-lg shadow-lg disabled:bg-gray-400 transition-all duration-300 ease-in-out"
        >
          Reset Array
        </button>
        <button
          onClick={bubbleSort}
          disabled={isSorting}
          className="p-3 bg-blue-500 text-white rounded-lg shadow-lg disabled:bg-gray-400 transition-all duration-300 ease-in-out"
        >
          {isSorting ? 'Sorting...' : 'Start Sorting'}
        </button>
      </div>
    </div>
  );
};

export default BubbleSort;
