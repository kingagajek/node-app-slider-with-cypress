describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.wait(5000);
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.wait(5000);
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});

describe('Swiper Gallery UX/UI Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.wait(1000);
  });

  it('allows user to navigate slides with next and prev buttons', () => {
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'London');
    cy.get('.swiper-button-prev').click();
    cy.get('.swiper-slide-active').should('contain', 'Rome');
  });

  it('displays title and description for each slide', () => {
    const slides = [
      { title: 'Rome', description: 'Italy' },
      { title: 'London', description: 'United Kingdom' },
      { title: 'Paris', description: 'France' }
    ];

    slides.forEach((slide, index) => {
      if (index > 0) {
        cy.get('.swiper-button-next').click();
      }

      cy.get('.swiper-slide-active').within(() => {
        cy.contains('h1', slide.title).should('be.visible');
        cy.contains('p', slide.description).should('be.visible');
      });
    });
  });

  it('displays all key gallery elements', () => {
    cy.get('.swiper').should('be.visible');
    cy.get('.swiper-slide').should('have.length', 3);
    cy.get('.swiper-button-next').should('exist').and('be.visible');
    cy.get('.swiper-button-prev').should('exist').and('be.visible');
  });

  it('displays properly on various screen sizes', () => {
    const viewports = ['macbook-15', 'ipad-2', 'iphone-6'];

    viewports.forEach(view => {
      cy.viewport(view);
      cy.visit('http://localhost:3000');
      cy.wait(1000);
      cy.get('.swiper').should('be.visible');
      cy.get('.swiper-button-next').click();
      cy.get('.swiper-slide-active').should('exist');
    });
  });
});
