import './Auth.css';

// Components
import { Link } from 'react-router-dom';
import Message from '../../components/Message/Message';
// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Redux
import { login, reset } from '../../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    }

    dispatch(login(user));

  }

  // Clean all state

  useEffect(() => {
    dispatch(reset());
  }, [dispatch])

  return (
    <div className='login'>
      <h2>Login</h2>
      <p className="subtitle">Entre para ver o que há de bom!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder='E-mail'
          onChange={e => setEmail(e.target.value)}
          value={email || ''}
        />
        <input
          type="password"
          placeholder='Senha'
          onChange={e => setPassword(e.target.value)}
          value={password || ''}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message message={error} type="error" />}
      </form>
      <p>Não tem um conta? <Link to="/register">Clique aqui.</Link></p>
    </div>
  )
}

export default Login;