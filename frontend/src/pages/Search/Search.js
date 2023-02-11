import './Search.css';
// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
import { useQuery } from '../../hooks/useQuery';
// components
import LikeContainer from '../../components/LikeContainer/LikeContainer';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import { Link } from 'react-router-dom';
// redux

const Search = () => {
    return (
        <div>Search</div>
    )
}

export default Search