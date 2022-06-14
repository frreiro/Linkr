import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "../Timeline";
import "../../assets/reset.css"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<h1>Teste</h1>} /> */}
                <Route path="/" element={<Timeline />} />
            </Routes>
        </BrowserRouter>

    );
}