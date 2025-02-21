import { useEffect, useState } from "react";

const MergeSort = ({ array, setArr, isSorting, setIsSorting }) => {
  const [sortingIndices, setSortingIndices] = useState([]); // Indices of elements being compared
  const [currentStep, setCurrentStep] = useState(""); // To track the current step in the sorting process
  const [prevArr, setPrevArr] = useState([...array]); // Store the previous array for visualization

  // Sleep function to create delay in visualization
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (isSorting) {
      iterativeMergeSort([...array]); // Start sorting when `isSorting` is true
    }
  }, [isSorting]);

  // Merge function to merge two sorted subarrays
  const merge = async (arr, left, right) => {
    let merged = [];
    let i = 0; // Pointer for the left array
    let j = 0; // Pointer for the right array

    // Compare elements from both halves and merge them
    while (i < left.length && j < right.length) {
      setSortingIndices([i, arr.indexOf(left[i]), arr.indexOf(right[j])]); // Highlight indices being compared
      setCurrentStep("Merging");
      if (left[i] < right[j]) {
        merged.push(left[i]);
        i++;
      } else {
        merged.push(right[j]);
        j++;
      }
      await sleep(1000); // Delay for visualization
    }

    // Add remaining elements from the left subarray
    while (i < left.length) {
      setSortingIndices([i, arr.indexOf(left[i])]);
      merged.push(left[i]);
      i++;
      await sleep(1000); // Delay for visualization
    }

    // Add remaining elements from the right subarray
    while (j < right.length) {
      setSortingIndices([j, arr.indexOf(right[j])]);
      merged.push(right[j]);
      j++;
      await sleep(1000); // Delay for visualization
    }

    // Update the array and visualize the merged result
    setArr([...merged]);
    return merged;
  };

  // Iterative Merge Sort function to divide the array and merge back
  const iterativeMergeSort = async (arr) => {
    let n = arr.length;
    let step = 1; // Step size (size of the subarrays to merge)

    setPrevArr([...arr]); // Store the previous array for visualization

    while (step < n) {
      let tempArr = [];
      for (let i = 0; i < n; i += 2 * step) {
        const left = arr.slice(i, Math.min(i + step, n)); // Left subarray
        const right = arr.slice(i + step, Math.min(i + 2 * step, n)); // Right subarray
        const merged = await merge(arr, left, right); // Merge both subarrays
        tempArr.push(...merged); // Add the merged array back to the temporary array
      }
      arr = tempArr; // Update the main array with the merged result
      setArr([...arr]); // Visualize the current state of the array
      step *= 2; // Double the step size
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      {/* Display the previous array during sorting */}
      {isSorting && (
        <div className="flex space-x-4 mb-4">
          {prevArr.map((num, index) => (
            <div
              key={`prev-${index}`}
              className={`h-20 w-20 flex text-2xl items-center justify-center text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out bg-gray-500`}
            >
              {num}
            </div>
          ))}
        </div>
      )}

      {/* Display the current array */}
      <div className="flex space-x-4 mb-4">
        {array.map((num, index) => {
          let bgColor = "custom-skyblue"; // Default background color

          // Highlight the elements being processed (yellow for sorting)
          if (sortingIndices.includes(index)) bgColor = "bg-yellow-500";

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
        <span className="text-yellow-500">Yellow: Sorting by Merging</span>
        {currentStep && (
          <span className="text-blue-500">{currentStep}</span> // Show the current step ("Merging")
        )}
        {/* Show "Sorted" message when sorting is finished */}
        {!isSorting && (
          <span className="text-green-500">Sorted</span>
        )}
      </div>
    </div>
  );
};

export default MergeSort;
