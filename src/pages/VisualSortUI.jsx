import { useEffect, useState } from "react";
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
    const [isSorted, setIsSorted] = useState(false);
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
        setIsSorted(false);
    };

    const sortArray = () => {
        if (activeButton) {
            setIsSorting(true); // Trigger sorting
        }
    };

    useEffect(() => {
        console.log(isSorted);
    }, [isSorted])

    const buttons = [
        {
            onClick: resetArray,
            imgSrc: "src/assets/images/Shuffle.png",
            alt: "Shuffle",
            disabled: isSorting || !selectedSort,
        },
        {
            onClick: sortArray,
            imgSrc: "src/assets/images/SortingArrows.png",
            alt: "Sort",
            disabled: isSorting || isSorted || !selectedSort,
        },
        {
            onClick: () => navigate("/"),
            imgSrc: "src/assets/images/HomePage.png",
            alt: "Home",
            disabled: false,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-gray-600 text-right mt-10">
                VISUALIZATION
            </h1>

            <div className="space-y-4 space-x-4 mt-10">
                {Object.entries(sortingComponents).map(([key, values]) => (
                    <button
                        key={key}
                        className={`w-30 py-3 text-white font-bold text-2xl rounded-2xl cursor-pointer duration-300 transition transform ${!isSorting && "hover:scale-110"} disabled:cursor-not-allowed`}
                        style={{
                            backgroundColor: isSorting
                                ? activeButton === key
                                    ? values[1] // Active button color during sorting
                                    : "#c3c3c3" // Disabled color for non-active buttons
                                : activeButton === key
                                    ? values[1] // Active button color when sorting is off
                                    : values[0], // Default color when not active
                        }}
                        onClick={() => handleButtonClick(key)}
                        onMouseEnter={(e) => {
                            if (!isSorting) {
                                e.target.style.backgroundColor = values[1];
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSorting) {
                                e.target.style.backgroundColor = activeButton === key ? values[1] : values[0];
                            }
                        }}
                        disabled={isSorting}
                    >
                        {key}
                    </button>
                ))}
            </div>

            {/* Sorting Visualization */}
            <div className="mt-10 w-300 h-100 border-2 border-gray-300 flex justify-center items-center rounded-xl">
                {selectedSort ? (
                    selectedSort({ array: arr, setArr, isSorting, setIsSorting, isSorted, setIsSorted }) // Pass sorting props
                ) : (
                    <span className="text-2xl text-gray-400">Select a sorting algorithm</span>
                )}
            </div>

            <div className="flex space-x-15 mt-10 mb-10">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        className={`w-20 h-20 custom-gray rounded-full flex items-center justify-center text-2xl transition transform ${!button.disabled ? 'hover:scale-110' : 'disabled:opacity-50'}`}
                        onClick={button.onClick}
                        disabled={button.disabled}
                    >
                        <img src={button.imgSrc} alt={button.alt} className="w-12 h-12" />
                    </button>
                ))}
            </div>
        </div>
    );
}
