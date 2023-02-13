import './LikeContainer.css';
import { BsHeart, BsHeartFill } from 'react-icons/bs'

const LikeContainer = ({ photo, user, handleLike }) => {
    return (
        <div className="like">
            {photo.likes && user && (
                <>
                    {photo.likes.some(photo => photo.id === user._id) ? <BsHeartFill /> : <BsHeart onClick={() => handleLike(photo)} />}
                    <p>{photo.likes.length} {photo.likes.length > 1 ? 'likes' : 'like'}</p>
                </>
            )}
        </div>
    )
}

export default LikeContainer