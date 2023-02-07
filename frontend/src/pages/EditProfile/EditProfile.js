import './EditProfile.css';
import { upload } from '../../utils/config';
//Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
//Redux
import { profile, resetMessage } from '../../slices/userSlice';
//Componets
import Message from '../../components/Message/Message';

const EditProfile = () => {
    const dispatch = useDispatch();

    const { user, message, error, loading } = useSelector((state) => state.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bio, setBio] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        dispatch(profile())
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }
    }, [])

    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleFile = (e) => {
        const image = e.target.files[0]
        setPreviewImage(image)
        setProfileImage(image)
    }

    return (
        <div className='edit-profile'>
            <h2>Edite seus dados</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
            {(user.profileImage || previewImage) && (
                <img src={previewImage ? URL.createObjectURL(previewImage) : `${upload}/users/${user.profileImage}`} alt={user.name} className='profile-image' />
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome' onChange={e => setName(e.target.value)} value={name || ''} />
                <input type="email" placeholder='E-mail' disabled value={email || ''} />
                <label>
                    <span>Imagem do Perfil:</span>
                    <input type="file" onChange={handleFile} />
                </label>
                <label>
                    <span>Bio</span>
                    <input type="text" placeholder='Descrição do perfil' onChange={e => setBio(e.target.value)} value={bio || ''} />
                </label>
                <label>
                    <span>Alterar senha?</span>
                    <input type="password" placeholder='Digite sua nova senha' onChange={e => setPassword(e.target.value)} value={password || ''} />
                </label>
                <input type="password" placeholder='Confirme a senha' onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword || ''} />
                <input type="submit" value="Atualizar" />
            </form>
        </div>
    )
}

export default EditProfile