const loadPosts = async () => {
  const resPosts = fetch('https://jsonplaceholder.typicode.com/posts')
  const resPhotos = fetch('https://jsonplaceholder.typicode.com/photos')
  let [posts, photos] = await Promise.all([resPosts, resPhotos])
  posts = await posts.json()
  photos = await photos.json()
  posts = posts.map((post, index) => (
    { ...post, cover: photos[index].url }
  ))
  return posts
}
export default loadPosts