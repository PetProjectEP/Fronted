import router from '@/router';
import urls from "@/common/BackendCalls/urls";
import { getAuthTokenCookie, getErrors } from '@/common/Helpers';

const postServiceUrl = urls.postServiceUrl
const getPostsListUrl = urls.getPostsListUrl
  
export async function createPost(title, text) {
  const token = getAuthTokenCookie()

  let url = new URL(postServiceUrl)

  const data = JSON.stringify({
      title: title,
      text: text,
      token: token
  })

  let response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: data
  })

  if (response.ok) {
    return { isSuccess: true, errStr: "" }
  }
  else {
    let json = await response.json()
    return { isSuccess: false, errStr: getErrors(json) }
  }
}

export async function deletePost(postId) {
  const token = getAuthTokenCookie()

  let url = new URL(postServiceUrl + postId.toString())
  url.search = new URLSearchParams({token: token}).toString()

  let response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors'
  })
  
  if (response.ok) {
    return { isSuccess: true, errStr: "" }
  }
  else {
    let json = await response.json()
    return { isSuccess: false, errStr: getErrors(json) }
  }
}

export async function editPost(postId, title, text) {
  const token = getAuthTokenCookie()

  let url = new URL(postServiceUrl + postId.toString())

  const data = JSON.stringify({
    title: title,
    text: text,
    token: token
  })

  let response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: data
  })
  
  if (response.ok) {
    return { isSuccess: true, errStr: "" }
  }
  else {
    let json = await response.json()
    return { isSuccess: false, errStr: getErrors(json) }
  }
}

export async function getPostsList({ startingId = null, limit = 5, token = null }) {
  let url = new URL(getPostsListUrl)

  let params = new URLSearchParams({
    limit: limit,
    token: token
  })

  if (startingId !== null) {
    params.append("starting_id", startingId)
  }

  url.search = params.toString()

  let response = await fetch(url, 
  {
    method: 'GET',
    mode: 'cors'
  })

  let data = await response.json()

  let posts = JSON.parse(data.posts)
  let backPageId = data.newer_page_id === "nil" ? null : data.newer_page_id
  let nextPageId = data.older_page_id === "nil" ? null : data.older_page_id

  return { 
    posts: posts,
    backPageId: backPageId,
    nextPageId: nextPageId
  }
}