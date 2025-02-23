import { useState, useEffect } from 'react';

const BubbleSort = ({ array, setArr, isSorting, setIsSorting, isSorted, setIsSorted, timeSleep, hideStatus = false }) => {
    const [arr, setLocalArr] = useState(array);
    const [comparedIndices, setComparedIndices] = useState([-1, -1]);
    const [swapResult, setSwapResult] = useState(null);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        setLocalArr(array);
    }, [array]);

    useEffect(() => {
        if (isSorting) {
            bubbleSort();
        }
    }, [isSorting]); // Trigger sorting when isSorting changes

    const bubbleSort = async () => {
        let newArr = [...arr];
        for (let i = 0; i < newArr.length; i++) {
            for (let j = 0; j < newArr.length - i - 1; j++) {
                setComparedIndices([j, j + 1]);
                await sleep(timeSleep);

                if (newArr[j] > newArr[j + 1]) {
                    [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
                    setSwapResult('success');
                    setLocalArr([...newArr]);
                    setArr([...newArr]); // Update parent array
                } else {
                    setSwapResult('fail');
                }

                await sleep(timeSleep);
                setSwapResult(null);
                setComparedIndices([-1, -1]);
            }
        }
        setIsSorting(false);
        setIsSorted(true);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
            <div className="flex space-x-4">
                {arr.map((num, index) => {
                    let bgColor = 'custom-skyblue';

                    if (comparedIndices.includes(index)) {
                        bgColor = 'bg-yellow-500';
                    }

                    if (swapResult === 'success' && comparedIndices.includes(index)) {
                        bgColor = 'bg-green-500';
                    }

                    if (swapResult === 'fail' && comparedIndices.includes(index)) {
                        bgColor = 'bg-red-500';
                    }

                    return (
                        <div key={index}
                            className={`h-40 w-40 flex text-5xl items-center justify-center text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out ${bgColor}`}>
                            {num}
                        </div>
                    );
                })}
            </div>

            {!isSorted && !hideStatus && (
                <div className="space-x-4 mt-4 text-2xl">
                    <span className="text-yellow-500">Yellow: Comparing</span>
                    <span className="text-green-500">Green: Successful Swap</span>
                    <span className="text-red-500">Red: No Swap</span>
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

export default BubbleSort;
