import { useState } from 'react';
import generateRandomArray from '../service/GenerateRandomArray';

const InsertionSort = ({ isGameActive }) => {
  const [arr, setArr] = useState(generateRandomArray(6, 100));
  const [isSorting, setIsSorting] = useState(false);
  const [comparedIndices, setComparedIndices] = useState([-1, -1]);  // Store indices of compared elements
  const [swappingIndices, setSwappingIndices] = useState([-1, -1]);  // Track indices of swapped elements
  const [noSwapIndices, setNoSwapIndices] = useState([-1, -1]);  // Track indices where no swap happens

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const insertionSort = async () => {
    setIsSorting(true);
    let newArr = [...arr];

    for (let i = 1; i < newArr.length; i++) {
      let key = newArr[i];
      let j = i - 1;
      let swapped = false;

      // Compare the current element with the previous one
      setComparedIndices([i, j]);
      setArr([...newArr]);
      await sleep(1000);

      let firstTime = true;
      while (j >= 0 && newArr[j] > key) {
        // Swap: Shift the larger element
        newArr[j + 1] = newArr[j];
        newArr[j] = key;
        swapped = true;

        if (firstTime) {
          firstTime = false;
        } else {
          setComparedIndices([j, j + 1]);
          await sleep(1000);
        }

        setSwappingIndices([j, j + 1]); // Green for swapping elements
        setArr([...newArr]);
        await sleep(1000);

        setComparedIndices([-1, -1]);
        setSwappingIndices([-1, -1]);

        j--;
      }

      // If no swap happened, highlight in red
      if (!swapped) {
        setNoSwapIndices([i, j]);
        setArr([...newArr]);
        await sleep(1000);
        setNoSwapIndices([-1, -1]);
        setComparedIndices([-1, -1]);
      }

      newArr[j + 1] = key;
      setArr([...newArr]);

      await sleep(1000);
      setComparedIndices([-1, -1]);
    }
    setIsSorting(false);
  };

  const resetArray = () => {
    setArr(generateRandomArray(6, 100));
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">

      {/* Visualizing the array state */}
      <div className="flex space-x-4">
        {arr.map((num, index) => {
          let bgColor = 'bg-blue-500'; // Default color

          if (comparedIndices.includes(index)) {
            bgColor = 'bg-yellow-500'; // Yellow for comparing
          }

          if (swappingIndices.includes(index)) {
            bgColor = 'bg-green-500'; // Green for swapping
          }

          if (noSwapIndices.includes(index)) {
            bgColor = 'bg-red-500'; // Red for no swap
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

      {/* Labels */}
      {!isGameActive && (
        <div className="space-x-4 mt-4 text-lg">
          <span className="text-yellow-500">Yellow: Comparing</span>
          <span className="text-green-500">Green: Successful Swap</span>
          <span className="text-red-500">Red: No Swap</span>
        </div>
      )}

      {/* Buttons */}
      <div className="space-x-4 mt-6">
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="p-3 bg-gray-900 text-white rounded-lg shadow-lg disabled:bg-gray-400 transition-all duration-300 ease-in-out"
        >
          Reset Array
        </button>
        <button
          onClick={insertionSort}
          disabled={isSorting}
          className="p-3 bg-blue-500 text-white rounded-lg shadow-lg disabled:bg-gray-400 transition-all duration-300 ease-in-out"
        >
          {isSorting ? 'Sorting...' : 'Start Sorting'}
        </button>
      </div>
    </div>
  );
};

export default InsertionSort;
