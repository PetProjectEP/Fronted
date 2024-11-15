export function getAuthTokenCookie() {
  return (document.cookie.match(/^(?:.*;)?\s*Token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
}

export function getUserIdCookie() {
  return (document.cookie.match(/^(?:.*;)?\s*User_id\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
}

export function isLoggedIn() {
  return document.cookie.indexOf('Token=') == -1 ? false : true
}

export function getErrors(errObj) {
  let errStr = ""
  Object.values(errObj).forEach(arrOfErrors => {
    arrOfErrors.forEach(val => {
      errStr += val + "\n"
    })
  })

  return errStr
}

export function flushAuthTokens() {
  document.cookie = 'Token=; Max-Age=0'
  ocument.cookie = 'User_id=; Max-Age=0'
}