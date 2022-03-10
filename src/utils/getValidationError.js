module.exports = getValidationError = (errorStack) => {
  let errorKeyArray = []
  let errorMessageArray = []
  for( let key in errorStack.errors){
    errorKeyArray.push(key)
  }
  console.log(errorKeyArray)
  errorKeyArray.map((key) => {
    errorMessageArray.push(errorStack.errors[key].message)
  })
  return errorMessageArray
}