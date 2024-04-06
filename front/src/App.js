import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageUpload from "./pages/imageUpload";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImageUpload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
