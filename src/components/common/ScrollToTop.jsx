import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * This component automatically scrolls the window to the top (0, 0) 
 * whenever the route (pathname) changes.
 * 
 * Usage:
 * Place this component inside your <BrowserRouter> but outside your <Routes>.
 * Recommended to place it in the main Layout or App component.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the window
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // 'instant' for immediate scroll, 'smooth' for animated
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
