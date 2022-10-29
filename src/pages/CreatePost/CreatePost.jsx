import styles from './CreatePost.module.css'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInserDocument } from '../../hooks/useInserDocument'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const { user } = useAuthValue()

  const { insertDocument, response } = useInserDocument('posts')

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

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })
    console.log(response)
    navigate('/')
  }

  return (
    <div className={styles.createPost}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser compartilhar e compartilhe com o mundo!</p>

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
        {!response.loading && <button className='btn'>Postar</button>}
        {response.loading && <button className='btn' disabled>Aguarde ...</button>}
        {response.error && <p className='error'>{error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>


    </div>
  )
}

export default CreatePost