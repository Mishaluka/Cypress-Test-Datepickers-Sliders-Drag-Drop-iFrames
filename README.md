# Cypress-Test-Datepickers-Sliders-Drag-Drop-iFrames
This Cypress suite explores automation of more complex and interactive UI components, such as dynamic date pickers, graphical sliders, drag-and-drop interfaces, and embedded iFrames. Each test showcases a different technique for simulating real user actions and validating visual elements.

# What this project covers

# Datepickers:
- Dynamically selects a future date based on the current system date
- Uses JavaScript's Date() object to calculate +20 days
- Navigates calendar months recursively until the correct month/year is visible
- Ensures proper date assertion by comparing against the formatted target date

js:
const dateToAssert = selectDateFromCurrentDay(20)
cy.wrap(input).should('have.value', dateToAssert)

# Sliders :
- Interacts directly with a temperature slider component
- Modifies slider's cx and cy attributes to simulate drag
- Verifies that the value (e.g., 25°C) is displayed correctly after interaction

js:
cy.get('[class="value temperature h1"]').should('contain.text', '25')

# Drag & Drop
Simulates dragging an item from a To-Do list and dropping it into another list
Uses Cypress .trigger('dragstart') and .trigger('drop') events
Ensures functionality is validated in a visual drop target

# iFrames
- Loads and interacts with content inside an embedded iframe
- Uses:
  cy.frameLoaded() to ensure the iframe is ready
  cy.iframe().contains().click() to interact with elements inside it
  cy.enter() for cleaner reusability without re-selecting iframe
- Simulates modal dialog opening/closing actions within iframe context

js:
cy.enter('[data-cy="esc-close-iframe"]').then(getBody => {
    getBody().contains('Open Dialog without esc close').click()
    cy.contains('OK').click()
})

# Skills Practiced
Dynamic date manipulation with JavaScript
Recursive logic for calendar navigation
Graphical UI component interaction (sliders, drag/drop)
Working with Shadow DOM / iFrame isolation
Chained Cypress commands with .then() and .wrap()
DOM structure traversal with fallback for dynamic elements


# How to Run

npm install
npx cypress open

Base URL should point to the Bondar Academy demo site or equivalent test UI playground
Required routes: Forms → Datepicker, Modal & Overlays → Dialog, Extra Components → Drag & Drop

