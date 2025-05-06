import { useState, useEffect } from 'react';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    async function fetchData() {
      try {
        const data = await searchMovies(query);
        setMovies(data);
        const hasNoPoster = data.some(movie => movie.poster_path === null);
        if (hasNoPoster) {
          toast('Some movies do not have posters available');
        }
      } catch (error) {
        toast.error('Error searching movies');
      }
    }

    fetchData();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.elements.search.value.trim();
    setSearchParams(searchValue !== '' ? { query: searchValue } : {});
    form.reset();
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="search"
          placeholder="Search movies..."
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
