import { useEffect, useState } from 'react'
import './App.css'
import Main from './components/SearchSection'
import Header from './components/Header'
import Search from './components/SearchInput'
import Mode from "./context/Mode"


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };


  return ( 
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black mt-4'} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-5 flex justify-between items-center shadow-md border-gray-200 border-b-2">
     <Header className=''/>
     <Mode isDarkMode={isDarkMode} handleToggle={handleToggle} />
      </div>
      <Search />
      <Main />
    </div>
  );
}

export default App
