import { Link } from 'react-router-dom';
import styles from './PostDetail.module.css';


const PostDetail = ({ post }) => {
  return (
    <div key={post.id} className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createdBy}>Post criado por: {post.createdBy}</p>
      <div>
        {post.tagsArray.map((tag) => (
          <p key={tag} className={styles.tags}><span>#</span>{tag}</p>
        ))}
      </div>
          <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
    </div>
  )
}

export default PostDetail