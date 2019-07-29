// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('upload', ({ selector, name, type }) =>
	cy
		.fixture(name, 'base64')
		.then(Cypress.Blob.base64StringToBlob)
		.then(blob => {
			const file = new File([blob], name, { type })
			const dataTransfer = new DataTransfer()
			dataTransfer.items.add(file)

			return cy.get(selector).then($el => {
				const rawDomElement = $el[0]
				rawDomElement.files = dataTransfer.files
			})
		})
)
