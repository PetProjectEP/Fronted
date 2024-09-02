export function getAuthToken() {
  return (document.cookie.match(/^(?:.*;)?\s*Token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
}