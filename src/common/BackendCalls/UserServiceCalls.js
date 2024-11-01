import router from '@/router';
import urls from "@/common/BackendCalls/urls";
import { getAuthTokenCookie } from '@/common/Helpers';
import { getErrors } from '@/common/Helpers';

const userServiceUrl = urls.userServiceUrl
const userServiceSessionsUrl = urls.userServiceSessionsUrl

// Yeah-yeah refreshing entire window is a crutch and low-effective
// but it isn't that frequent operation to screw performance hard

export async function logOut() {
  const token = getAuthTokenCookie()

  let response = await fetch(userServiceSessionsUrl + token, {
    method: 'DELETE',
    mode: 'cors'
  })

  if (response.ok) {
    document.cookie = 'Token=; Max-Age=0'
    document.cookie = 'User_id=; Max-Age=0'
    return true
  }
  else {
    return false
  }
}

export async function getUserByToken() {
  const token = getAuthTokenCookie()

  let response = await fetch(userServiceSessionsUrl + token, {
    method: 'GET',
    mode: 'cors'
  })
  let user = await response.json()
  
  return user
}

export async function signIn(nickname, password) {
  const data = JSON.stringify({
    user: {
      nickname: nickname,
      password: password
    }
  })

  let response = await fetch(userServiceSessionsUrl, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: data
  })

  if (response.ok) {
    let json = await response.json()

    document.cookie =
    "Token=" + json.token + ";expires=" + new Date(json.expires_at).toUTCString() + ";path=/"
    document.cookie =
    "User_id=" + json.user_id + ";expires=" + new Date(json.expires_at).toUTCString() + ";path=/"

    return true
  }
  else {
    return false
  }
}

export async function signUp(nickname, name, surname, password, passwordConfirmation) {
  const data = JSON.stringify({
    user: {
      nickname: nickname,
      name: name,
      surname: surname,
      password: password,
      password_confirmation: passwordConfirmation
    }
  })

  let response = await fetch(userServiceUrl, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: data
  })

  if (response.ok) {
    let status = await signIn(nickname, password)
    return { status: status, errStr: "" }
  }
  else {
    let json = await response.json()
    return { status: false, errStr: getErrors(json)}
  }
}