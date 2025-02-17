import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

export const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        toast.success('Déconnexion réussie !');
        navigate('/login');
    };

    return (
        <nav className="mb-6 flex justify-between">
            <div>
                <Link to="/" className="mr-4 text-blue-500">Inscription</Link>
                <Link to="/list" className="text-blue-500">Liste des inscrits</Link>
                {!isAuthenticated && <Link to="/login" className="ml-4 text-blue-500">Connexion</Link>}
            </div>
            {isAuthenticated && (
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                    Déconnexion
                </button>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setIsAuthenticated: PropTypes.func.isRequired,
};
