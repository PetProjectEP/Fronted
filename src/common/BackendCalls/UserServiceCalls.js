import router from '@/router';
import urls from "@/common/BackendCalls/urls";
import { getAuthTokenCookie } from '@/common/Helpers';

const userServiceUrl = urls.userServiceUrl
const userServiceSessionsUrl = urls.userServiceSessionsUrl

// Yeah-yeah refreshing entire window is a crutch and low-effective
// but it isn't that frequent operation to screw performance hard

export function logOut() {
  const token = getAuthTokenCookie()

  fetch(userServiceSessionsUrl + token, {
    method: 'DELETE',
    mode: 'cors'
  }).then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        document.cookie = 'Token=; Max-Age=0'
        window.location.reload()
      })
    }
    else if (response.status === 422) {
      alert('Wrong session to destroy')
    }
    else {
      console.log('Oooups, something went wrong...')
    }
  })
}

export async function getUserByToken() {
  const token = getAuthTokenCookie()

  let response = await fetch(userServiceSessionsUrl + token, 
  {
    method: 'GET',
    mode: 'cors'
  })
  let user = await response.json()
  
  return user
}

export function signIn(nickname, password) {
  const data = JSON.stringify({
    user: {
      nickname: nickname,
      password: password
    }
  })

  fetch(userServiceSessionsUrl, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: data
  }).then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        document.cookie =
        "Token=" + json.token + ";expires=" + new Date(json.expires_at).toUTCString() + ";path=/"
        router.push('/').then(() => { window.location.reload() })
      })
    }
    else if (response.status === 422) {
      alert("There is no such user. Check your login and password")
    }
    else {
      console.log("Oooups, something went wrong...")
    }
  })
}

export function signUp(nickname, name, surname, password, passwordConfirmation) {
  const data = JSON.stringify({
    user: {
      nickname: nickname,
      name: name,
      surname: surname,
      password: password,
      password_confirmation: passwordConfirmation
    }
  })

  fetch(userServiceUrl, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: data
  }).then((response) => {
    if (response.ok) {
      signIn(nickname, password)
    }
    else if (response.status === 422) {
      response.json().then((parsedErrors) => {
        let errStr = ""
        Object.values(parsedErrors).forEach(arrOfErrors => {
          arrOfErrors.forEach(val => {
            errStr += val + "\n"
          })
        });
        alert("Following errors prevent you from signing up:\n" + errStr)
      })
    }
    else {
      console.log("Oooups, something went wrong...")
    }
  })
}