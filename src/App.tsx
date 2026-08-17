import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import { trackPageView } from "@/utils/analytics";
import Landing from "@/pages/Landing";
import HeroHeader from "@/components/HeroHeader";
import NotFound from "@/pages/NotFound";

export default function App() {
  // Enable mobile optimizations
  const { isMobile } = useMobileOptimization();

  // Track page views on route change
  useEffect(() => {
    trackPageView(window.location.pathname, document.title);
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/hero" element={<HeroHeader />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
