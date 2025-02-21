import { useEffect, useState } from "react";

const CountingSort = ({ array, setArr, isSorting, setIsSorting }) => {
  const [countingIndices, setCountingIndices] = useState([]);
  const [updatedArrayIndices, setUpdatedArrayIndices] = useState([]);
  const [noSwapIndices, setNoSwapIndices] = useState([-1]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (isSorting) {
      countingSort();
    }
  }, [isSorting]); // Trigger sorting when `isSorting` changes

  const countingSort = async () => {
    let newArr = [...array];
    let maxVal = Math.max(...newArr); // Find max value in the array
    let minVal = Math.min(...newArr); // Find min value in the array
    let countArray = Array(maxVal - minVal + 1).fill(0); // Initialize counting array

    setIsSorting(true);

    // Count the occurrences of each number
    for (let i = 0; i < newArr.length; i++) {
      countArray[newArr[i] - minVal]++;
      setCountingIndices([i]); // Visualize counting the elements
      await sleep(1000);
    }

    // Rebuild the sorted array from the countArray
    let sortedArray = [];
    for (let i = 0; i < countArray.length; i++) {
      while (countArray[i] > 0) {
        sortedArray.push(i + minVal);
        countArray[i]--;
        setUpdatedArrayIndices([sortedArray.length - 1]); // Visualize updating the sorted array
        setArr([...sortedArray]);
        await sleep(1000);
      }
    }

    // Update the array and finish sorting
    setArr([...sortedArray]);
    setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="flex space-x-4">
        {array.map((num, index) => {
          let bgColor = "custom-skyblue";

          if (countingIndices.includes(index)) bgColor = "bg-yellow-500"; // Counting
          if (updatedArrayIndices.includes(index)) bgColor = "bg-green-500"; // Updated Array
          if (noSwapIndices.includes(index)) bgColor = "bg-red-500"; // No change

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
        <span className="text-yellow-500">Yellow: Counting</span>
        <span className="text-green-500">Green: Updated Array</span>
        <span className="text-red-500">Red: No Change</span>
      </div>
    </div>
  );
};

export default CountingSort;