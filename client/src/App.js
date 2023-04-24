import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function App() {
  const[isDarkMode,setisDarkMode]=useState(window.localStorage.getItem("theme") === "true");
  
   window.onstorage=(e)=>{if(e.key==='theme'){setisDarkMode(window.localStorage.getItem("theme") === "true");console.log(isDarkMode);}}

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider isDarkMode={isDarkMode}> {/* Pass isDarkMode as a prop to ThemeProvider */}
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
