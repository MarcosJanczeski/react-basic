import { Component } from 'react'
import PostCard from './components/PostCard'
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    const resPosts = fetch('https://jsonplaceholder.typicode.com/posts')
    const resPhotos = fetch('https://jsonplaceholder.typicode.com/photos')
    let [posts, photos] = await Promise.all([resPosts, resPhotos])
    posts = await posts.json()
    photos = await photos.json()
    posts = posts.map((post, index) => (
      { ...post, cover: photos[index].url }
    ))
    this.setState({ posts })
  }

  render() {
    const { posts } = this.state
    return (
      <section className='container'>
        <div className="posts">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    );
  }
}
export default App;
