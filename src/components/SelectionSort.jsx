import { useState } from 'react';
import generateRandomArray from '../service/GenerateRandomArray';

const SelectionSort = ({ isGameActive }) => {
  const [arr, setArr] = useState(generateRandomArray(6, 100));
  const [isSorting, setIsSorting] = useState(false);
  const [comparedIndex, setComparedIndex] = useState(null);
  const [minIndex, setMinIndex] = useState(null);
  const [sortedUpTo, setSortedUpTo] = useState(-1);
  const [isSorted, setIsSorted] = useState(false);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const selectionSort = async () => {
    let newArr = [...arr];
    setIsSorting(true);
    setIsSorted(false);

    for (let i = 0; i < newArr.length - 1; i++) {
      let minIdx = i;
      setMinIndex(minIdx);
      await sleep(1000);

      for (let j = i + 1; j < newArr.length; j++) {
        setComparedIndex(j);
        await sleep(1000);

        if (newArr[j] < newArr[minIdx]) {
          minIdx = j;
          setMinIndex(minIdx);
          await sleep(1000);
        }
      }

      if (minIdx !== i) {
        [newArr[i], newArr[minIdx]] = [newArr[minIdx], newArr[i]];
        setArr([...newArr]);
      }

      setSortedUpTo(i);
      setComparedIndex(null);
      setMinIndex(null);
      await sleep(1000);
    }

    setSortedUpTo(newArr.length - 1);
    setIsSorting(false);
    setIsSorted(true);
  };

  const resetArray = () => {
    setArr(generateRandomArray(6, 100));
    setSortedUpTo(-1);
    setComparedIndex(null);
    setMinIndex(null);
    setIsSorted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="flex space-x-4">
        {arr.map((num, index) => {
          let bgColor = 'bg-blue-500';
          if (!isSorted) {
            if (comparedIndex === index) bgColor = 'bg-yellow-500';
            if (minIndex === index) bgColor = 'bg-green-500';
            if (index <= sortedUpTo) bgColor = 'bg-gray-500';
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
      {!isGameActive && (
        <div className="space-x-4 mt-4 text-lg">
          <span className="text-yellow-500">Yellow: Comparing</span>
          <span className="text-green-500">Green: Minimum Element</span>
          <span className="text-gray-400">Gray: Sorted Elements</span>
        </div>
      )}
      <div className="space-x-4 mt-6">
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="p-3 bg-gray-900 text-white rounded-lg shadow-lg disabled:bg-gray-400 transition-all duration-300 ease-in-out"
        >
          Reset Array
        </button>
        <button
          onClick={selectionSort}
          disabled={isSorting}
          className="p-3 bg-blue-500 text-white rounded-lg shadow-lg disabled:bg-gray-400 transition-all duration-300 ease-in-out"
        >
          {isSorting ? 'Sorting...' : 'Start Sorting'}
        </button>
      </div>
    </div>
  );
};

export default SelectionSort;
