import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyle from '../../globalStyles';

import { Home } from '../../pages/Home';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
