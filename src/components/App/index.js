import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import GlobalStyle from '../../globalStyles';
import { Home } from "../../pages/Home";
import SignIn from "../SignInUp/SignIn";
import SignUp from '../SignInUp/SignUp';
import Timeline from "../Timeline"

import "../../assets/reset.css"
import "../../assets/styles/reset.css"
import DataContext from "../context/context";

export default function App() {

  const [data, setData] = useState({})

  return (
    <DataContext.Provider value={{data, setData}}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} /> 
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}
