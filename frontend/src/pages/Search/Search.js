import './Search.css';
// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
import { useQuery } from '../../hooks/useQuery';
// components
import LikeContainer from '../../components/LikeContainer/LikeContainer';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import { BsFillChatLeftFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
// redux
import { searchPhotos, likeAnPhoto } from '../../slices/photoSlice';

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch)

    const { user } = useSelector((state) => state.auth)
    const { photos, loading } = useSelector((state) => state.photo)

    useEffect(() => {
        dispatch(searchPhotos(search))
    }, [dispatch, search])

    const handleLike = (photo) => {
        dispatch(likeAnPhoto(photo._id))

        resetMessage()
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className='search'>
            <h2>Você está buscando por: {search}</h2>
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
                    Não foram encontrados resultdos para sua busca...
                </h2>
            )}
        </div>
    )
}

export default Search