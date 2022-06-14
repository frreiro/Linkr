import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "../Timeline";
import "../../assets/reset.css"
import GlobalStyle from "../../globalStyles";


export default function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/timeline" element={<Timeline />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}