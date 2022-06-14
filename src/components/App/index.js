import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../SignInUp/SignIn";

import "../../assets/styles/reset.css"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>} > </Route>
            </Routes>
        </BrowserRouter>

    )
}