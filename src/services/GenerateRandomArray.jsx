const generateRandomArray = (length, maxValue) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * maxValue) + 1);  // Generate random numbers from 1 to maxValue
  }
  return arr;
};

export default generateRandomArray