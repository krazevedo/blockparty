/// <reference types="cypress" />
let getText;

describe('NFT index page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('displays nfts in the index page', () => {
    cy.fixture('nfts.json').then((data) => {
      for (var index in data) {
        const contractName = data[index].contractName;
        const tokenID = data[index].tokenID;
        const thumb = data[index].thumbnail;
        cy.get('body > main > div > div')
          .eq(index)
          .find('div.css-porbmv span')
          .should('be.visible');
        cy.get('body > main > div > div').should(
          'have.length',
          24
          // Object.keys(data).length
        );

        cy.get('body > main > div > div')
          .eq(index)
          .find('div.css-porbmv span')
          .then(($value) => {
            getText = $value.text();
            expect(getText).to.eq(`${contractName}ϟ#${tokenID}`);
          });

        cy.get('body > main > div > div')
          .eq(index)
          .find('img')
          .invoke('attr', 'src')
          .should('contains', thumb);
      }
    });
  });
});
