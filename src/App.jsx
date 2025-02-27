import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Formulaire} from './component/Formulaire/Formulaire.jsx';
import {RegisteredList} from './component/RegisteredList/RegisteredList.jsx';
import {LoginPage} from './component/Login/LoginPage.jsx';
import {Navbar} from './component/NavBar/NavBar.jsx';
import {Toaster} from 'react-hot-toast';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Router>
            <Toaster/>
            <div className="App min-h-screen p-6 bg-gray-100" data-testid="app">
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
                <Routes>
                    <Route
                        path="/test-form-exemple/"
                        element={<Navigate to="/test-form-exemple/form" replace={true}/>}
                    />
                    <Route path="/test-form-exemple/form" element={<Formulaire/>}/>
                    <Route path="/test-form-exemple/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>}/>
                    <Route path="/test-form-exemple/list" element={<RegisteredList/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
