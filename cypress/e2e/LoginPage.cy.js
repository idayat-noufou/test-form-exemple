describe('Login Page testing', () => {
    beforeEach(() => {
        cy.visit('/test-form-exemple/login');
    });

    it('display form', () => {
        cy.get('h2').should('contain', 'Login');
        cy.get('input#email').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('stop empty fiel submission', () => {
        cy.get('button[type="submit"]').click();
        cy.get('input#email:invalid').should('exist');
        cy.get('input#password:invalid').should('exist');
    });

    it('display error message for invalid user', () => {
        cy.get('input#email').type('fakeuser@example.com');
        cy.get('input#password').type('wrongpassword');
        cy.get('button[type="submit"]').click();
        cy.get('.text-red-500').should('contain', 'Invalid credentials. Please try again.');
    });

    it('connect valid admin and redirect', () => {
        cy.intercept('POST', `${import.meta.env.VITE_API_URL}/auth/login`, {
            statusCode: 200,
            body: { token: 'fake-jwt-token' },
        }).as('loginRequest');

        cy.get('input#email').type('validuser@example.com');
        cy.get('input#password').type('validpassword');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');
        cy.window().its('localStorage.token').should('eq', 'fake-jwt-token');
        cy.url().should('include', '/list');
    });

    it('display server error', () => {
        cy.intercept('POST', `${import.meta.env.VITE_API_URL}/auth/login`, {
            statusCode: 500,
            body: { message: 'Internal Server Error' },
        }).as('loginRequest');

        cy.get('input#email').type('validuser@example.com');
        cy.get('input#password').type('validpassword');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');
        cy.get('.text-red-500').should('contain', 'Invalid credentials. Please try again.');
    });
});
