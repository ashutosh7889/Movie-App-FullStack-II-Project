import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Popover } from 'antd';
import { IMAGE_URL } from '../../Config';
import './favoritePage.css';

function FavoritePage() {

    const variables = { userFrom: localStorage.getItem('userId') }
    const [FavoritedMovies, setFavoritedMovies] = useState([])

    useEffect(() => {
        fetchFavoritedMovies();
    }, [])

    const fetchFavoritedMovies = () => {
        axios.post('/api/favorite/getFavoritedMovie', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoritedMovies(response.data.favorites)
                } else {
                    alert('Failed to get favorited videos')
                }
            })
    }

    const onClickRemove = (movieId) => {
        const variable = {
            movieId: movieId,
            userFrom: localStorage.getItem('userId')
        }
        axios.post('/api/favorite/removeFromFavorite', variable )
                .then(response => {
                    if(response.data.success) {
                        fetchFavoritedMovies();
                    } else {
                        alert('Failed to remove from Favorites')
                    }
                })
    }

    const renderTableBody = FavoritedMovies.map((movie, index) => {

        const content = (
            <div>
                {movie.moviePost ?
                    <img src={`${IMAGE_URL}w500${movie.moviePost}`} alt="moviePost" />
                    : "no image"}
            </div>
        );

        return <tr>
            <Popover content={content} title={`${movie.movieTitle}`}>
                <td>{movie.movieTitle}</td>
            </Popover>
            <td>{movie.movieRunTime} mins</td>
            <td><button onClick={()=>onClickRemove(movie.movieId)}>Remove from the Favorites</button></td>
        </tr>
    })


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3>Favorite Movies By Me</h3>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Run Time</th>
                        <th>Remove From Favorites</th>
                    </tr>
                </thead>

                <tbody>
                    {renderTableBody}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
