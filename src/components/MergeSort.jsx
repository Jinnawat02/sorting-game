import { useEffect, useState } from "react";

const MergeSort = ({ array, setArr, isSorting, setIsSorting, isSorted, setIsSorted, timeSleep, hideStatus = false }) => {
  const [sortingIndices, setSortingIndices] = useState([]);
  const [currentStep, setCurrentStep] = useState("");
  const [subArrays, setSubArrays] = useState({ left: [], right: [] });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (isSorting) {
      iterativeMergeSort([...array]);
    }
  }, [isSorting]);

  const merge = async (arr, left, right, startIdx) => {
    let merged = [];
    let i = 0, j = 0;

    setSubArrays({ left, right });
    await sleep(timeSleep);

    while (i < left.length && j < right.length) {
      setSortingIndices([startIdx + i, startIdx + left.length + j]);
      setCurrentStep(`Comparing ${left[i]} and ${right[j]}`);
      if (left[i] < right[j]) {
        merged.push(left[i++]);
      } else {
        merged.push(right[j++]);
      }
      await sleep(timeSleep);
    }

    while (i < left.length) {
      setSortingIndices([startIdx + i]);
      setCurrentStep(`Adding ${left[i]}`);
      merged.push(left[i++]);
      await sleep(timeSleep);
    }

    while (j < right.length) {
      setSortingIndices([startIdx + left.length + j]);
      setCurrentStep(`Adding ${right[j]}`);
      merged.push(right[j++]);
      await sleep(timeSleep);
    }

    for (let k = 0; k < merged.length; k++) {
      arr[startIdx + k] = merged[k];
    }
    setArr([...arr]);
    setCurrentStep("Merge Complete");
    setSubArrays({ left: [], right: [] });
    await sleep(timeSleep);
  };

  const iterativeMergeSort = async (arr) => {
    let n = arr.length;
    let step = 1;

    while (step < n) {
      for (let i = 0; i < n; i += 2 * step) {
        const left = arr.slice(i, i + step);
        const right = arr.slice(i + step, i + 2 * step);
        await merge(arr, left, right, i);
      }
      step *= 2;
    }
    setSortingIndices([]);
    setIsSorting(false);
    setCurrentStep("Sorting Complete");
    setIsSorted(true);
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <div className="flex space-x-4">
        {array.map((num, index) => (
          <div
            key={index}
            className={`h-40 w-40 flex text-5xl items-center justify-center text-white rounded-lg shadow-lg ${sortingIndices.includes(index) ? 'bg-yellow-500' : 'custom-skyblue'}`}
          >
            {num}
          </div>
        ))}
      </div>

      {!isSorted && !hideStatus && (
        <div className="space-x-4 mt-4 text-2xl">
          <span className="text-yellow-500">Yellow: Comparing/Merging</span>
          {currentStep && <span className="text-blue-500">{currentStep}</span>}
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
