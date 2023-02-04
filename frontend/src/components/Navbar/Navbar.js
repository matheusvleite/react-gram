import './Navbar.css';

//Components 
import { NavLink, Link } from 'react-router-dom';
import {
    BsSearch,
    BsHouseDoorFill,
    BsFillPersonFill,
    BsFillCameraFill
} from 'react-icons/bs';

const Navbar = () => {
    return (
        <header>
            <nav className="nav">
                <Link to="/">ReactGram</Link>
                <form>
                    <BsSearch />
                    <input type="text" placeholder='Pesquisar' />
                </form>
                <ul className="nav-links">
                    <li><NavLink to="/"><BsHouseDoorFill /></NavLink></li>
                    <li><NavLink to="/login">Entrar</NavLink></li>
                    <li><NavLink to="/register">Cadastrar</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;