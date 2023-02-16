import './Navbar.css';

//Components 
import { NavLink, Link } from 'react-router-dom';
import {
    BsSearch,
    BsHouseDoorFill,
    BsFillPersonFill,
    BsFillCameraFill,
    BsFillGridFill
} from 'react-icons/bs';
import NavBarMobile from '../NavBarMobile/NavBarMobile';

// Hooks 
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Redux
import { logout, reset } from '../../slices/authSlice'

const Navbar = () => {

    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth);

    const [query, setQuery] = useState('');
    const [menuActive, setMenuActive] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        
        handleMenuMobile() // close menu mobile
        navigate("/login")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            navigate(`/search?q=${query}`)
            handleMenuMobile() // close menu mobile
            return
        }

    }

    const handleMenuMobile = () => {
        setMenuActive(!menuActive)
    }

    return (
        <header>
            <NavBarMobile 
            toggleMenu={handleMenuMobile} 
            menuActive={menuActive}
            handleLogout={handleLogout}
            auth={auth}
            user={user}
            handleSubmit={handleSubmit}
            setQuery={setQuery}
            query={query}
            />
            <nav className="nav">
                <Link to="/">ReactGram</Link>
                <form onSubmit={handleSubmit}>
                    <BsSearch />
                    <input type="text" placeholder='Pesquisar' onChange={e => setQuery(e.target.value)} value={query || ''} />
                </form>
                <ul className="nav-links">
                    {auth ? (
                        <>
                            <li><NavLink to="/"><BsHouseDoorFill /></NavLink></li>
                            {user && (
                                <>
                                    <li>
                                        <NavLink to={`/users/${user._id}`}>
                                            <BsFillCameraFill />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/profile">
                                            <BsFillPersonFill />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <span onClick={handleLogout}>Sair</span>
                                    </li>
                                </>
                            )}
                        </>
                    ) :
                        (
                            <>
                                <li><NavLink to="/login">Entrar</NavLink></li>
                                <li><NavLink to="/register">Cadastrar</NavLink></li>
                            </>
                        )}
                </ul>
                <BsFillGridFill onClick={handleMenuMobile} className='hamburguer' />
            </nav>
        </header>
    )
}

export default Navbar;