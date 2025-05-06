import { useEffect, useRef, useState, Suspense } from 'react';
import { Link, useParams, useLocation, Routes, Route } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import css from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovie() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    getMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const { title, overview, genres, poster_path, vote_average } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : 'https://placehold.co/200x300?text=No+Image&font=roboto';

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.back}>
        ← Go back
      </Link>

      <div className={css.wrapper}>
        <img src={posterUrl} alt={title} className={css.poster} />
        <div>
          <h2>{title}</h2>
          <p>User Score: {Math.round(vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <hr />

      <div className={css.links}>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>

      <hr />

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default MovieDetailsPage;
