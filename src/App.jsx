import { HashRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Intro from "./components/intro/Intro";
import Storage from "./components/storage/Storage";

export default function App() {
  return (
    <CookiesProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/storage/*" element={<Storage />} />
          <Route path="*" element={<Storage />} />
        </Routes>
      </HashRouter>
    </CookiesProvider>
  );
}
