/// <reference types="cypress" />

describe("Lets's check 1Finance website",()=>{

    beforeEach(()=>{
        cy.viewport('macbook-16')
        Cypress.on('uncaught:exception', (err) => {
            // returning false here prevents Cypress from
            // failing the test
            console.log('Cypress detected uncaught exception: ', err);
            return false;
        });
    });


    it('Load the 1finance website',()=>{
        
        cy.visit('https://1finance.co.in')
        cy.url().should('include','https://1finance.co.in/')
        
        
        // cy.wait(3000)
    });
    
    it("Magazins",()=>{
        cy.get('#header > div.navbar.hidden > div:nth-child(1) > a:nth-child(1)').invoke('removeAttr','target').click();
        cy.url().should('include',"https://1finance.co.in/magazine/")
        // cy.get('[data-aos-delay="100"] > :nth-child(1) > .post-image').click()
        // .then(()=>{
        //     // gethref();
        // })
        // cy.url().should('include',nurl)
        // console.log(nurl)
        cy.wait(3000)
    });
    
    
    it('Circle of trust',()=>{
        cy.get('#toggleSubmenu').click().then(()=>{
        cy.get('#submenu > [href="tools/circle-of-trust"]').click()

        });
        cy.url().should('include',"https://1finance.co.in/tools/circle-of-trust")
        // cy.scrollTo('bottom')
    });
    
    it('Our Story',()=>{
        cy.get(':nth-child(2) > [href="https://1finance.co.in/story"]').invoke('removeAttr','target').click();
        cy.wait(3000)
        cy.url().should('include',"https://1finance.co.in/story")
        cy.scrollTo('bottom')
    });


    it('careers',()=>{
        cy.get(':nth-child(2) > [href="careers"]').click();
        cy.url().should('include',"https://1finance.co.in/careers")
        cy.scrollTo('bottom')
    });

    it('Support',()=>{
        cy.get('[href="support"]').click()
        cy.url().should('include',"https://1finance.co.in/support")
        cy.scrollTo('bottom')
    });

    it('Privacy Policy',()=>{
        cy.get('[href="privacy-policy"]').click()
        cy.url().should('include',"https://1finance.co.in/privacy-policy")
        cy.scrollTo('bottom')
    });

    it('Terms of use',()=>{
        cy.get('[href="terms-of-use"]').click()
        cy.url().should('include',"https://1finance.co.in/terms-of-use")
        cy.scrollTo('bottom')
    });

    it('App store websitewith 1F app',()=>{
        //cy.get('[href="https://1finance.onelink.me/5Kxt/jmcbz26c"]')//.invoke('removeAttr','target').click();
        //cy.url().should('include',"https://apps.apple.com/in/app/1-finance/id1642047767")
        cy.get('body > div > footer > div > div.prefooter.pt-25 > div:nth-child(5) > div.download-center > div > a:nth-child(1)')
        .should('have.attr', 'href').and('include', 'https://1finance.onelink.me/5Kxt/jmcbz26c')
    });

    it('PlayStore website with 1F app',()=>{
        // cy.get('.inline-list > :nth-child(1) > .link').invoke('removeAttr','target').click();
        // cy.scrollTo('bottom')
        // cy.get('[href="https://play.google.com/store/apps/details?id=app.onefin&pli=1"]')//.invoke('removeAttr','target').click();
        // cy.url().should('include',"https://play.google.com/store/apps/details?id=app.onefin&pli=1")
        // cy.wait(2000)
        cy.get('body > div > footer > div > div.prefooter.pt-25 > div:nth-child(5) > div.download-center > div > a:nth-child(2)')
            .should('have.attr','href').and('include','https://1finance.onelink.me/5Kxt/n0v0uc5c')
    });


});