import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BubbleSort from "../components/BubbleSort";
import CountingSort from "../components/CountingSort";
import InsertionSort from "../components/InsertionSort";
import MergeSort from "../components/MergeSort";
import QuickSort from "../components/QuickSort";
import RadixSort from "../components/RadixSort";
import SelectionSort from "../components/SelectionSort";
import generateRandomArray from "../services/GenerateRandomArray";

export default function VisualSortUI() {
    const length = 6;
    const maxValue = 1000;

    const navigate = useNavigate();
    const [arr, setArr] = useState(generateRandomArray(length, maxValue));
    const [isSorting, setIsSorting] = useState(false);
    const [selectedSort, setSelectedSort] = useState(null);
    const [activeButton, setActiveButton] = useState(null);

    const sortingComponents = {
        "Bubble": ["#00A86B", "#009760", (props) => <BubbleSort {...props} />],
        "Insertion": ["#F4743B", "#db6835", (props) => <InsertionSort {...props} />],
        "Merge": ["#F1BD41", "#d8aa3a", (props) => <MergeSort {...props} />],
        "Quick": ["#D4463F", "#be3f38", (props) => <QuickSort {...props} />],
        "Radix": ["#66BCB4", "#5ba9a2", (props) => <RadixSort {...props} />],
        "Selection": ["#0067A5", "#005c94", (props) => <SelectionSort {...props} />],
        // "Counting": ["#66BCB4", "#5ba9a2", (props) => <CountingSort {...props}/>],
    };

    const handleButtonClick = (key) => {
        setSelectedSort(() => sortingComponents[key]?.[2]); // Store function reference
        setActiveButton(key);
    };

    const resetArray = () => {
        const newArr = generateRandomArray(length, maxValue);
        setArr(newArr);
        setIsSorting(false);
    };

    const sortArray = () => {
        if (activeButton) {
            setIsSorting(true); // Trigger sorting
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-gray-600 text-right mt-10">
                VISUALIZATION
            </h1>

            <div className="space-y-4 space-x-4 mt-10">
                {Object.entries(sortingComponents).map(([key, values]) => (
                    <button
                        key={key}
                        className="w-30 py-3 text-white font-bold text-2xl rounded-2xl cursor-pointer transition duration-300"
                        style={{
                            backgroundColor: activeButton === key ? values[1] : values[0],
                        }}
                        onClick={() => handleButtonClick(key)}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = values[1])}
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = activeButton === key ? values[1] : values[0])
                        }
                    >
                        {key}
                    </button>
                ))}
            </div>

            {/* Sorting Visualization */}
            <div className="mt-10 w-300 h-100 border-2 border-gray-300 flex justify-center items-center rounded-xl">
                {selectedSort ? (
                    selectedSort({ array: arr, setArr, isSorting, setIsSorting }) // Pass sorting props
                ) : (
                    <span className="text-gray-400">Select a sorting algorithm</span>
                )}
            </div>

            {/* Control Buttons */}
            <div className="flex space-x-15 mt-10 mb-10">
                <button className="w-20 h-20 custom-gray rounded-full flex items-center justify-center text-2xl"
                    onClick={resetArray}
                    disabled={isSorting}
                >
                    <img src="src/assets/images/Shuffle.png" alt="icon" className="w-12 h-12" />
                </button>
                <button className="w-20 h-20 custom-gray rounded-full flex items-center justify-center text-2xl"
                    onClick={sortArray}>
                    <img src="src/assets/images/SortingArrows.png" alt="icon" className="w-12 h-12" />
                </button>
                <button className="w-20 h-20 custom-gray rounded-full flex items-center justify-center text-2xl"
                    onClick={() => navigate("/")}>
                    <img src="src/assets/images/HomePage.png" alt="icon" className="w-12 h-12" />
                </button>
            </div>
        </div>
    );
}
