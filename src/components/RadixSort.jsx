import { useEffect, useState } from "react";

const RadixSort = ({ array, setArr, isSorting, setIsSorting, isSorted, setIsSorted, hideStatus = false }) => {
  const [currentDigit, setCurrentDigit] = useState(null); // Track the current digit being sorted
  const [sortingIndices, setSortingIndices] = useState([]); // Track the indices being sorted
  const [prevArr, setPrevArr] = useState([...array]); // Store the previous array for visualization

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Sleep for visualization delay

  useEffect(() => {
    if (isSorting) {
      radixSort(); // Start sorting when `isSorting` is true
    }
  }, [isSorting]);

  // Find the maximum number in the array to determine the number of digits
  const getMax = (arr) => {
    return Math.max(...arr);
  };

  // Function for counting sort that will sort based on a specific digit
  const countingSortByDigit = async (arr, exp) => {
    const n = arr.length; // Number of elements
    let output = Array(n); // Output array to hold sorted values
    let count = Array(10).fill(0); // Count array for digits 0-9

    // Step 1: Count the occurrences of each digit at the current place (exp)
    setCurrentDigit(exp); // Update the current digit (place value) being sorted
    for (let i = 0; i < n; i++) {
      let digit = Math.floor(arr[i] / exp) % 10; // Get the digit at the current place
      count[digit]++; // Increment count for this digit
      setSortingIndices([i]); // Show the current element being processed
      await sleep(1000); // Wait 1 second for visualization
    }

    setSortingIndices([]);
    // Step 2: Update the count array to store actual positions of digits
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1]; // Accumulate counts
    }

    // Step 3: Build the output array by placing elements in sorted order
    for (let i = n - 1; i >= 0; i--) {
      let digit = Math.floor(arr[i] / exp) % 10; // Get the digit at the current place
      output[count[digit] - 1] = arr[i]; // Place element in the correct position
      count[digit]--; // Decrease the count for this digit
      setArr([...output]); // Update the array visualization
      await sleep(1000); // Wait 1 second for visualization
    }

    setSortingIndices([]); // Reset sorting indices
    return output; // Return the sorted array based on the current digit
  };

  // Radix Sort function to sort the array based on each digit
  const radixSort = async () => {
    let newArr = [...array]; // Copy the original array
    const maxVal = getMax(newArr); // Find the maximum value in the array
    let exp = 1; // Start sorting with the least significant digit (1s place)

    setIsSorting(true); // Start sorting

    // Step 4: Sort the array based on each digit (from least significant to most significant)
    while (Math.floor(maxVal / exp) > 0) {
      setPrevArr([...newArr]); // Store the current array before sorting
      newArr = await countingSortByDigit(newArr, exp); // Sort based on current digit
      exp *= 10; // Move to the next more significant digit
      setArr([...newArr]); // Update the array after sorting each digit
    }

    setIsSorting(false); // Stop sorting when all digits are sorted
    setIsSorted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      {/* Display previous array only while sorting */}
      {isSorting && (
        <div className="flex space-x-4">
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

      {/* Display current array */}
      <div className="flex space-x-4">
        {array.map((num, index) => {
          let bgColor = "custom-skyblue"; // Default background color

          // Highlight the elements being processed
          if (sortingIndices.includes(index)) bgColor = "bg-yellow-500"; // Highlight sorting digits

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
          <span className="text-yellow-500">Yellow: Sorting by Digit</span>
          {currentDigit && (
            <span className="text-blue-500">
              Sorting by digit: {currentDigit}
            </span>
          )}
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

export default RadixSort;
