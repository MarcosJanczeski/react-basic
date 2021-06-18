import { useState, useEffect, useCallback } from 'react'
import { PostCard } from '../PostCard'
import loadPosts from './loadPosts'

const PostsContainer = () => {
  const [posts, setPosts] = useState([])
  const [start, setStart] = useState(0)
  const [step] = useState(8)
  const [filter, setFilter] = useState('')
  const [show, setShow] = useState([])


  const mountPosts = useCallback(async () => {
    const loadedPosts = await loadPosts()
    setPosts(loadedPosts)
    setFilter('')
    setShow(loadedPosts.slice(start, step))
  }, [start, step])

  useEffect(() => mountPosts(), [mountPosts])

  const nextPosts = () => {
    setStart(start + step)
    setShow(posts.slice(start, start + step))
  }


  const filterPosts = e => {
    const filterValue = e.target.value
    if (!!filterValue) {
      setFilter(filterValue)
      setShow(posts.filter(post => (
        post.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        post.body.toLowerCase().includes(filterValue.toLowerCase())
      )))
    } else mountPosts()
  }

  return (
    <>
      <input
        type="search"
        value={filter}
        onChange={filterPosts}
      />
      <div className="posts">
        {show.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <button
        onClick={nextPosts}
        disabled={start + step >= posts.length || !!filter}
      >
        Next
      </button>
    </>
  )
}

export default PostsContainer