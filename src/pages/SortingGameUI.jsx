import { useNavigate } from "react-router-dom";

export default function SortingGameUI() {
    const navigate = useNavigate();

    const handleVisualizationClick = () => {
        navigate("/visualization");
    };

    const handlePlayGameClick = () => {
        navigate("/game")
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {/* Title */}
            <div className="text-center mb-15">
                <h1 className="text-7xl font-bold text-gray-600 text-right">
                    <div className="flex items-center space-x-3 leading-[5rem]">
                        <div>
                            <div>SORTING</div>
                            <div>GAME</div>
                        </div>
                        <span className="ml-2 flex flex-col space-y-3 text-orange-500">
                            <span className="h-3 w-36 rounded-lg bg-orange-500"></span>
                            <span className="h-3 w-30 rounded-lg bg-orange-500"></span>
                            <span className="h-3 w-24 rounded-lg bg-orange-500"></span>
                            <span className="h-3 w-18 rounded-lg bg-orange-500"></span>
                            <span className="h-3 w-12 rounded-lg bg-orange-500"></span>
                            <span className="h-3 w-6 rounded-lg bg-orange-500"></span>
                        </span>
                    </div>
                </h1>
            </div>

            {/* Buttons */}
            <div className="space-y-6">
                <button
                    className="w-100 py-3 custom-yellow text-white font-bold text-5xl"
                    onClick={handleVisualizationClick}
                >
                    VISUALIZATION
                </button>
                <br />
                <button 
                className="w-100 py-3 custom-red text-white font-bold text-5xl"
                onClick={handlePlayGameClick}
                >
                    SORTING GAME
                </button>
            </div>
        </div>
    );
}
