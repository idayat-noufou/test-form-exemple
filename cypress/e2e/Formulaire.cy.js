describe('Inscription form testing', () => {
    beforeEach(() => {
        cy.visit('/test-form-exemple/form');
    });

    it('display form', () => {
        cy.get('input[name="nom"]').should('be.visible');
        cy.get('input[name="prenom"]').should('be.visible');
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[name="date"]').should('be.visible');
        cy.get('input[name="ville"]').should('be.visible');
        cy.get('input[name="code"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.disabled');
    });

    it('form is valid and form submit is ok', () => {
        cy.intercept('POST', `${import.meta.env.VITE_API_URL}/users/create`,
            { statusCode: 201, ok: true });

        cy.get('input[name="nom"]').type('TestN');
        cy.get('input[name="prenom"]').type('TestP');
        cy.get('input[name="email"]').type('testp.testn@example.com');
        cy.get('input[name="date"]').type('1990-05-20');
        cy.get('input[name="ville"]').type('Paris');
        cy.get('input[name="code"]').type('75001');

        cy.get('button[type="submit"]').should('be.enabled').click();
        
        cy.contains('Les informations ont bien été enregistrées').should('be.visible');
    });

    it('form name is invalid', () => {
        cy.get('input[name="nom"]').type('TestN@');
        cy.get('input[name="prenom"]').type('TestP');
        cy.get('input[name="email"]').type('testp.testn@example.com');
        cy.get('input[name="date"]').type('1990-05-20');
        cy.get('input[name="ville"]').type('Paris');
        cy.get('input[name="code"]').type('75001');
        cy.get('button[type="submit"]').should('be.enabled').click();
        cy.contains('is not a permitted character').should('be.visible');
    });

    it('form email is invalid', () => {
        cy.get('input[name="nom"]').type('TestN');
        cy.get('input[name="prenom"]').type('TestP');
        cy.get('input[name="email"]').type('testp.testn@dd');
        cy.get('input[name="date"]').type('1990-05-20');
        cy.get('input[name="ville"]').type('Paris');
        cy.get('input[name="code"]').type('75001');
        cy.get('button[type="submit"]').should('be.enabled').click();
        cy.contains('email is not valid').should('be.visible');
    });

    it('form age is inferior to 18', () => {
        cy.get('input[name="nom"]').type('TestN');
        cy.get('input[name="prenom"]').type('TestP');
        cy.get('input[name="email"]').type('testp.testn@example.com');
        cy.get('input[name="date"]').type('2010-05-20');
        cy.get('input[name="ville"]').type('Paris');
        cy.get('input[name="code"]').type('75001');
        cy.get('button[type="submit"]').should('be.enabled').click();
        cy.contains('age must be over 18').should('be.visible');
    });

    it('form code is invalid', () => {
        cy.get('input[name="nom"]').type('TestN');
        cy.get('input[name="prenom"]').type('TestP');
        cy.get('input[name="email"]').type('testp.testn@example.com');
        cy.get('input[name="date"]').type('1990-05-20');
        cy.get('input[name="ville"]').type('Paris');
        cy.get('input[name="code"]').type('750');
        cy.get('button[type="submit"]').should('be.enabled').click();
        cy.contains('postal code is not valid').should('be.visible');
    });

    it('form submit error', () => {
        cy.intercept('POST', `${import.meta.env.VITE_API_URL}/users/create`, { statusCode: 500, ok : false });

        cy.get('input[name="nom"]').type('TestN');
        cy.get('input[name="prenom"]').type('TestP');
        cy.get('input[name="email"]').type('testp.testn@example.com');
        cy.get('input[name="date"]').type('1990-05-20');
        cy.get('input[name="ville"]').type('Paris');
        cy.get('input[name="code"]').type('75001');

        cy.get('button[type="submit"]').click();

        cy.contains('Erreur lors de l\'enregistrement de l\'utilisateur').should('be.visible');
    });
});
