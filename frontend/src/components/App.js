import './App.css';
import NavBar from './NavBar';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Projects from './Projects';
import Tasks from './Tasks';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <NavBar />

        <div className="content">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Tasks" element={<Tasks />} />
          </Routes>
        </div>
      </ChakraProvider>
    </div>
  );
}

export default App;
