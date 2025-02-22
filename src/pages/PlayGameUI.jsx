import { useState } from "react";
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
    const maxValue = 100;

    const navigate = useNavigate();
    const [arr, setArr] = useState(generateRandomArray(length, maxValue));
    const [isSorting, setIsSorting] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
    const [showVisualization, setShowVisualization] = useState(false);

    const sortingAlgorithms = {
        "Bubble": (props) => <BubbleSort {...props} />,
        "Insertion": (props) => <InsertionSort {...props} />,
        "Merge": (props) => <MergeSort {...props} />,
        "Quick": (props) => <QuickSort {...props} />,
        "Radix": (props) => <RadixSort {...props} />,
        "Selection": (props) => <SelectionSort {...props} />,
    };

    const algorithmKeys = Object.keys(sortingAlgorithms);

    // ฟังก์ชันสุ่มตัวเลขใหม่
    const resetArray = () => {
        setArr(generateRandomArray(length, maxValue));
        setIsSorting(false);
        setSelectedAlgorithm(""); 
        setShowVisualization(false);
    };

    // ฟังก์ชันสุ่ม Algorithm และแสดง Visualization (กล่องตัวเลขหายไปทันที)
    const randomSort = () => {
        if (isSorting) return;

        setShowVisualization(true); // ซ่อนกล่องตัวเลขก่อนเริ่ม Sorting
        setTimeout(() => {
            setIsSorting(true);
            const randomAlgorithm = algorithmKeys[Math.floor(Math.random() * algorithmKeys.length)];
            setSelectedAlgorithm(randomAlgorithm); // เก็บชื่ออัลกอริธึมที่เลือก
        }, 200);
    };

    const handleUserChoice = (algorithm) => {
        if (!selectedAlgorithm) return; // ถ้ายังไม่เลือก Algorithm ให้ return
        if (algorithm === selectedAlgorithm) {
            Swal.fire({
                text: `You chose ${algorithm} and it's correct!`,
                icon: "success",
                confirmButtonColor: "#4CAF50",
            });
        } else {
            Swal.fire({
                text: `You chose ${algorithm}, but the correct answer is ${selectedAlgorithm}.`,
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative">
            <div className="absolute top-5 right-5 flex space-x-4">
                <button onClick={resetArray} disabled={isSorting} className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center shadow-md">
                    <img src="src/assets/images/Shuffle.png" alt="Shuffle" className="w-12 h-12" />
                </button>
                <button onClick={randomSort} disabled={isSorting} className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center shadow-md">
                    <img src="src/assets/images/SortingArrows.png" alt="Sort" className="w-12 h-12" />
                </button>
                <button onClick={() => navigate("/")} className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center shadow-md">
                    <img src="src/assets/images/HomePage.png" alt="Home" className="w-12 h-12" />
                </button>
            </div>

            <h1 className="text-5xl font-bold text-gray-800 mt-10">
                SORTING GAME
            </h1>

            {/* แสดงตัวเลข 6 ตัวก่อนเริ่ม Sorting*/}
            {!showVisualization && (
                <>
                <div className="mt-10  flex justify-center items-center rounded-xl gap-4">
                    {arr.map((value, index) => (
                        <div key={index} className="h-36 w-36 flex text-5xl items-center justify-center text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out bg-gray-300">
                            {value}
                        </div>
                    ))}
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mt-5">
                        Unsorted
                </h1>
                </>
            )}

            {/* แสดง Visualization เมื่อกดปุ่ม Sort*/}
            {showVisualization && (
                <div className="mt-10  flex justify-center items-center rounded-xl">
                    {selectedAlgorithm && sortingAlgorithms[selectedAlgorithm]({ array: arr, setArr, isSorting, setIsSorting })}
                </div>
                
            )}

            {/* ตัวเลือกให้ผู้ใช้เลือกอัลกอริธึม */}
            <div className="grid grid-cols-3 gap-4 mt-10">
                {algorithmKeys.map((algorithm, index) => {
                    const colors = ["bg-yellow-500", "bg-blue-500", "bg-orange-500", "bg-teal-500", "bg-red-500", "bg-green-500"];
                    const defaultColor = colors[index % colors.length]; 
                    return (
                        <button
                            key={algorithm}
                            onClick={() => handleUserChoice(algorithm)}
                            className={`w-60 h-20 text-white text-2xl font-bold rounded-lg shadow-md transition duration-300 
                                ${defaultColor} hover:opacity-80`}
                        >
                            {algorithm}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
