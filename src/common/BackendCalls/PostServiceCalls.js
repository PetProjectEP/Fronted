import router from '@/router'
import { getAuthTokenCookie } from '@/common/Helpers';

const postServiceUrl = 'http://127.0.0.1:3001/posts/'
const getPostsMethod = 'http://127.0.0.1:3001/get_next_five_posts'
  
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

export async function getPosts() {
  let response = await fetch(getPostsMethod, 
  {
    method: 'GET',
    mode: 'cors'
  })
  let posts = await response.json()

  return posts
}