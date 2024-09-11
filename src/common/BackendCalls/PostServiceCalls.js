import router from '@/router'
import { getAuthTokenCookie } from '@/common/Helpers';

const postServiceUrl = 'http://127.0.0.1:3001/posts/'
const getNextPostsUrl = 'http://127.0.0.1:3001/get_next_five_posts/'
const getPrevPostsUrl = 'http://127.0.0.1:3001/get_prev_five_posts/'
  
export function createPost(title, text) {
  const token = getAuthTokenCookie()

  const data = JSON.stringify({
    post: {
      title: title,
      text: text,
      token: token
    }
  })

  fetch(postServiceUrl, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: data
  }).then((response) => {
    if (response.ok) {
      response.json().then(() => {
        router.push('/')
      })
    }
    else if (response.status === 422) {
      // Validations error here
    }
    else {
      console.log("Oooups, something went wrong...")
    }
  })
}

export async function getNextPosts(fromId = "") {
  let response = await fetch(getNextPostsUrl + fromId.toString(), 
  {
    method: 'GET',
    mode: 'cors'
  })
  let data = await response.json()
  
  let posts = JSON.parse(data.posts)

  return { posts: posts, haveMore: data.haveMore }
}

export async function getPrevPosts(fromId) {
  let response = await fetch(getPrevPostsUrl + fromId.toString(), 
  {
    method: 'GET',
    mode: 'cors'
  })
  let data = await response.json()

  let posts = JSON.parse(data.posts)

  return { posts: posts, haveMore: data.haveMore }
}