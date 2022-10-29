import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'


const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav className={styles.navbar}>
      <NavLink to='/' end className={styles.brand}>
        Mini
        <span>Blog</span>
      </NavLink>

      <ul className={styles.links_list}>
        <li>
          <NavLink to='/' end className={({ isActive }) => (isActive ? styles.active : null)}>
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to='/login' className={({ isActive }) => (isActive ? styles.active : null)}>
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink to='/register' end className={({ isActive }) => (isActive ? styles.active : null)}>
                Casdastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to='/post/create' className={({ isActive }) => (isActive ? styles.active : null)}>
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink to='/dashboard' end className={({ isActive }) => (isActive ? styles.active : null)}>
                Dashboard
              </NavLink>
            </li>


          </>
        )}

        <li>
          <NavLink to='/about' className={({ isActive }) => (isActive ? styles.active : null)}>Sobre</NavLink>
        </li>

        {user && (
          <>
            <li>
              <button onClick={logout}>Sair</button>
            </li>

          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar