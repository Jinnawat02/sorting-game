import { useState, useEffect } from 'react';

const BucketSort = ({ array, setArr, isSorting, setIsSorting, isSorted, setIsSorted, hideStatus = false }) => {
    const [arr, setLocalArr] = useState(array);
    const [buckets, setBuckets] = useState([]);
    const [comparedIndices, setComparedIndices] = useState([-1, -1]);
    const [swapResult, setSwapResult] = useState(null);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        setLocalArr(array);
    }, [array]);

    useEffect(() => {
        if (isSorting) {
            bucketSort();
        }
    }, [isSorting]); // Trigger sorting when isSorting changes

    const bucketSort = async () => {
        const max = Math.max(...arr);
        const min = Math.min(...arr);
        const bucketCount = Math.floor(arr.length / 2);
        const newBuckets = Array.from({ length: bucketCount }, () => []);

        // Distribute elements into buckets
        for (let i = 0; i < arr.length; i++) {
            const bucketIndex = Math.floor(((arr[i] - min) / (max - min)) * (bucketCount - 1));
            newBuckets[bucketIndex].push(arr[i]);
            setBuckets([...newBuckets]); // Update buckets
            setComparedIndices([i]);
            setLocalArr([...arr]);
            setArr([...arr]); // Update parent array
            await sleep(1000);
        }

        // Visualize bucket sorting
        let newArr = [];
        for (let i = 0; i < newBuckets.length; i++) {
            newBuckets[i].sort((a, b) => a - b);
            setBuckets([...newBuckets]); // Update buckets after sorting

            setComparedIndices([i]);
            await sleep(1000);

            newArr = [...newArr, ...newBuckets[i]];
        }

        setLocalArr([...newArr]);
        setArr([...newArr]); // Update parent array
        setIsSorting(false);
        setIsSorted(true);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
            <div className="flex space-x-4">
                {/* Visualizing the elements in the array */}
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

            {/* Visualizing the buckets */}
            <div className="flex space-x-4 mt-6">
                {buckets.map((bucket, bucketIndex) => (
                    <div key={bucketIndex} className="space-y-2">
                        <div className="text-lg text-center font-semibold text-gray-700">
                            Bucket {bucketIndex + 1}
                        </div>
                        <div className="flex space-x-2">
                            {bucket.map((num, index) => {
                                let bgColor = 'custom-skyblue';

                                if (comparedIndices.includes(index)) {
                                    bgColor = 'bg-yellow-500';
                                }

                                return (
                                    <div key={index}
                                        className={`h-24 w-24 flex items-center justify-center text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out ${bgColor}`}>
                                        {num}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {!isSorted && !hideStatus && (
                <div className="space-x-4 mt-4 text-2xl">
                    <span className="text-yellow-500">Yellow: Distributing to Buckets</span>
                    <span className="text-green-500">Green: Bucket Sorted</span>
                    <span className="text-red-500">Red: No Change</span>
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

export default BucketSort;
