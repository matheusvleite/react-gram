import './Home.css';
// Components
import LikeContainer from '../../components/LikeContainer/LikeContainer';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import { Link } from 'react-router-dom';
import { BsFillChatLeftFill } from 'react-icons/bs'
import Loading from '../../components/Loading/Loading';
// Hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
// Redux
import { getAllPhotos, likeAnPhoto } from '../../slices/photoSlice';

const Home = () => {
    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector((state) => state.auth);
    const { photos, loading } = useSelector((state) => state.photo);

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])

    // like a photo

    const handleLike = (photo) => {
        dispatch(likeAnPhoto(photo._id))

        resetMessage()
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="home">
            {photos && photos.map(photo => (
                <div key={photo._id}>
                    <PhotoItem photo={photo} />
                    <div className="photo-utils">
                        <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                        <div className="comment-area">
                            <Link to={`/photos/${photo._id}`}><BsFillChatLeftFill /></Link><p>{photo.comments.length} Comentários</p>
                        </div>
                    </div>
                    <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>
                </div>
            ))}
            {photos && photos.length === 0 && (
                <h2 className='no-photos'>
                    Ainda não há publicações, <Link to={`/users/${user._id}`}>Clique aqui</Link>
                </h2>
            )}
        </div>
    )
}

export default Home;