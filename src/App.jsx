import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import './App.css'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Register from './pages/Register/Register'
import { AuthProvider } from './context/AuthContext'
import { useAuthentication } from './hooks/useAuthentication'


import About from './pages/About/About'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import Post from './pages/Post/Post'
import EditPost from './pages/ EditPost/EditPost'


function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando ...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">

            <Routes>

              < Route path="/" element={<Home />} />
              < Route path="/about" element={<About />} />
              <Route path='/search' element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              < Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
              < Route path="/register" element={!user ? <Register /> : <Navigate to='/' />} />
              <Route path="/post/create" element={user ? <CreatePost /> : <Navigate to='/login' />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/login' />} />
              <Route path="/post/edit/:id" element={user ? <EditPost /> : <Navigate to='/login' />} />
            </Routes>

          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
