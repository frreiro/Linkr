import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "../../assets/styles/reset.css"
import GlobalStyle from '../../globalStyles';

import { Home } from '../../pages/Home';
import SignIn from "../SignInUp/SignIn";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
