export function getAuthTokenCookie() {
  return (document.cookie.match(/^(?:.*;)?\s*Token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
}

export function getUserIdCookie() {
  return (document.cookie.match(/^(?:.*;)?\s*User_id\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
}