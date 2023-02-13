import Modal from 'react-modal';
import './ModalLikes.css';
import {Link} from 'react-router-dom';

Modal.setAppElement('body');

const ModalLikes = ({ modalIsOpen, closeModal, likes }) => {
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className='modal-content'
            >
                <h2>Quem curtiu:</h2>
                <ul className='likes-area'>
                {likes.map(like => (
                    <>
                    <li key={like.id}><Link to={`/users/${like.id}`}>{like.name}</Link></li>
                    </>
                ))}
                </ul>
                {likes.length === 0 && (
                    <p>Ninguém curtiu ainda...</p>
                )}
            </Modal>
        </div>
    )
}

export default ModalLikes