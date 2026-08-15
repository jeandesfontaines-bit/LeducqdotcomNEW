import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import HeroHeader from "@/components/HeroHeader";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hero" element={<HeroHeader />} />
      </Routes>
    </BrowserRouter>
  );
}

