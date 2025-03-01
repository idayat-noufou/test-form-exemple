describe('RegisteredList Page', () => {
    beforeEach(() => {
        cy.visit('/test-form-exemple/list'); // Assurez-vous que l'URL est correcte
    });

    it('affiche le titre de la page', () => {
        cy.contains('Liste des inscrits').should('be.visible');
    });

    it('affiche un message si aucun inscrit', () => {
        cy.intercept('GET', `${import.meta.env.VITE_API_URL}/users`, { body: [] }).as('getUsers');
        cy.wait('@getUsers');
        cy.contains('Aucun inscrit pour le moment.').should('be.visible');
    });

    it('affiche la liste des inscrits avec des données valides', () => {
        cy.intercept('GET', `${import.meta.env.VITE_API_URL}/users`, {
            body: [
                { _id: '1', nom: 'Doe', prenom: 'John', email: 'john.doe@example.com', ville: 'Paris', code: '75001' }
            ]
        }).as('getUsers');

        cy.wait('@getUsers');
        cy.get('table').should('be.visible');
        cy.contains('Doe').should('be.visible');
        cy.contains('John').should('be.visible');
        cy.contains('john.doe@example.com').should('be.visible');
        cy.contains('Paris').should('be.visible');
        cy.contains('75001').should('be.visible');
    });

    it('affiche un message d\'erreur en cas de problème serveur', () => {
        cy.intercept('GET', `${import.meta.env.VITE_API_URL}/users`, {
            statusCode: 500,
            body: { message: 'Erreur serveur' }
        }).as('getUsersError');

        cy.wait('@getUsersError');
        cy.contains('Erreur : Erreur lors de la récupération des données').should('be.visible');
    });
});
