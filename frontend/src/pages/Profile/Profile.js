import './Profile.css';
import { upload } from '../../utils/config';
//Components
import Message from '../../components/Message/Message';
import { Link, useParams } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'
//Hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Redux
import { getUserDetails } from '../../slices/userSlice';
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice';

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const { photos,
        loading: loadingPhoto,
        message: messagePhoto,
        error: errorPhoto
    } = useSelector((state) => state.photo)

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [edit, setEdit] = useState(false);
    const [imageEdit, setImageEdit] = useState('');
    const [photoIdEdit, setIdEdit] = useState('');


    useEffect(() => {
        dispatch(getUserDetails(id))
        dispatch(getUserPhotos(id))
    }, [dispatch, id])


    const handleFile = (e) => {
        const image = e.target.files[0]
        setImage(image)
    }

    const resetComponentMessage = (time) => {
        setTimeout(() => {
            dispatch(resetMessage());
        }, time);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (edit) {
            const photoData = {
                title,
                id: photoIdEdit
            }

            dispatch(updatePhoto(photoData))
            resetComponentMessage(2000)
            setEdit(false)
            setTitle('')
            return
        }

        const photoData = {
            title,
            image
        }

        const formData = new FormData()

        const photoFormData = Object.keys(photoData).forEach(key => formData.append(key, photoData[key]))

        formData.append("photo", photoFormData)

        dispatch(publishPhoto(formData))

        setTitle("")
        setImage("")

        resetComponentMessage(2000)
    }

    const handleDelete = (id) => {
        dispatch(deletePhoto(id))
        resetComponentMessage(2000)
    }

    const handleEdit = (id, title, image) => {
        setImageEdit(image)
        setTitle(title)
        setIdEdit(id)
        setEdit(true)

    }

    const handleCancelEdit = () => {
        setEdit(false)
        setTitle('')
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
                <>
                    <div className="new-photo">
                        {edit ? <h3>Editando:</h3> : <h3>Compartilhe algum momento seu:</h3>}
                        <form onSubmit={handleSubmit}>
                            <label>
                                <span>Título para a foto:</span>
                                <input type="text" placeholder='Insira um título' onChange={e => setTitle(e.target.value)} value={title || ''} />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                {edit ? <img src={`${upload}/photos/${imageEdit}`} /> : <input type="file" onChange={handleFile} />}
                            </label>
                            {image && (
                                <img src={URL.createObjectURL(image)} alt="Preview da imagem" />
                            )}
                            {!loadingPhoto && <input type="submit" value={edit ? 'Atualizar' : 'Postar'} />}
                            {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
                        </form>
                        {edit && <button onClick={handleCancelEdit} className='cancel-btn'>Cancelar edição</button>}
                    </div>
                    {errorPhoto && <Message message={errorPhoto} type="error" />}
                    {messagePhoto && <Message message={messagePhoto} type="sucess" />}
                </>
            )}
            <div className="user-photos">
                <h2>Fotos publicadas:</h2>
                <div className="photos-container">
                    {photos && photos.map(photo => (
                        <div className='photo' key={photo._id}>
                            {photo.image && <img src={`${upload}/photos/${photo.image}`} alt={photo.title} />}
                            {id === userAuth._id ? (
                                <div className='actions'>
                                    <Link to={`/photos/${photo._id}`}><BsFillEyeFill /></Link>
                                    <BsPencilFill onClick={() => handleEdit(photo._id, photo.title, photo.image)} />
                                    <BsXLg onClick={() => handleDelete(photo._id)} />
                                </div>
                            ) : (<Link className='btn' to={`/photos/${photo._id}`}>Ver</Link>)}
                        </div>
                    ))}
                    {photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
                </div>
            </div>
        </div>
    )
}

export default Profile;