describe('Store', function () {

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Products')
  })

  describe("products interactions", function () {
    it('can add product to cart', function() {

      cy.contains('Tesla Bot').click()
      cy.contains('Stock: 1 Last one!')
      cy.contains('Cart 0')
      cy.contains('add to cart').click()
      cy.contains('Cart 1')
    })
    it("and shows notification", function() {
      cy.contains('Tesla Bot added to cart.')
    })

    it("and stock updates", function() {
      cy.contains('Stock: out of stock')
    })

    it("and trying to add to cart when out of stock sends notification", function() {
      cy.contains('add to cart').click()
      cy.contains('Tesla Bot is out of stock')
    })
  })
})