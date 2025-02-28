import { render } from '@testing-library/react';
import { PrivateRoute } from './PrivateRoute';
import { vi } from 'vitest';

vi.mock('react-router-dom', () => ({
    Navigate: ({ to }) => <div>Redirected to {to}</div>,
}));

describe('PrivateRoute', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('display route', () => {
        vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-token');

        const { getByText } = render(
                <PrivateRoute>
                    <div>Contenu protégé</div>
                </PrivateRoute>
        );

        expect(getByText('Contenu protégé')).toBeInTheDocument();
    });

    it('redirect to another route', () => {
        vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

        const { getByText } = render(
                <PrivateRoute>
                    <div>Contenu protégé</div>
                </PrivateRoute>
        );

        expect(getByText('Redirected to /test-form-exemple/login')).toBeInTheDocument();
    });
});
