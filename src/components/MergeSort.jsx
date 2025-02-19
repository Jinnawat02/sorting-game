import { useState } from 'react';
import generateRandomArray from '../service/GenerateRandomArray';

const MergeSort = () => {
  const [arr, setArr] = useState(generateRandomArray(6, 100));
  const [isSorting, setIsSorting] = useState(false);
  const [splitIndices, setSplitIndices] = useState([]); // Track split points
  const [mergedIndices, setMergedIndices] = useState([]); // Track merged elements
  const [comparedIndices, setComparedIndices] = useState([]); // Track elements being compared

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const mergeSort = async (array, startIdx = 0) => {
    if (array.length <= 1) return array;

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // Highlight the split point
    setSplitIndices([...splitIndices, startIdx + middle]);
    await sleep(1000);

    const leftSorted = await mergeSort(left, startIdx);
    const rightSorted = await mergeSort(right, startIdx + middle);
    return await merge(leftSorted, rightSorted, startIdx);
  };

  const merge = async (left, right, startIdx) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    let newArr = [...arr];
    let mergedStart = startIdx;

    while (leftIndex < left.length && rightIndex < right.length) {
      setComparedIndices([mergedStart + leftIndex, mergedStart + left.length + rightIndex]);
      await sleep(1000);

      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }

      newArr.splice(startIdx, result.length, ...result);
      setArr([...newArr]);
      await sleep(1000);
    }

    result = [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
    newArr.splice(startIdx, result.length, ...result);
    setArr([...newArr]);

    setMergedIndices([...mergedIndices, ...Array.from({ length: result.length }, (_, i) => startIdx + i)]);
    await sleep(1000);

    return result;
  };

  const startMergeSort = async () => {
    setIsSorting(true);
    await mergeSort(arr);
    setIsSorting(false);
  };

  const resetArray = () => {
    setArr(generateRandomArray(6, 100));
    setSplitIndices([]);
    setMergedIndices([]);
    setComparedIndices([]);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Merge Sort Visualization</h1>

      <div className="flex space-x-4">
        {arr.map((num, index) => {
          let bgColor = 'bg-blue-500';
          if (splitIndices.includes(index)) bgColor = 'bg-yellow-500'; // Splitting
          if (comparedIndices.includes(index)) bgColor = 'bg-red-500'; // Comparing
          if (mergedIndices.includes(index)) bgColor = 'bg-green-500'; // Merged

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

      <div className="space-x-4 mt-4 text-lg">
        <span className="text-yellow-500">Yellow: Splitting</span>
        <span className="text-red-500">Red: Comparing</span>
        <span className="text-green-500">Green: Merged</span>
      </div>

      <div className="space-x-4 mt-6">
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="p-3 bg-gray-900 text-white rounded-lg shadow-lg disabled:bg-gray-400 transition-all duration-300 ease-in-out"
        >
          Reset Array
        </button>
        <button
          onClick={startMergeSort}
          disabled={isSorting}
          className="p-3 bg-blue-500 text-white rounded-lg shadow-lg disabled:bg-gray-400 transition-all duration-300 ease-in-out"
        >
          {isSorting ? 'Sorting...' : 'Start Sorting'}
        </button>
      </div>
    </div>
  );
};

export default MergeSort;
