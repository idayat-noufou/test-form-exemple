import { render, screen, waitFor } from '@testing-library/react';
import { RegisteredList } from './RegisteredList';
import { vi } from 'vitest';

// Mock de la fonction fetch
global.fetch = vi.fn();

describe('RegisteredList', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('display data', async () => {
        const mockData = [
            { _id: '1', nom: 'Doe', prenom: 'John', email: 'john.doe@example.com', ville: 'Paris', code: '75000' },
            { _id: '2', nom: 'Smith', prenom: 'Jane', email: 'jane.smith@example.com', ville: 'Lyon', code: '69000' },
        ];

        // Mock de la réponse fetch
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        render(<RegisteredList />);

        // Attendre que les données soient affichées
        for (const user of mockData) {
            await waitFor(() => {
                expect(screen.getByText(user.nom)).toBeInTheDocument();
                expect(screen.getByText(user.prenom)).toBeInTheDocument();
                expect(screen.getByText(user.email)).toBeInTheDocument();
                expect(screen.getByText(user.ville)).toBeInTheDocument();
                expect(screen.getByText(user.code)).toBeInTheDocument();
            });
        }
    });

    it('display message if empty list', async () => {
        // Mock de la réponse fetch avec une liste vide
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        render(<RegisteredList />);

        // Attendre que le message soit affiché
        await waitFor(() => {
            expect(screen.getByText('Aucun inscrit pour le moment.')).toBeInTheDocument();
        });
    });

    it('display api call error', async () => {
        // Mock de la réponse fetch avec une erreur
        fetch.mockResolvedValueOnce({
            ok: false,
        });

        render(<RegisteredList />);

        // Attendre que le message d'erreur soit affiché
        await waitFor(() => {
            expect(screen.getByText('Erreur : Erreur lors de la récupération des données')).toBeInTheDocument();
        });
    });

    it('display network error', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        render(<RegisteredList />);

        await waitFor(() => {
            expect(screen.getByText('Erreur : Network error')).toBeInTheDocument();
        });
    });
});
