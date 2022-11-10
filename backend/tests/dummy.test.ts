import helper from './test_helper'
const { initialProducts, highestStock, topStock } = helper



test('dummy returns one', () => {
  expect(1).toBe(1)
})

test('equals to the product with highest stock', () => {
  const result = highestStock(initialProducts)
  expect(topStock).toEqual(result)
})