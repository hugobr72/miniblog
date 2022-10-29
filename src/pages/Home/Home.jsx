import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PostDetail from '../../components/PostDetail/PostDetail';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import styles from './Home.module.css';


const Home = () => {
  const [query, setQuery] = useState('');
  const { documents: posts, loading } = useFetchDocuments('posts');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      console.log(query)
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja nosso posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder='Busque por tags...' onChange={(e) => setQuery(e.target.value)} />
        <button className='btn btn-dark'>Pesquisar</button>
      </form>

      <div>
        <h1>Posts</h1>
        {loading && <h3>Carregando...</h3>}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to='/post/create' className='btn'>Criar Primeiro post</Link>
          </div>
        )}
        {posts && posts.map((post) => (
          <PostDetail post={post} key={post.id}/>
        ))}
      </div>

    </div>
  )
}

export default Home