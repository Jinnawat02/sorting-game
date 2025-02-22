import { useEffect, useState } from "react";

const QuickSort = ({ array, setArr, isSorting, setIsSorting }) => {
  const [pivotIndex, setPivotIndex] = useState(null); // Highlighted pivot element
  const [comparedIndices, setComparedIndices] = useState([-1, -1]); // Indices being compared
  const [swappingIndices, setSwappingIndices] = useState([-1, -1]); // Indices being swapped

  // Delay function for visualization
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (isSorting) {
      startSorting([...array]);
    }
  }, [isSorting, array]);

  const startSorting = async (arr) => {
    await quickSort(arr, 0, arr.length - 1);
    setIsSorting(false); // Mark sorting as complete
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pivotIdx = await partition(arr, low, high);
      await quickSort(arr, low, pivotIdx - 1);
      await quickSort(arr, pivotIdx + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;
    setPivotIndex(high);
    await sleep(500);

    for (let j = low; j < high; j++) {
      setComparedIndices([j, high]);
      await sleep(500);

      if (arr[j] < pivot) {
        i++;
        setSwappingIndices([i, j]);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArr([...arr]);
        await sleep(500);
        setSwappingIndices([-1, -1]);
      }
    }

    setSwappingIndices([i + 1, high]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArr([...arr]);
    await sleep(500);
    setSwappingIndices([-1, -1]);

    return i + 1;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="flex space-x-4">
        {array.map((num, index) => {
          let bgColor = "custom-skyblue";
          if (index === pivotIndex) bgColor = "bg-blue-500";
          if (comparedIndices.includes(index)) bgColor = "bg-yellow-500";
          if (swappingIndices.includes(index)) bgColor = "bg-green-500";

          return (
            <div
              key={index}
              className={`h-40 w-40 flex text-5xl items-center justify-center text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out ${bgColor}`}
            >
              {num}
            </div>
          );
        })}
      </div>

      <div className="space-x-4 mt-4 text-2xl">
        <span className="text-yellow-500">Yellow: Comparing</span>
        <span className="text-green-500">Green: Swapping</span>
        <span className="text-blue-500">Blue: Pivot</span>
      </div>
    </div>
  );
};

export default QuickSort;