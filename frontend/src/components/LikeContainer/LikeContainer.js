import './LikeContainer.css';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useState } from 'react';
import ModalLikes from '../ModalLikes/ModalLikes';

const LikeContainer = ({ photo, user, handleLike }) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div className="like">
            {photo.likes && user && (
                <>
                    {photo.likes.some(photo => photo.id === user._id) ? <BsHeartFill /> : <BsHeart onClick={() => handleLike(photo)} />}
                    <p onClick={openModal}>{photo.likes.length} {photo.likes.length > 1 ? 'likes' : 'like'}</p>
                    <ModalLikes modalIsOpen={modalIsOpen} closeModal={closeModal} likes={photo.likes} />
                </>
            )}
        </div>
    )
}

export default LikeContainer