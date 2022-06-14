import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../../globalStyles";
import { Home } from "../../pages/Home";
import Timeline from "../Timeline"
import "../../assets/reset.css"


export default function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/timeline" element={<Timeline />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}