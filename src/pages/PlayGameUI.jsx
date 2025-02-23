import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BubbleSort from "../components/BubbleSort";
import InsertionSort from "../components/InsertionSort";
import MergeSort from "../components/MergeSort";
import QuickSort from "../components/QuickSort";
import RadixSort from "../components/RadixSort";
import SelectionSort from "../components/SelectionSort";
import generateRandomArray from "../services/GenerateRandomArray";

export default function PlayGame() {
    const length = 6;
    const maxValue = 1000;
    const timeSleep = 1000;

    const navigate = useNavigate();
    const [arr, setArr] = useState(generateRandomArray(length, maxValue));
    const [isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

    const sortingComponents = {
        "Bubble": ["#00A86B", "#009760", (props) => <BubbleSort {...props} />],
        "Insertion": ["#F4743B", "#db6835", (props) => <InsertionSort {...props} />],
        "Merge": ["#F1BD41", "#d8aa3a", (props) => <MergeSort {...props} />],
        "Quick": ["#D4463F", "#be3f38", (props) => <QuickSort {...props} />],
        "Radix": ["#66BCB4", "#5ba9a2", (props) => <RadixSort {...props} />],
        "Selection": ["#0067A5", "#005c94", (props) => <SelectionSort {...props} />],
    };

    const algorithmKeys = Object.keys(sortingComponents);

    useEffect(() => {
        setSelectedAlgorithm(algorithmKeys[Math.floor(Math.random() * algorithmKeys.length)]);
    }, []);

    const resetArray = () => {
        setArr(generateRandomArray(length, maxValue));
        setIsSorting(false);
        setIsSorted(false);
        setSelectedAlgorithm(null);
        setSelectedAlgorithm(algorithmKeys[Math.floor(Math.random() * algorithmKeys.length)]);
    };

    const startSorting = () => {
        if (isSorting || !selectedAlgorithm) return;
        setIsSorting(true);
        setIsSorted(false);
    };

    const handleUserChoice = (algorithm) => {
        if (!selectedAlgorithm) return;
        Swal.fire({
            text: `You chose ${algorithm}, ${algorithm === selectedAlgorithm ? "and it's correct!" : "but the correct answer is " + selectedAlgorithm + "."}`,
            icon: algorithm === selectedAlgorithm ? "success" : "error",
            confirmButtonColor: algorithm === selectedAlgorithm ? "#4CAF50" : "#d33",
        });
    };

    const buttons = [
        {
            onClick: resetArray,
            imgSrc: "src/assets/images/Shuffle.png",
            alt: "Shuffle",
            disabled: isSorting,
        },
        {
            onClick: startSorting,
            imgSrc: "src/assets/images/SortingArrows.png",
            alt: "Sort",
            disabled: isSorting || isSorted,
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
            <div className="absolute top-5 right-5 flex space-x-4">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        className={`w-20 h-20 custom-gray rounded-full flex items-center justify-center text-2xl transition transform ${!button.disabled ? 'hover:scale-110' : 'disabled:opacity-50'}`}
                        onClick={button.onClick}
                        disabled={button.disabled}
                        title={button.alt}
                    >
                        <img src={button.imgSrc} alt={button.alt} className="w-12 h-12" />
                    </button>
                ))}
            </div>

            <h1 className="text-5xl font-bold text-gray-600 mt-10">SORTING GAME</h1>

            <div className="mt-10 w-300 h-80 border-2 border-gray-300 flex justify-center items-center rounded-xl">
                {selectedAlgorithm && (
                    <div className="flex flex-col items-center">
                        {sortingComponents[selectedAlgorithm][2]({
                            array: arr,
                            setArr,
                            isSorting,
                            setIsSorting,
                            isSorted,
                            setIsSorted,
                            timeSleep,
                            hideStatus: true,
                        })}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-10">
                {algorithmKeys.map((algorithm) => (
                    <button
                        key={algorithm}
                        onClick={() => handleUserChoice(algorithm)}
                        className={`w-60 h-20 text-white text-2xl font-bold rounded-lg shadow-md duration-300 cursor-pointer transform ${isSorted ? "hover:scale-105" : ""} disabled:cursor-not-allowed`}
                        style={{ backgroundColor: sortingComponents[algorithm][0] }}
                        onMouseEnter={(e) => {
                            if (isSorted) {
                                e.target.style.backgroundColor = sortingComponents[algorithm][1];
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (isSorted) {
                                e.target.style.backgroundColor = sortingComponents[algorithm][0];
                            }
                        }}
                        disabled={isSorting || !isSorted}
                    >
                        {algorithm}
                    </button>
                ))}
            </div>
        </div>
    );
}
