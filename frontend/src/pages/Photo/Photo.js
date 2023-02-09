import './Photo.css';
import { upload } from '../../utils/config';
// Components
import Message from '../../components/Message/Message';
import { Link, useParams } from 'react-router-dom';
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

    return (
        <div>Photo</div>
    )
}

export default Photo