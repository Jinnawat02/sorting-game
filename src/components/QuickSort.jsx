import { useState, useEffect } from 'react';

const QuickSort = ({ array, setArr, isSorting, setIsSorting, isSorted, setIsSorted, timeSleep, hideStatus = false }) => {
  const [arr, setLocalArr] = useState(array);
  const [comparedIndices, setComparedIndices] = useState([-1, -1]);
  const [swapResult, setSwapResult] = useState(null);
  const [pivotIndex, setPivotIndex] = useState(null); // Track pivot index

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    setLocalArr(array);
  }, [array]);

  useEffect(() => {
    const startSorting = async () => {
      if (isSorting) {
        
        await quickSort(0, arr.length - 1); // Wait for sorting to finish

        setIsSorted(true);
        setIsSorting(false);
        await setPivotIndex(null);
      }
    };
  
    startSorting(); // Trigger sorting asynchronously
  }, [isSorting]); // Trigger sorting when isSorting changes
  

  const quickSort = async (low, high) => {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSort(low, pi - 1); // Sort left part
      await quickSort(pi + 1, high); // Sort right part
    }
  };

  const partition = async (low, high) => {
    const pivot = arr[high];
    setPivotIndex(high); // Set pivot index for animation
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setComparedIndices([j, high]); // Highlight the current element and pivot
      setSwapResult(null); // Reset swap result while comparing
      await sleep(timeSleep); // Pause for visual effect

      if (arr[j] < pivot) {
        i++;
        
        setComparedIndices([i, j]);
        await sleep(timeSleep);

        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements

        if (arr[i] !== arr[j]) {
          setSwapResult('success');
        } else {
          setSwapResult('fail');
        }
        
        setLocalArr([...arr]);
        setArr([...arr]); // Update parent array
        await sleep(timeSleep);
      } else {
        setSwapResult('fail');
      }
      setSwapResult(null);
    }
    
    // Place pivot in the correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setSwapResult(null);
    setComparedIndices([null, i + 1]);
    await sleep(timeSleep);

    setSwapResult('success');
    setLocalArr([...arr]);
    setArr([...arr]); // Update parent array
    await sleep(timeSleep);

    setSwapResult(null);
    setPivotIndex(i + 1); // Update pivot position
    setComparedIndices([null, pivotIndex])
    await sleep(timeSleep);

    return i + 1;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="flex space-x-4">
        {/* Visualizing the elements in the array */}
        {arr.map((num, index) => {
          let bgColor = 'custom-skyblue';

          // Highlighting the pivot element with gray
          if (pivotIndex === index) {
            bgColor = 'bg-gray-500'; // Pivot is gray
          }

          // Highlighting the elements being compared with yellow
          if (comparedIndices.includes(index) && pivotIndex !== index) {
            bgColor = 'bg-yellow-500'; // Comparing element is yellow
          }

          // Green for successful swaps and red for failed swaps
          if (swapResult === 'success' && comparedIndices.includes(index)) {
            bgColor = 'bg-green-500'; // Swap result is green after swap
          }

          if (swapResult === 'fail' && comparedIndices.includes(index)) {
            bgColor = 'bg-red-500'; // No swap result is red
          }

          return (
            <div key={index}
              className={`h-40 w-40 flex text-5xl items-center justify-center text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out ${bgColor}`}>
              {num}
            </div>
          );
        })}
      </div>

      {/* Visualizing partitioning */}
      {/* {pivotIndex !== null && (
        <div className="mt-6">
          <div className="text-xl text-center font-semibold text-gray-700">
            Pivot Position: {pivotIndex}
          </div>
        </div>
      )} */}

      {!isSorted && !hideStatus && (
        <div className="space-x-4 mt-4 text-2xl">
          <span className="text-yellow-500">Yellow: Comparing with Pivot</span>
          <span className="text-green-500">Green: Successful Swap</span>
          <span className="text-red-500">Red: No Swap</span>
          <span className="text-gray-500">Gray: Pivot</span>
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

export default QuickSort;