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
import { getPhotoById, likeAnPhoto, commentAnPhoto } from '../../slices/photoSlice';
import LikeContainer from '../../components/LikeContainer/LikeContainer';


const Photo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector((state) => state.auth)
    const { photo, loading, error, message } = useSelector((state) => state.photo);

    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        dispatch(getPhotoById(id))
    }, [dispatch, id])

    const handleLike = () => {
        dispatch(likeAnPhoto(photo._id))

        resetMessage();
    }

    const handleComment = (e) => {
        e.preventDefault();

        const photoDataComment = {
            comment: commentText,
            id: photo._id
        }

        dispatch(commentAnPhoto(photoDataComment))


        setCommentText("")

        resetMessage()

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
            <div className="comments">
                {photo.comments && (
                    <>
                        <h3>Comentários ({photo.comments.length}):</h3>
                        <form onSubmit={handleComment}>
                            <input
                                type="text"
                                placeholder="Insira seu comentário..."
                                onChange={(e) => setCommentText(e.target.value)}
                                value={commentText || ""}
                            />
                            <input type="submit" value="Enviar" />
                        </form>
                        {photo.comments.length === 0 && <p>Não há comentários...</p>}
                        {photo.comments.map((comment) => (
                            <div className="comment" key={comment.comment}>
                                <div className="author">
                                    {comment.userImage && (
                                        <img
                                            src={`${upload}/users/${comment.userImage}`}
                                            alt={comment.userName}
                                        />
                                    )}
                                    <Link to={`/users/${comment.userId}`}>
                                        <p>{comment.userName}</p>
                                    </Link>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Photo