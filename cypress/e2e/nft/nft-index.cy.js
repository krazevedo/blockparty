/// <reference types="cypress" />
import selectors from './selectors';

let getText;

describe('NFT index page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays nfts in the index page', () => {
    cy.fixture('nfts.json').then((data) => {
      cy.get(selectors.nftCard).should('have.length', Object.keys(data).length);
      for (var index in data) {
        const contractName = data[index].contractName;
        const tokenID = data[index].tokenID;
        const thumb = data[index].thumbnail;
        cy.get(selectors.nftCard)
          .eq(index)
          .find(selectors.nftName)
          .should('be.visible')
          .then(($value) => {
            getText = $value.text();
            expect(getText).to.eq(`${contractName}ϟ#${tokenID}`);
          });

        cy.get(selectors.nftCard)
          .eq(index)
          .find(selectors.nftThumb)
          .invoke('attr', 'src')
          .should('contains', thumb);
      }
    });
  });
});
