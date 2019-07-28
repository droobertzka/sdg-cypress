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
})
