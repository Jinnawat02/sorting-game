import { useEffect, useState } from "react";

const QuickSort = ({ array, setArr, isSorting, setIsSorting }) => {
  const [pivotIndex, setPivotIndex] = useState(null); // To highlight the pivot element
  const [comparedIndices, setComparedIndices] = useState([-1, -1]); // Indices of elements being compared
  const [swappingIndices, setSwappingIndices] = useState([-1, -1]); // Indices of elements being swapped

  // Sleep function to create delays for visualization purposes
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (isSorting) {
      quickSort([...array], 0, array.length - 1); // Start QuickSort when isSorting is true
    }
  }, [isSorting, array]);

  // QuickSort recursive function
  const quickSort = async (arr, low, high) => {
    if (low < high) {
      // Partition the array and get the pivot's correct position
      const pivotIdx = await partition(arr, low, high);

      // Recursively sort the left and right parts of the array
      await quickSort(arr, low, pivotIdx - 1);
      await quickSort(arr, pivotIdx + 1, high);
    } else {
      setIsSorting(false); // Stop sorting when the array is fully sorted
    }
  };

  // Partition function to place the pivot in its correct position
  const partition = async (arr, low, high) => {
    let pivot = arr[high]; // The last element is taken as the pivot
    let i = low - 1; // `i` will track the last element smaller than the pivot

    // Visualize pivot selection
    setPivotIndex(high);
    await sleep(1000); // Delay for visualization

    // Iterate through the array and compare elements with the pivot
    for (let j = low; j < high; j++) {
      setComparedIndices([j, high]); // Highlight the compared elements
      await sleep(1000); // Delay for visualization

      if (arr[j] < pivot) {
        // If the current element is smaller than the pivot, swap it
        i++;
        setSwappingIndices([i, j]); // Highlight the elements being swapped
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap the elements
        setArr([...arr]); // Update the array state
        await sleep(1000); // Delay for visualization
        setSwappingIndices([-1, -1]); // Reset the swapping highlight
      }
    }

    // Swap the pivot with the element at index `i + 1` to place the pivot in its correct position
    setSwappingIndices([i + 1, high]); // Highlight the pivot swap
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to its correct position
    setArr([...arr]); // Update the array state
    await sleep(1000); // Delay for visualization
    setSwappingIndices([-1, -1]); // Reset the swapping highlight

    return i + 1; // Return the index of the pivot (its final position)
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      {/* Display the array with the current state */}
      <div className="flex space-x-4">
        {array.map((num, index) => {
          let bgColor = "custom-skyblue"; // Default background color

          // Highlight the pivot element
          if (index === pivotIndex) bgColor = "bg-blue-500"; 

          // Highlight the elements being compared
          if (comparedIndices.includes(index)) bgColor = "bg-yellow-500"; 

          // Highlight the elements being swapped
          if (swappingIndices.includes(index)) bgColor = "bg-green-500"; 

          return (
            <div
              key={index}
              className={`h-40 w-40 flex text-5xl items-center justify-center text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out ${bgColor}`}
            >
              {num} {/* Display the number */}
            </div>
          );
        })}
      </div>

      {/* Instructions and status */}
      <div className="space-x-4 mt-4 text-2xl">
        <span className="text-yellow-500">Yellow: Comparing</span>
        <span className="text-green-500">Green: Successful Swap</span>
        <span className="text-blue-500">Blue: Pivot</span>
      </div>
    </div>
  );
};

export default QuickSort;