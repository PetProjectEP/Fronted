import router from '@/router';
import urls from "@/common/BackendCalls/urls";
import { getAuthTokenCookie } from '@/common/Helpers';

const postServiceUrl = urls.postServiceUrl
const getNextPostsUrl = urls.getNextPostsUrl
const getPrevPostsUrl = urls.getPrevPostsUrl
  
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

  return response.ok
}

export async function deletePost(postId) {
  const token = getAuthTokenCookie()

  let url = new URL(postServiceUrl + postId.toString())
  url.search = new URLSearchParams({token: token}).toString()

  let response = await fetch(url, 
  {
    method: 'DELETE',
    mode: 'cors'
  })
  
  return response.status === 204
}

export async function editPost(postId, title, text) {
  const token = getAuthTokenCookie()

  let url = new URL(postServiceUrl + postId.toString())

  const data = JSON.stringify({
    title: title,
    text: text,
    token: token
  })

  let response = await fetch(url, 
  {
    method: 'PATCH',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: data
  })
  
  return response.status === 200
}

export async function getNextPosts({fromId = "", token = null}) {
  let url = new URL(getNextPostsUrl + fromId.toString())
  url.search = new URLSearchParams({token: token}).toString()

  let response = await fetch(url, 
  {
    method: 'GET',
    mode: 'cors'
  })

  let data = await response.json()
  let posts = JSON.parse(data.posts)

  return { posts: posts, haveMore: data.haveMore }
}

export async function getPrevPosts({fromId, token = null}) {
  let url = new URL(getPrevPostsUrl + fromId.toString())
  url.search = new URLSearchParams({token: token}).toString()

  let response = await fetch(url, 
  {
    method: 'GET',
    mode: 'cors'
  })

  let data = await response.json()
  let posts = JSON.parse(data.posts)

  return { posts: posts, haveMore: data.haveMore }
}