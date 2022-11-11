export const formatPrice = (price: Number | number | undefined) => {
  const formatToUSD = new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' })

  return price ? formatToUSD.format(Number(price)) : null
}


export const handleManyRequests = (action: any) => {
  let timeoutID: ReturnType<typeof setTimeout>
  timeoutID = setTimeout(() => {
    console.log('fired')
    return action
  }, 3000)

}