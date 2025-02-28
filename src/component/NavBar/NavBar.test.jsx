// Navbar.test.jsx
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Navbar} from './NavBar.jsx';
import {vi} from 'vitest';
import toast from "react-hot-toast";

// vi.mock("react-hot-toast", () => ({
//   error: vi.fn(),
//   success: vi.fn(),
// }));
vi.mock('react-hot-toast', () => ({
    default: {
        error: vi.fn(), success: vi.fn(),
    }, toast: {
        success: vi.fn(), error: vi.fn(),
    },
}));

describe('Navbar', () => {
    it('display navbar', () => {
        render(<MemoryRouter>
            <Navbar isAuthenticated={true} setIsAuthenticated={() => {
            }}/>
        </MemoryRouter>);

        expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
        expect(screen.getByText(/Liste des inscrits/i)).toBeInTheDocument();
        expect(screen.getByText(/Déconnexion/i)).toBeInTheDocument();
    });

    it('do not show login screen', () => {
        render(<MemoryRouter>
            <Navbar isAuthenticated={false} setIsAuthenticated={() => {
            }}/>
        </MemoryRouter>);

        expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
        expect(screen.getByText(/Liste des inscrits/i)).toBeInTheDocument();
        expect(screen.queryByText(/Déconnexion/i)).not.toBeInTheDocument();
    });

    it('redirect to login', async () => {
        const setIsAuthenticated = vi.fn();
        const navigate = vi.fn();

        render(<MemoryRouter>
            <Navbar isAuthenticated={true} setIsAuthenticated={setIsAuthenticated}/>
        </MemoryRouter>);

        fireEvent.click(screen.getByText(/Déconnexion/i));
        expect(setIsAuthenticated).toHaveBeenCalledWith(false);

        // await waitFor(() => {
        //     // expect(navigate).toHaveBeenCalledWith("/login")
        //     expect(toast.success).toHaveBeenCalledWith("Déconnexion réussie !");
        // });
    });
});
