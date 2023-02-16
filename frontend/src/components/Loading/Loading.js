import Spinner from '../../assets/loading.gif';
import './Loading.css';

const Loading = () => {
    return (
        <div className='loading'>
            <img src={Spinner} alt="Carregando" />
            <p>Carregando....</p>
        </div>
    )
}

export default Loading