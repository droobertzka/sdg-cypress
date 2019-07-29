describe('solutiondesign.com', () => {
	it('contains the "we build..." header', () => {
		cy.visit('').contains('we build')
	})

	it('contains the "...since 1989" tagline', () => {
		cy.visit('').contains('since 1989')
	})

	it('navigates to the hiring page', () => {
		cy.visit('')
			.get('nav a[href*="we-re-hiring"]')
			.click()
			.location('pathname')
			.should(pathname => {
				expect(pathname).to.eq('/web/guest/we-re-hiring')
			})
	})

	it('successfully submits a FED application', () => {
		const NAME = 'Andrew Barrette'
		const EMAIL = 'drew.barrette@solutiondesign.com'
		const URL = '/web/guest/senior-front-end-developer'

		// Set up routes to watch
		cy.server()
			.route('POST', URL + '**')
			.as('postResume')

		// Fill basic form fields
		cy.visit(URL)
			.get('input[type=text]:eq(0)')
			.scrollIntoView()
			.type(NAME)
			.get('input[type=text]:eq(1)')
			.type(EMAIL)

		// Upload the file and click submit
		cy.upload({
			selector: 'input[type=file]',
			name: 'resume.txt',
			type: 'text/plain'
		})
			.get('button[type=submit]')
			.click()
			.wait('@postResume')

		// Assert that we show a "thank you" message
		cy.contains('thank you for applying')
	})
})
