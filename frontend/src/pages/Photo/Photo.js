import './Photo.css';
import { upload } from '../../utils/config';
// Components
import Message from '../../components/Message/Message';
import { Link, useParams } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Redux
import { getPhotoById } from '../../slices/photoSlice';


const Photo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { photo, loading, error } = useSelector((state) => state.photo)

    useEffect(() => {
        dispatch(getPhotoById(id))
    }, [dispatch, id])

    if (loading) {
        return <div className="photo-container"><p>Carregando...</p></div>
    }

    return (
        <div className="photo-container">
            <PhotoItem photo={photo} />
        </div>
    )
}

export default Photo