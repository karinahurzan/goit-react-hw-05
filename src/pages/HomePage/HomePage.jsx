import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchTrendingMovies } from '../../services/api';
import css from './HomePage.module.css';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getTrending() {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        toast.error('Error fetching trending movies:', error);
      }
    }

    getTrending();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
