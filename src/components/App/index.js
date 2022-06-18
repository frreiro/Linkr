import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import '../../assets/styles/reset.css';
import GlobalStyle from '../../globalStyles';

import SignIn from '../SignInUp/SignIn';
import SignUp from '../SignInUp/SignUp';
import Timeline from '../Timeline';
import UserProfile from '../UserProfile';
import DataContext from '../context/context.js';

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
