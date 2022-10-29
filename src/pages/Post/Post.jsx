import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import styles from './Post.module.css';



const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument('posts', id);

  return (
    <div className={styles.post_container}>
      {loading && <h3>Carregando...</h3>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Esse post trata sobre:</h3>
          <div className={styles.tags}>
          {post.tagsArray.map((tag) => (
          <p key={tag} className={styles.tags}><span>#</span>{tag}</p>
        ))}
        </div>
          <p className={styles.createdBy}>Post criado por: {post.createdBy}</p>
        </>
      )}

    </div>
  )
}

export default Post