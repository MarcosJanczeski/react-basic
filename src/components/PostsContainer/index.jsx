import { Component } from 'react'
import { PostCard } from '../PostCard'
import loadPosts from './loadPosts'

export default class PostsContainer extends Component {
  state = {
    posts: [],
    start: 0,
    step: 8,
    filter: '',
    show: []
  }

  componentDidMount() {
    this.mountPosts()
  }

  mountPosts = async () => {
    const posts = await loadPosts()
    this.setState(state => ({
      ...state,
      posts,
      filter: '',
      show: posts.slice(state.start, state.step)
    }))
  }

  nextPosts = () => {
    this.setState(state => {
      let { posts, start, step } = state
      start += step
      return {
        ...state,
        start,
        show: posts.slice(start, start + step)
      }
    })
  }

  filterPosts = e => {
    const filter = e.target.value
    !!filter ? (
      this.setState(state => ({
        ...state,
        filter,
        show: state.posts.filter(post => (
          post.title.toLowerCase().includes(filter.toLowerCase()) ||
          post.body.toLowerCase().includes(filter.toLowerCase())
        ))
      }))
    ) : (
      this.mountPosts()
    )
  }

  render() {
    const { show, start, step, filter } = this.state
    return (
      <>
        <input
          type="search"
          value={filter}
          onChange={this.filterPosts}
        />
        <div className="posts">
          {show.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <button
          onClick={this.nextPosts}
          disabled={start + step >= this.state.posts.length || !!filter}
        >
          Next
        </button>
      </>
    )
  }
}