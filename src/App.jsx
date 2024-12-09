import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Formulaire } from './component/Formulaire/Formulaire.jsx';
import { RegisteredList } from './component/RegisteredList/RegisteredList.jsx';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
    return (
        <Router>
            <Toaster />
            <div className="App min-h-screen p-6 bg-gray-100">
                <nav className="mb-6">
                    <Link to="/" className="mr-4 text-blue-500">Inscription</Link>
                    <Link to="/list" className="text-blue-500">Liste des inscrits</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Formulaire />} />
                    <Route path="/list" element={<RegisteredList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
