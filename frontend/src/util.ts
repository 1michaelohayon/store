export const formatPrice = (price: Number | number | undefined) => {
  const formatToUSD = new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' })

  return price ? formatToUSD.format(Number(price)) : null
}


