import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import css from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function getCast() {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    }

    getCast();
  }, [movieId]);

  if (cast.length === 0) return <p>No cast info available.</p>;

  return (
    <ul className={css.list}>
      {cast.map(actor => (
        <li key={actor.cast_id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : 'https://placehold.co/200x300?text=No+Image&font=roboto'
            }
            alt={actor.name}
            width="100"
          />
          <p>{actor.name}</p>
          <p>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
