import { useEffect, useState } from "react";

const MergeSort = ({ array, setArr, isSorting, setIsSorting }) => {
  const [sortingIndices, setSortingIndices] = useState([]);
  const [currentStep, setCurrentStep] = useState("");
  const [prevArr, setPrevArr] = useState([...array]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (isSorting) {
      iterativeMergeSort([...array]);
    }
  }, [isSorting]);

  const merge = async (arr, left, right, startIdx) => {
    let merged = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      setSortingIndices([startIdx + i, startIdx + left.length + j]);
      setCurrentStep(`Comparing ${left[i]} and ${right[j]}`);
      if (left[i] < right[j]) {
        merged.push(left[i++]);
      } else {
        merged.push(right[j++]);
      }
      await sleep(1000);
    }

    while (i < left.length) {
      setSortingIndices([startIdx + i]);
      setCurrentStep(`Adding ${left[i]}`);
      merged.push(left[i++]);
      await sleep(1000);
    }

    while (j < right.length) {
      setSortingIndices([startIdx + left.length + j]);
      setCurrentStep(`Adding ${right[j]}`);
      merged.push(right[j++]);
      await sleep(1000);
    }

    for (let k = 0; k < merged.length; k++) {
      arr[startIdx + k] = merged[k];
    }
    setArr([...arr]);
    setCurrentStep("Swap Complete");
    await sleep(1000);
  };

  const iterativeMergeSort = async (arr) => {
    let n = arr.length;
    let step = 1;
    setPrevArr([...arr]);

    while (step < n) {
      for (let i = 0; i < n; i += 2 * step) {
        const left = arr.slice(i, i + step);
        const right = arr.slice(i + step, i + 2 * step);
        await merge(arr, left, right, i);
      }
      step *= 2;
    }
    setIsSorting(false);
    setCurrentStep("Sorting Complete");
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <div className="flex space-x-4 mb-4">
        {array.map((num, index) => (
          <div
            key={index}
            className={`h-20 w-20 flex items-center justify-center text-white rounded-lg shadow-lg ${sortingIndices.includes(index) ? 'bg-yellow-500' : 'bg-blue-500'}`}
          >
            {num}
          </div>
        ))}
      </div>

      <div className="space-x-4 text-xl">
        <span className="text-yellow-500">Yellow: Comparing/Merging</span>
        {currentStep && <span className="text-blue-500">{currentStep}</span>}
        {!isSorting && <span className="text-green-500">Sorted</span>}
      </div>
    </div>
  );
};

export default MergeSort;
