import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "../../assets/styles/reset.css"
import GlobalStyle from '../../globalStyles';

import { Home } from '../../pages/Home';
import SignIn from "../SignInUp/SignIn";
import SignUp from '../SignInUp/SignUp';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
