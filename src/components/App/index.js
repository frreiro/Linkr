<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
>>>>>>> 70e3dcf85a9ff7e3c62a02bd08b2191a3c8e83e1

import '../../assets/styles/reset.css';
import GlobalStyle from '../../globalStyles';

<<<<<<< HEAD
import SignIn from '../SignInUp/SignIn';
import SignUp from '../SignInUp/SignUp';
import Timeline from '../Timeline';
import UserProfile from '../UserProfile';
=======
import "../../assets/reset.css"
import "../../assets/styles/reset.css"
import DataContext from "../context/context";
>>>>>>> 70e3dcf85a9ff7e3c62a02bd08b2191a3c8e83e1

export default function App() {

  const [data, setData] = useState({})

  return (
    <DataContext.Provider value={{data, setData}}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/users/:id" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}
