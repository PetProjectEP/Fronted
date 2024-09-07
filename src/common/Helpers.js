export function getAuthTokenCookie() {
  return (document.cookie.match(/^(?:.*;)?\s*Token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
}