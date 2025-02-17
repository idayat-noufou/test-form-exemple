import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Formulaire } from './component/Formulaire/Formulaire.jsx';
import { RegisteredList } from './component/RegisteredList/RegisteredList.jsx';
import { LoginPage } from './component/Login/LoginPage.jsx';
import { Navbar } from './component/Navbar/Navbar.jsx';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Router>
            <Toaster />
            <div className="App min-h-screen p-6 bg-gray-100">
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                <Routes>
                    <Route path="/" element={<Formulaire />} />
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/list" element={<RegisteredList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
