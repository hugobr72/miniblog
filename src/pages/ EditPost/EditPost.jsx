import styles from './EditPost.module.css';

import { useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';


const EditPost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);


  const { user } = useAuthValue()

  const { updateDocument, response } = useUpdateDocument('posts')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL!')
    }

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    if (!title || !image || !body) {
      setFormError('Por favor preencha todos os campos!')
    }

    if (formError !== '') {
      console.error(formError)
      return
    }

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }
    updateDocument(id, data);
    console.log(response)
    navigate('/dashboard')
  }


  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(',');
      setTags(textTags);
    }
  }, [post]);

  return (
    <div className={styles.editPost}>
      {post && (
        <>
          <h2>Editando Post: {post.title}</h2>
          <p>Altere os dados do post...</p>
          <form onSubmit={handleSubmit}>
            <label >
              <span>Título do post:</span>
              <input
                type="text"
                name='title'
                required placeholder='Título...'
                onChange={(e) => setTitle(e.target.value)}
                value={title} />
            </label>
            <label >
              <span>Url da imagem:</span>
              <input
                type="text"
                name='image'
                required placeholder='Insira uma imagem...'
                onChange={(e) => setImage(e.target.value)}
                value={image} />
            </label>
            <p className={styles.previewTitle}>Preview da imagem atual:</p>
            <img className={styles.previewImage} src={post.image} alt={post.title} />
            <label >
              <span>Conteúdo</span>
              <textarea
                name="body"
                required
                placeholder='Insira o conteúdo do post..'
                onChange={(e) => setBody(e.target.value)}
                value={body}
              >

              </textarea>
            </label>
            <label >
              <span>Hashtag</span>
              <input
                type="text"
                name='title'
                required placeholder='Insira as Hashtags separadas por vírfula...'
                onChange={(e) => setTags(e.target.value)}
                value={tags} />
            </label>
            {!response.loading && <button className='btn'>Editar</button>}
            {response.loading && <button className='btn' disabled>Aguarde ...</button>}
            {response.error && <p className='error'>{error}</p>}
            {formError && <p className='error'>{formError}</p>}
          </form>
        </>
      )}


    </div>
  )
}

export default EditPost