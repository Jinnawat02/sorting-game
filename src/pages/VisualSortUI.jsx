import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BubbleSort from "../components/BubbleSort";
import InsertionSort from "../components/InsertionSort";
import MergeSort from "../components/MergeSort";
import SelectionSort from "../components/SelectionSort";

export default function VisualSortUI() {
    const navigate = useNavigate();

    const sortingComponents = {
        'Bubble': ['#00A86B', '#009760', <BubbleSort />],
        'Insertion': ['#F4743B', '#db6835', <InsertionSort />],
        'Merge': ['#F1BD41', '#d8aa3a', <MergeSort />],
        'Selection': ['#0067A5', '#005c94', <SelectionSort />],
        'Temp1': ['#66BCB4', '#5ba9a2'],
        'Temp2': ['#D4463F', '#be3f38']
    };

    const [selectedComponent, setSelectedComponent] = useState(null);
    const [activeButton, setActiveButton] = useState(null); // To track the active button

    const handleButtonClick = (key, component) => {
        setSelectedComponent(component);
        setActiveButton(key); // Set the active button
    };

    const handleHomePageClick = () => {
        navigate("/"); // Navigate to home page
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-gray-600 text-right mt-10">
                VISUALIZATION
            </h1>

            {/* Sorting Buttons */}
            <div className="space-y-4 space-x-4 mt-10">
                {Object.entries(sortingComponents).map(([key, values]) => (
                    <button
                        key={key}
                        className="w-30 py-3 text-white font-bold text-xl rounded-2xl cursor-pointer"
                        style={{
                            backgroundColor: activeButton === key ? values[1] : values[0], // Use color[1] when active
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = values[1]}
                        onMouseLeave={(e) => e.target.style.backgroundColor = activeButton === key ? values[1] : values[0]}
                        onClick={() => handleButtonClick(key, values[2])}
                    >
                        {key}
                    </button>
                ))}
            </div>

            {/* Empty Box */}
            <div className="mt-10 w-300 h-100 border-2 border-gray-300 flex justify-center items-center rounded-xl">
                {selectedComponent ? (
                    selectedComponent // Render the selected component inside the box
                ) : (
                    <span className="text-gray-400 ">Select a sorting algorithm</span>
                )}
            </div>

            {/* Circle Buttons */}
            <div className="flex space-x-15 mt-10 mb-10">
                <button className="w-20 h-20 custom-gray rounded-full flex items-center justify-center text-2xl">
                    <img src="src/assets/images/Shuffle.png" alt="icon" className="w-12 h-12" />
                </button>
                <button className="w-20 h-20 custom-gray rounded-full flex items-center justify-center text-2xl">
                    <img src="src/assets/images/SortingArrows.png" alt="icon" className="w-12 h-12" />
                </button>
                <button 
                    className="w-20 h-20 custom-gray rounded-full flex items-center justify-center text-2xl"
                    onClick={handleHomePageClick} // On click, navigate to the home page
                >
                    <img src="src/assets/images/HomePage.png" alt="icon" className="w-12 h-12" />
                </button>
            </div>
        </div>
    );
}