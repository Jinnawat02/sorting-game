import { useEffect, useState } from "react";

const MergeSort = ({ array, setArr, isSorting, setIsSorting, isSorted, setIsSorted, timeSleep, hideStatus = false }) => {
  const [sortingIndices, setSortingIndices] = useState([]);
  const [currentStep, setCurrentStep] = useState("");
  const [subArrays, setSubArrays] = useState({ left: [], right: [] });
  const [focusIndices, setFocusIndices] = useState([]);

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
      setSortingIndices([]);
      setIsSorting(false);
      setCurrentStep("Sorting Complete");
      setIsSorted(true);
    }
  };

  const merge = async (arr, leftStart, leftEnd, rightEnd) => {
    let left = arr.slice(leftStart, leftEnd + 1);
    let right = arr.slice(leftEnd + 1, rightEnd + 1);
    let i = 0, j = 0, k = leftStart;

    setSubArrays({ left, right });
    await sleep(timeSleep);

    while (i < left.length && j < right.length) {
      setSortingIndices([k]);
      setFocusIndices([...Array(left.length).keys()].map(x => leftStart + x).concat([...Array(right.length).keys()].map(x => leftEnd + 1 + x)));
      setCurrentStep(`Comparing ${left[i]} and ${right[j]}`);
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
      await sleep(timeSleep);
    }

    while (i < left.length) {
      setSortingIndices([k]);
      setFocusIndices([...Array(left.length).keys()].map(x => leftStart + x));
      setCurrentStep(`Adding ${left[i]}`);
      arr[k++] = left[i++];
      await sleep(timeSleep);
    }

    while (j < right.length) {
      setSortingIndices([k]);
      setFocusIndices([...Array(right.length).keys()].map(x => leftEnd + 1 + x));
      setCurrentStep(`Adding ${right[j]}`);
      arr[k++] = right[j++];
      await sleep(timeSleep);
    }

    setArr([...arr]);
    setSubArrays({ left: [], right: [] });
    setFocusIndices([]);
    setCurrentStep("Merge Complete");
    await sleep(timeSleep);
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <div className="flex space-x-4">
        {array.map((num, index) => (
          <div
            key={index}
            className={`h-40 w-40 flex text-5xl items-center justify-center text-white rounded-lg shadow-lg ${
              sortingIndices.includes(index) ? 'bg-yellow-500' : focusIndices.includes(index) ? 'bg-blue-500' : 'custom-skyblue'
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {!isSorted && !hideStatus && (
        <div className="space-x-4 mt-4 text-2xl">
          <span className="text-yellow-500">Yellow: Comparing/Merging</span>
          <span className="text-blue-500">Blue: Current Subarrays Being Merged</span>
          {currentStep && <span className="text-red-500">{currentStep}</span>}
        </div>
      )}

      {subArrays.left.length > 0 && !hideStatus && (
        <div className="flex flex-col items-center mt-4 text-2xl">
          <div className="text-blue-500">Left Subarray: [{subArrays.left.join(", ")}]</div>
          <div className="text-red-500">Right Subarray: [{subArrays.right.join(", ")}]</div>
        </div>
      )}

      {isSorted && (
        <div className="space-x-4 mt-4 text-2xl">
          <span className="text-green-500">Sorted</span>
        </div>
      )}
    </div>
  );
};

export default MergeSort;