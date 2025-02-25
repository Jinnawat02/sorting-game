import { useEffect, useState } from "react";

const MergeSort = ({
  array,
  setArr,
  isSorting,
  setIsSorting,
  isSorted,
  setIsSorted,
  timeSleep,
  hideStatus = false,
}) => {
  const [sortingIndices, setSortingIndices] = useState([]); // Indices of elements being merged
  const [subArrays, setSubArrays] = useState({ left: [], right: [] }); // Left and right subarrays
  const [focusIndices, setFocusIndices] = useState([]); // Indices of elements being compared

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (isSorting) {
      recursiveMergeSort([...array], 0, array.length - 1);
    }
  }, [isSorting]);

  const recursiveMergeSort = async (arr, left, right) => {
    if (left < right) {
      let mid = Math.floor((left + right) / 2);
      await recursiveMergeSort(arr, left, mid);
      await recursiveMergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
    if (left === 0 && right === arr.length - 1) {
      setIsSorting(false);
      setIsSorted(true);
    }
  };

  const merge = async (arr, leftStart, leftEnd, rightEnd) => {
    let left = arr.slice(leftStart, leftEnd + 1);
    let right = arr.slice(leftEnd + 1, rightEnd + 1);
    let k = leftStart;

    // Resetting the array state before merging
    arr.fill(null, leftStart, rightEnd + 1);
    setArr([...arr]);

    setSubArrays({ left, right });
    await sleep(timeSleep);

    while (left.length > 0 && right.length > 0) {
      setFocusIndices([0, 0]);
      await sleep(timeSleep);
      setFocusIndices([]);
      await sleep(timeSleep);

      if (left[0] <= right[0]) {
        // Move element from left
        setSortingIndices([k]);
        arr[k++] = left.shift();
      } else {
        // Move element from right
        setSortingIndices([k]);
        arr[k++] = right.shift();
      }

      setSubArrays({ left: [...left], right: [...right] });
      setArr([...arr]);
      await sleep(timeSleep);
      setSortingIndices([]);
    }

    // Merging remaining left or right elements
    
    while (left.length > 0) {
      await sleep(timeSleep);
      setSortingIndices([k]);
      arr[k++] = left.shift();
      setArr([...arr]);
      setSubArrays({ left: [...left], right: [...right] });
      await sleep(timeSleep);
      setSortingIndices([]);
    }

    while (right.length > 0) {
      await sleep(timeSleep);
      setSortingIndices([k]);
      arr[k++] = right.shift();
      setArr([...arr]);
      setSubArrays({ left: [...left], right: [...right] });
      await sleep(timeSleep);
      setSortingIndices([]);
    }

    setArr([...arr]);
    setSortingIndices([]);
    await sleep(timeSleep);
    setSubArrays({ left: [], right: [] });
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      {isSorting && !hideStatus && (subArrays.left.length > 0 || subArrays.right.length > 0) && (
        <div className="flex space-x-8">
          {/* Left Subarray */}
          <div className="flex flex-col items-center">
            <div className="text-xl text-gray-400 font-semibold mb-1">Left Subarray</div>
            <div className="flex space-x-4">
              {subArrays.left.map((num, index) => {
                const isHighlighted = focusIndices.includes(index);
                return (
                  <div
                    key={`left-${index}`}
                    className={`h-20 w-20 flex text-2xl items-center justify-center text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out ${isHighlighted ? "bg-yellow-500" : "bg-gray-400"}`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Subarray */}
          <div className="flex flex-col items-center">
            <div className="text-xl text-gray-400 font-semibold mb-1">Right Subarray</div>
            <div className="flex space-x-4">
              {subArrays.right.map((num, index) => {
                const isHighlighted = focusIndices.includes(index);
                return (
                  <div
                    key={`right-${index}`}
                    className={`h-20 w-20 flex text-2xl items-center justify-center text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out ${isHighlighted ? "bg-yellow-500" : "bg-gray-400"}`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Array Display */}
      <div className="flex space-x-4">
        {array.map((num, index) => {
          let bgColor = "custom-skyblue"; // Default color

          // Highlight merged (green for added)
          if (sortingIndices.includes(index)) {
            bgColor = "bg-green-500";
          }

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

      {/* Sorting Status */}
      {!isSorted && !hideStatus && (
        <div className="flex space-x-6 mt-4 text-2xl">
          <span className="text-green-500">Green: Added</span>
          <span className="text-yellow-500">Yellow: Comparing</span>
          <span className="text-gray-400">Gray: Merging</span>
        </div>
      )}

      {/* Sorting Complete Message */}
      {isSorted && (
        <div className="mt-4 text-2xl text-green-500">Sorted</div>
      )}
    </div>
  );
};

export default MergeSort;
