import './NavBarMobile.css';
// components
import { BsSearch, BsFillXCircleFill } from 'react-icons/bs';
//hooks
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

const NavBarMobile = ({
  toggleMenu,
  menuActive,
  handleLogout,
  auth,
  user,
  handleSubmit,
  setQuery,
  query,
}) => {

  useEffect(() => {
    document.body.style.overflowY = menuActive ? 'hidden' : 'auto';
  }, [menuActive])

  return (
    <nav className={menuActive ? 'nav-mobile mobileOpen' : 'nav-mobile'}>
      <BsFillXCircleFill onClick={toggleMenu} className='close'/>
      <ul>
        {auth ? (
          <>
            <li><NavLink to='/' onClick={toggleMenu}>Home</NavLink></li>
            {user && (
              <>
                <li>
                  <NavLink to={`/users/${user._id}`} onClick={toggleMenu}>Perfil</NavLink>
                </li>
                <li>
                  <NavLink to="/profile" onClick={toggleMenu}>Editar perfil</NavLink>
                </li>
                <li>
                  <span onClick={handleLogout}>Sair</span>
                </li>
              </>
            )}
          </>
        ) : (
          <>
            <li><NavLink to="/login" onClick={toggleMenu}>Entrar</NavLink></li>
            <li><NavLink to="/register" onClick={toggleMenu}>Cadastrar</NavLink></li>
          </>
        )}
      </ul>
      {auth && (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Pesquisar' onChange={e => setQuery(e.target.value)} value={query || ''} />
          <BsSearch onClick={handleSubmit}/>
        </form>
      )}
    </nav>
  )
}

export default NavBarMobile