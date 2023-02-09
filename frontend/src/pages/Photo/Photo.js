import './Photo.css';
import { upload } from '../../utils/config';
// Components
import Message from '../../components/Message/Message';
import { Link, useParams } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
// Redux
import { getPhotoById, likeAnPhoto } from '../../slices/photoSlice';
import LikeContainer from '../../components/LikeContainer/LikeContainer';


const Photo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector((state) => state.auth)
    const { photo, loading, error, message } = useSelector((state) => state.photo)

    useEffect(() => {
        dispatch(getPhotoById(id))
    }, [dispatch, id])

    const handleLike = () => {
        dispatch(likeAnPhoto(photo._id))

        resetMessage();
    }

    if (loading) {
        return <div className="photo-container"><p>Carregando...</p></div>
    }

    return (
        <div className="photo-container">
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <div className="message-container">
                {error && <Message message={error} type='error' />}
                {message && <Message message={message} type='sucess' />}
            </div>
        </div>
    )
}

export default Photo