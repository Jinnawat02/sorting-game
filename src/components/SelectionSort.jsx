import { useEffect, useState } from "react";

const SelectionSort = ({ array, setArr, isSorting, setIsSorting, isSorted, setIsSorted, timeSleep, hideStatus = false }) => {
  const [comparedIndex, setComparedIndex] = useState(null);
  const [minIndex, setMinIndex] = useState(null);
  const [sortedUpTo, setSortedUpTo] = useState(-1);
  const [isFinished, setIsFinished] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (isSorting) {
      selectionSort();
    }
  }, [isSorting]); // Trigger sorting when `isSorting` changes

  const selectionSort = async () => {
    let newArr = [...array];
    setIsSorting(true);

    for (let i = 0; i < newArr.length - 1; i++) {
      let minIdx = i;
      setMinIndex(minIdx);
      await sleep(timeSleep);

      for (let j = i + 1; j < newArr.length; j++) {
        setComparedIndex(j);
        await sleep(timeSleep);

        if (newArr[j] < newArr[minIdx]) {
          minIdx = j;
          setMinIndex(minIdx);
          await sleep(timeSleep);
        }
      }

      if (minIdx !== i) {
        [newArr[i], newArr[minIdx]] = [newArr[minIdx], newArr[i]];
        setArr([...newArr]);
      }

      setSortedUpTo(i);
      setComparedIndex(null);
      setMinIndex(null);
      await sleep(timeSleep);
    }

    setSortedUpTo(newArr.length - 1);
    setIsSorting(false);
    setIsFinished(true);
    setIsSorted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="flex space-x-4">
        {array.map((num, index) => {
          let bgColor = "custom-skyblue"; // Default color after sorting

          if (comparedIndex === index) bgColor = "bg-yellow-500"; // Comparing
          if (minIndex === index) bgColor = "bg-green-500"; // Minimum Element
          if (index <= sortedUpTo) bgColor = "bg-gray-400"; // Sorted Elements

          if (isFinished) {
            bgColor = "custom-skyblue";
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

      {!isSorted && !hideStatus && (
        <div className="space-x-4 mt-4 text-2xl">
          <span className="text-yellow-500">Yellow: Comparing</span>
          <span className="text-green-500">Green: Minimum Element</span>
          <span className="text-gray-400">Gray: Sorted Elements</span>
        </div>
      )}

      {/* Show "Sorted" message when sorting is finished */}
      {isSorted && (
        <div className="space-x-4 mt-4 text-2xl">
          <span className="text-green-500">Sorted</span>
        </div>
      )}

    </div>
  );
};

export default SelectionSort;
