/// <reference types="cypress" /> 

beforeEach('Open application', () => {
    cy.visit('/') 
})

//
//  Datepickers
//

it.only('datepickers', () => {
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()


        function selectDateFromCurrentDay(day) {
            //using js date object to handle date selection based on the current system date and time
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonthLong = date.toLocaleDateString('en-US', { month: 'long' })
            let futureMonthShort = date.toLocaleDateString('en-US', { month: 'short' })
            let futureYear = date.getFullYear()
            let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}`

            cy.get('nb-calendar-view-mode').invoke('text').then(calendarMonthAndYear => {
                if (!calendarMonthAndYear.includes(futureMonthLong) || !calendarMonthAndYear.includes(futureYear)) {
                    cy.get('[data-name="chevron-right"]').click()
                        // passing function to call itsself to re-exicute (like while loop)
                    selectDateFromCurrentDay(day)
                } else {
                    //exculcive the bounding months to get date we need
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                }
            })
            return dateToAssert
        }

        cy.get('[placeholder="Form Picker"]').then(input => {
            cy.wrap(input).click()
            const dateToAssert = selectDateFromCurrentDay(20)
            cy.wrap(input).should('have.value', dateToAssert)
        })
    }

)

//
// Sliders
// 

it.only('slider', () => {
    cy.get('[tabtitle="Temperature"] circle')
        .invoke('attr', 'cx', '246')
        .invoke('attr', 'cy', '74')
        .click()
    cy.get('[class="value temperature h1"]').should('contain.text', '25')
})

//
//  Drag & Drop
//

it.only('drag & drop', () => {
    cy.contains('Extra Components').click()
    cy.contains('Drag & Drop').click()

    cy.get('#todo-list div').first().trigger('dragstart')
    cy.get('#drop-list').trigger('drop')

})

//
// iFrames
//  
it.only('iFrames', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Dialog').click()
        //loading iFrame
    cy.frameLoaded('[data-cy="esc-close-iframe"]')
        // calling this iFrame and with this button click
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').click()
    cy.contains('Dismiss Dialog').click()

    // 2. way insted call everytime use method .enther
    cy.enter('[data-cy="esc-close-iframe"').then(getBody => {
        getBody().contains('Open Dialog with esc close').click()
        cy.contains('Dismiss Dialog').click()
        getBody().contains('Open Dialog without esc close').click()
        cy.contains('OK').click()
    })
})
