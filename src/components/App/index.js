import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../../assets/styles/reset.css';
import GlobalStyle from '../../globalStyles';

import SignIn from '../SignInUp/SignIn';
import SignUp from '../SignInUp/SignUp';
import Timeline from '../Timeline';
import UserProfile from '../UserProfile';
import Hashtag from '../Hashtag';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/hashtag/:hashtagName" element={<Hashtag />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
