import React from 'react'
import { Link } from 'react-router-dom'
import PostDetail from '../../components/PostDetail/PostDetail'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

import styles from './Search.module.css'
const Search = () => {
  const query = useQuery()
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments('posts', search)

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div>
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
        {!posts && (
          <>
            <p>Não foram encontrados posts a partir de sua busca...</p>
          </>
        )}

      </div>
      <Link to='/' className='btn btn-dark'>Voltar</Link>
    </div>
  )
}

export default Search