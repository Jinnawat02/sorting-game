import { useEffect, useState } from "react";

const InsertionSort = ({ array, setArr, isSorting, setIsSorting }) => {
  const [comparedIndices, setComparedIndices] = useState([-1, -1]);
  const [swappingIndices, setSwappingIndices] = useState([-1, -1]);
  const [noSwapIndices, setNoSwapIndices] = useState([-1, -1]);
  const [isSorted, setIsSorted] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (isSorting) {
      insertionSort();
    }
  }, [isSorting]); // Trigger sorting when `isSorting` changes

  const insertionSort = async () => {
    let newArr = [...array];
    setIsSorting(true);

    for (let i = 1; i < newArr.length; i++) {
      let key = newArr[i];
      let j = i - 1;
      let swapped = false;

      setComparedIndices([i, j]);
      await sleep(1000);

      let firstTime = true;
      while (j >= 0 && newArr[j] > key) {
        newArr[j + 1] = newArr[j];
        newArr[j] = key;
        swapped = true;

        if (!firstTime) {
          setComparedIndices([j, j + 1]);
          await sleep(1000);
        } else {
          firstTime = false;
        }

        setSwappingIndices([j, j + 1]);
        setArr([...newArr]);
        await sleep(1000);

        setSwappingIndices([-1, -1]);
        setComparedIndices([-1, -1]);

        j--;
      }

      if (!swapped) {
        setNoSwapIndices([i, j]);
        await sleep(1000);
        setNoSwapIndices([-1, -1]);
      }

      newArr[j + 1] = key;
      setArr([...newArr]);

      await sleep(1000);
      setComparedIndices([-1, -1]);
    }

    setIsSorting(false);
    setIsSorted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="flex space-x-4">
        {array.map((num, index) => {
          let bgColor = "custom-skyblue";

          if (comparedIndices.includes(index)) bgColor = "bg-yellow-500";
          if (swappingIndices.includes(index)) bgColor = "bg-green-500";
          if (noSwapIndices.includes(index)) bgColor = "bg-red-500";

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

      {!isSorted && (
        <div className="space-x-4 mt-4 text-2xl">
          <span className="text-yellow-500">Yellow: Comparing</span>
          <span className="text-green-500">Green: Successful Swap</span>
          <span className="text-red-500">Red: No Swap</span>
        </div>
      )}

      {/* Show "Sorted" message when sorting is finished */}
      {isSorted && (
        <div className="space-x-4 mt-4 text-2xl">
          <span className="text-green-500">Sorted </span>
        </div>
      )}

    </div>
  );
};

export default InsertionSort;
