import './Profile.css';
import { upload } from '../../utils/config';
//Components
import Message from '../../components/Message/Message';
import { Link, useParams } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'
//Hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Redux
import { getUserDetails } from '../../slices/userSlice';

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)

    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    useEffect(() => {
        dispatch(getUserDetails(id))
    }, [dispatch, id])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    if (loading) {
        return <p>Carregando...</p>
    }
    return (
        <div className='profile'>
            <div className="profile-header">
                {user.profileImage && (
                    <img src={`${upload}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
                <div className="new-photo" ref={newPhotoForm}>
                    <h3>Compartilhe algum momento seu:</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título para a foto:</span>
                            <input type="text" placeholder='Insira um título' />
                        </label>
                        <label>
                            <span>Imagem:</span>
                            <input type="file" />
                        </label>
                        <input type="submit" value="Postar" />
                    </form>
                </div>
            )}
        </div>
    )
}

export default Profile;