import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import SortingGameUI from './pages/SortingGameUI';
import VisualSortUI from "./pages/VisualSortUI";
import PlayGame from "./pages/PlayGameUI";


function App() {
  return (
    <div className="custom-bg">
      <Router>
        <Routes>
          <Route path="/" element={<SortingGameUI />} />
          <Route path="/visualization" element={<VisualSortUI />} />
          <Route path="/game" element={<PlayGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
