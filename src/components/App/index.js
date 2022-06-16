import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from '../../globalStyles';
import { Home } from "../../pages/Home";
import SignIn from "../SignInUp/SignIn";
import SignUp from '../SignInUp/SignUp';
import Timeline from "../Timeline"

import "../../assets/reset.css"
import "../../assets/styles/reset.css"

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
