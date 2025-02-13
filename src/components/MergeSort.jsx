import { useState } from 'react';
import generateRandomArray from '../service/GenerateRandomArray';

const MergeSort = () => {
  const [arr, setArr] = useState(generateRandomArray(6, 10));
  const [isSorting, setIsSorting] = useState(false);
  const [splitIndex, setSplitIndex] = useState([]);  // Indices of the array being split
  const [mergedIndices, setMergedIndices] = useState([]);  // Indices of merged elements

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Merge Sort function (recursively splits the array)
  const mergeSort = async (array, level = 0) => {
    if (array.length <= 1) return array;

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // Visualize the split step
    setSplitIndex([middle]);  // Show the middle index as the split point
    setArr([...array]);
    await sleep(1000);  // Delay to show the split step

    // Recursively sort the left and right halves
    const leftSorted = await mergeSort(left, level + 1);
    const rightSorted = await mergeSort(right, level + 1);

    // Merge the two sorted halves
    return merge(leftSorted, rightSorted);
  };

  // Merge function: merges two sorted arrays
  const merge = async (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    let newArr = [...arr];

    while (leftIndex < left.length && rightIndex < right.length) {
      setMergedIndices([leftIndex, rightIndex]);  // Highlight the compared elements
      setArr([...newArr]);
      await sleep(500);  // Delay to show comparison

      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }

      // Update the array after each merge step
      newArr = [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
      setArr(newArr);
      await sleep(500);  // Delay to show the merging step
    }

    // Include remaining elements from left or right array
    newArr = [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
    setArr(newArr);
    await sleep(500);  // Final step delay for merging
    return newArr;
  };

  const startMergeSort = async () => {
    setIsSorting(true);
    await mergeSort(arr);  // Start merge sort process
    setIsSorting(false);
  };

  const resetArray = () => {
    setArr(generateRandomArray(6, 10));  // Reset array with new random values
    setSplitIndex([]);
    setMergedIndices([]);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Visualizing the array state */}
      <div className="flex space-x-2">
        {arr.map((num, index) => {
          let bgColor = 'bg-blue-500'; // Default background color for the array element

          // Highlight split index in yellow
          if (splitIndex.includes(index)) {
            bgColor = 'bg-yellow-500'; // Yellow for split point
          }

          // Highlight merged elements in green
          if (mergedIndices.includes(index)) {
            bgColor = 'bg-green-500'; // Green for merged elements
          }

          return (
            <div
              key={index}
              className={`h-20 w-20 flex items-center justify-center text-white rounded-lg ${bgColor}`}
            >
              {num}
            </div>
          );
        })}
      </div>

      {/* Action buttons for resetting and starting sorting */}
      <div className="space-x-4 mt-4">
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="p-2 bg-gray-900 text-white rounded-lg disabled:bg-gray-400"
        >
          Reset Array
        </button>
        <button
          onClick={startMergeSort}
          disabled={isSorting}
          className="p-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          {isSorting ? 'Sorting...' : 'Start Sorting'}
        </button>
      </div>
    </div>
  );
};

export default MergeSort;
